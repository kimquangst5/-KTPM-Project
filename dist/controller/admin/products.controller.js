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
exports.delete_soft = exports.edit_patch = exports.edit = exports.create_post = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_categories_model_1 = __importDefault(require("../../models/product_categories.model"));
const create_tree_helper_1 = __importDefault(require("../../helpers/create_tree.helper"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find({
        deleted: false,
    }).populate({
        path: "product_categories images",
    }).sort({ createdAt: -1 });
    res.render("admin/pages/products/index.pug", {
        products,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_categories = yield product_categories_model_1.default.find({
        deleted: false,
    });
    const tree_categories = (0, create_tree_helper_1.default)(product_categories);
    res.render("admin/pages/products/create.pug", {
        product_categories,
        tree_categories,
    });
});
exports.create = create;
const create_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.product_categories = req.body.product_categories
        ? req.body.product_categories
        : null;
    req.body.price = req.body.price ? parseInt(req.body.price) : 0;
    req.body.discount = req.body.discount ? parseInt(req.body.discount) : 0;
    for (const it of req.body.images) {
        const result = yield assets_model_1.default.create(it);
        it._id = new mongodb_1.ObjectId(result._id);
    }
    req.body.images = req.body.images.map((it) => new mongodb_1.ObjectId(it._id));
    yield products_model_1.default.create(req.body);
    res.json({
        success: true,
    });
});
exports.create_post = create_post;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findById(req.params.id).populate({
        path: "product_categories images",
    });
    if (!product)
        return res.redirect("/admin/products/index");
    const product_categories = yield product_categories_model_1.default.find({
        deleted: false,
    });
    const tree_categories = (0, create_tree_helper_1.default)(product_categories);
    res.render("admin/pages/products/edit.pug", {
        product,
        product_categories,
        tree_categories,
    });
});
exports.edit = edit;
const edit_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body.images;
    yield products_model_1.default.updateOne({
        _id: req.params.id
    }, req.body);
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Cập nhật thành công!",
    }));
    res.json({
        success: true,
        message: 'Cập nhật thành công!'
    });
});
exports.edit_patch = edit_patch;
const delete_soft = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.default.updateOne({
        _id: req.params.id
    }, {
        deleted: true
    });
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Xóa (mềm) sản phẩm thành công!",
    }));
    res.json({
        success: true,
        message: "Xóa (mềm) sản phẩm thành công!"
    });
});
exports.delete_soft = delete_soft;
