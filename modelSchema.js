const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
            data: Buffer,
            contentType: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
