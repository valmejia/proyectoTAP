const {Schema, model} = require("mongoose")

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        product: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,

        },

    },
    {

        timestamps: true,
    },
)

const Product = model("Product", productSchema);

module.exports = Product;