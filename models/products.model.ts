import mongoose, { model, Schema } from "mongoose";
import { product_categories_const, products_const } from "../constants/status.const";
import slug from "mongoose-slug-updater";

const products_schema = new Schema(
  {
    name: String,
    price: Number,
    discount: Number,
    product_categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product Category",
      default: null,
    },
    description: String,
    quantity: Number,
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        default: null,
      },
    ],
    slug: {
      type: String,
      unique: true,
      slug: "name",
      slugPaddingSize: 4,
      slug_opts: {
        lower: true,
        // replacement: "+",
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: products_const.ACTIVE,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

mongoose.plugin(slug);

const Product = model("Product", products_schema);

export default Product;
