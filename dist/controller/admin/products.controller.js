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
exports.hard_delete = exports.restore = exports.trash = exports.delete_soft = exports.edit_patch = exports.edit = exports.create_post = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_categories_model_1 = __importDefault(require("../../models/product_categories.model"));
const create_tree_helper_1 = __importDefault(require("../../helpers/create_tree.helper"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const cloudinary_helper_1 = require("../../helpers/cloudinary.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find({
        deleted: false,
    })
        .populate({
        path: "product_categories images.assets_id created_by",
    })
        .sort({ createdAt: -1 });
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
    req.body.created_by = res.locals.INFOR_ADMIN._id;
    req.body.price = req.body.price ? parseInt(req.body.price) : 0;
    req.body.discount = req.body.discount ? parseInt(req.body.discount) : 0;
    for (const it of req.body.images) {
        const result = yield assets_model_1.default.create(it);
        it._id = new mongodb_1.ObjectId(result._id);
    }
    req.body.images = req.body.images.map((it, index) => {
        return {
            assets_id: new mongodb_1.ObjectId(it._id),
            position: index + 1,
        };
    });
    yield products_model_1.default.create(req.body);
    res.cookie("alert", JSON.stringify({
        icon: 'success',
        title: "Thêm sản phẩm thành công!",
    }));
    res.json({
        success: true,
        message: 'Thêm sản phẩm thành công!'
    });
});
exports.create_post = create_post;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findById(req.params.id).populate({
        path: "product_categories images.assets_id created_by updated_by",
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
    req.body.updated_by = res.locals.INFOR_ADMIN._id;
    req.body.featured = JSON.parse(req.body.featured);
    console.log(req.body.featured);
    req.body.product_categories = req.body.product_categories
        ? req.body.product_categories
        : null;
    let index = 0;
    let array_data = [];
    if (req.body.array_data_image &&
        JSON.parse(req.body.array_data_image).length > 0) {
        for (const it of JSON.parse(req.body.array_data_image)) {
            if (it.new == true) {
                const new_result = yield assets_model_1.default.create(req.body.images[index]);
                it["assets_id"] = new_result._id;
                index++;
            }
            array_data.push(it);
        }
        req.body.images = array_data;
    }
    else {
        delete req.body.images;
    }
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
        deleted_by: res.locals.INFOR_ADMIN._id,
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
const trash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find({
        deleted: true,
    })
        .populate({
        path: "product_categories images.assets_id deleted_by",
    })
        .sort({ updatedAt: -1 });
    res.render("admin/pages/products/trash.pug", {
        products,
    });
});
exports.trash = trash;
const restore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.default.updateOne({
        _id: req.params.id,
    }, {
        deleted: false,
    });
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Khôi phục thành công",
    }));
    res.json({
        success: true,
        message: 'Khôi phục thành công!'
    });
});
exports.restore = restore;
const hard_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findOne({
        _id: req.params.id,
    }).populate("images.assets_id");
    if (product.images.length > 0) {
        const array_public_id = product.images.map((it) => it.assets_id["public_id"]);
        console.log(array_public_id);
        yield (0, cloudinary_helper_1.cloudinary_delete_many)(array_public_id);
    }
    yield products_model_1.default.deleteOne({
        _id: req.params.id
    });
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Xóa vĩnh viên thành công!",
    }));
    res.json({
        success: true,
        message: "Xóa vĩnh viên thành công!",
    });
});
exports.hard_delete = hard_delete;
