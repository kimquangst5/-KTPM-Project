import mongoose, { model, Schema } from "mongoose";
import { accounts_const } from "../constants/status.const";
import { ref } from "process";

const order_schema = new Schema(
  {
    infor_user: {
      user_id: mongoose.SchemaTypes.ObjectId,
      fullname: String,
      address: String,
      city: String,
      country: String,
      email: String,
    },
    infor_products: [
      {
        product_id: mongoose.SchemaTypes.ObjectId,
        quantity: Number,
        price: Number,
        discount: Number
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Order = model("Order", order_schema);

export default Order;
