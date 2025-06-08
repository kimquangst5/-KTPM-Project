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
exports.create_post = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_categories_model_1 = __importDefault(require("../../models/product_categories.model"));
const create_tree_helper_1 = __importDefault(require("../../helpers/create_tree.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield product_categories_model_1.default.find({
        deleted: false,
    })
        .populate("parent_id avatar", "name secure_url")
        .sort({ createdAt: -1 });
    res.render("admin/pages/product_categories/index.pug", {
        categories,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield product_categories_model_1.default.find({
        deleted: false,
    });
    const tree_categories = (0, create_tree_helper_1.default)(categories);
    res.render("admin/pages/product_categories/create.pug", {
        tree_categories,
    });
});
exports.create = create;
const create_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body["avatar"]) {
        const avatar = yield assets_model_1.default.create(req.body["avatar"]);
        req.body["avatar"] = avatar._id;
    }
    req.body["parent_id"] = req.body["parent_id"] === "" ? null : new mongodb_1.ObjectId(req.body["parent_id"]);
    yield product_categories_model_1.default.create(req.body);
    res.json({
        success: true,
    });
});
exports.create_post = create_post;
