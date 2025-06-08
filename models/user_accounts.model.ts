import mongoose, { model, Schema } from "mongoose";
import { accounts_const, user_accounts_const } from "../constants/status.const";

const user_account_schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: String,
    fullname: String,
    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    address: String,
    city: String,
    country: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: user_accounts_const.ACTIVE,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      default: null,
    },
    token: String,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const UserAccount = model("User Account", user_account_schema);

export default UserAccount;
