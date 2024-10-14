const { Schema, model } = require("mongoose");
//
// const productCategory = {
//
//   drink: {
//     type: String
//   },
//   food: {
//     type: String
//   }
// };

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    quantity: {
      type: Number
    },

    cost: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    }
    // category: {
    //   type: productCategory,
    //   required: true
    // },
    // temperature: {}


  },
  {

    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;