"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary_exists_asset = exports.cloudinary_get_image_details = exports.cloudinary_rename_image = exports.cloudinary_get_all_assets = exports.cloudinary_delete_many = exports.cloudinary_delete_one = void 0;
const cloudinary_1 = require("cloudinary");
require("../configs/cloudinary.config");
const products_model_1 = __importDefault(require("../models/products.model"));
const cloudinary_delete_one = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    return cloudinary_1.v2.uploader.destroy(public_id, { resource_type: "image" });
});
exports.cloudinary_delete_one = cloudinary_delete_one;
const cloudinary_delete_many = (array_public_id) => __awaiter(void 0, void 0, void 0, function* () {
    return cloudinary_1.v2.api.delete_resources(array_public_id, {
        resource_type: "image",
    });
});
exports.cloudinary_delete_many = cloudinary_delete_many;
const cloudinary_get_all_assets = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    let resources = [];
    let nextCursor;
    do {
        const result = yield cloudinary_1.v2.api.resources({
            type: "upload",
            max_results: 500,
            next_cursor: nextCursor,
        });
        resources = resources.concat(result.resources);
        nextCursor = result.next_cursor;
    } while (nextCursor);
    const publicIds = resources.map((r) => r.public_id);
    const products = yield products_model_1.default.find({
        "images.assets_id": { $ne: null },
    })
        .populate("images.assets_id")
        .select("name images")
        .lean();
    const assetUsageMap = {};
    for (const product of products) {
        for (const image of product.images || []) {
            if (!image["assets_id"])
                continue;
            const assetIdStr = image["assets_id"]["asset_id"].toString();
            if (!assetUsageMap[assetIdStr]) {
                assetUsageMap[assetIdStr] = [];
            }
            const data = {
                _id: product._id.toString(),
                name: product.name,
            };
            assetUsageMap[assetIdStr].push(data);
        }
    }
    const enriched = resources.map((asset) => {
        return Object.assign(Object.assign({}, asset), { usedByProducts: assetUsageMap[asset.asset_id] || [] });
    });
    return enriched;
});
exports.cloudinary_get_all_assets = cloudinary_get_all_assets;
const cloudinary_rename_image = (oldPublicId, newPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return cloudinary_1.v2.uploader.rename(oldPublicId, newPublicId, {
            resource_type: "image",
        });
    }
    catch (error) {
        console.log("lỗi");
        console.log(error);
        return null;
    }
});
exports.cloudinary_rename_image = cloudinary_rename_image;
const cloudinary_get_image_details = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.v2.api.resource(public_id, {
        resource_type: "image",
    });
    return result;
});
exports.cloudinary_get_image_details = cloudinary_get_image_details;
const cloudinary_exists_asset = (public_id_1, ...args_1) => __awaiter(void 0, [public_id_1, ...args_1], void 0, function* (public_id, resourceType = "image") {
    try {
        const exists = yield cloudinary_1.v2.api.resource(public_id, {
            resource_type: resourceType,
        });
        return exists;
    }
    catch (error) {
        return null;
    }
});
exports.cloudinary_exists_asset = cloudinary_exists_asset;
