"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const status_const_1 = require("../constants/status.const");
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const categories_schema = new mongoose_1.Schema({
    name: String,
    parent_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        },
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        default: status_const_1.product_categories_const.ACTIVE,
    },
    avatar: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Asset",
        default: null,
    },
}, {
    timestamps: true,
    autoCreate: true,
});
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const Product_Categories = (0, mongoose_1.model)("Product Category", categories_schema);
exports.default = Product_Categories;
