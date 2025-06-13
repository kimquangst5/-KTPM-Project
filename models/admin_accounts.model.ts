import mongoose, { model, Schema } from "mongoose";
import { accounts_const } from "../constants/status.const";

const role_schema = new Schema(
  {
    fullname: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    token: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: accounts_const.ACTIVE,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      default: null,
    },
    role_id: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Role",
    },
    birthday: Date,
    email: String
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Account = model("Admin Account", role_schema);

export default Account;