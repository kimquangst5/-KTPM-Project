import mongoose, { model, Schema } from "mongoose";
import { accounts_const } from "../constants/status.const";
import { ref } from "process";

const carts_schema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User Account",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Carts = model("Cart", carts_schema);

export default Carts;
