import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
        app.on("error", (err) => {
            console.error("Error connecting to MongoDB");
            throw err;
        });

        app.listen(config.PORT, () => {
            console.log(`Listening on Port: ${config.PORT}`);
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
})();
