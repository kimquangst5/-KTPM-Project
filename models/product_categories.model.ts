import mongoose, { model, Schema } from "mongoose";
import { product_categories_const } from "../constants/status.const";
import slug from "mongoose-slug-updater";

const categories_schema = new Schema(
  {
    name: String,
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product Category",
      default: null,
    },
    description: String,
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
      default: product_categories_const.ACTIVE,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      default: null,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

mongoose.plugin(slug);

const Product_Categories = model("Product Category", categories_schema);

export default Product_Categories;
