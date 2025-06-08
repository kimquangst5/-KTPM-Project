import mongoose, { model, Schema } from "mongoose";
import { accounts_const } from "../constants/status.const";

const assets_schema = new Schema(
  {
    asset_id: String,
    public_id: String,
    version: Number,
    version_id: String,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    created_at: String,
    tags: Array,
    pages: Number,
    bytes: Number,
    type: String,
    etag: String,
    placeholder: Boolean,
    url: String,
    secure_url: String,
    asset_folder: String,
    display_name: String,
    original_filename: String,
    api_key: String,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Assets = model("Asset", assets_schema);

export default Assets;