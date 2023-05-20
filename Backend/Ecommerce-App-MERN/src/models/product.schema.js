import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide product name"],
            trim: true,
            maxLength: [120, "Product name should not exceed 120 characters"],
        },
        price: {
            type: Number,
            required: [true, "Please provide product price"],
            maxLength: [5, "Product price should not exceed 5 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide product description"],
            trim: true,
            maxLength: [
                1000,
                "Product description should not exceed 1000 characters",
            ],
        },
        photos: [
            {
                secure_url: {
                    type: String,
                    required: [true, "Please provide product image url"],
                },
            },
        ],
        stock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        collectionId: {
            ref: "Collection",
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);
