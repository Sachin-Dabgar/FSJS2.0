import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please enter a valid password"],
            minLength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

// encrypt the password before saving : Hooks

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods = {
    // compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    // generate JWT token
    getJWTtoken: async function () {
        JWT.sign({ _id: this._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY,
        });
    },
    // generate forgotPasswordToken
    generateForgotPasswordToken: function () {
        const forgotToken = crypto.randomBytes(20).toString("hex");
        // just to encrypt the token genereated by crypto
        this.forgotPasswordToken = crypto
            .createHash("sha256")
            .update(forgotToken)
            .digest("hex");

        // time for token to expire
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
        return forgotToken;
    },
};

export default mongoose.model("User", userSchema);
