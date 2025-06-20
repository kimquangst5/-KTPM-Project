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
exports.hard_delete = exports.restore = exports.trash = exports.delete_patch = exports.update_patch = exports.update = exports.create_post = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: false,
    })
        .populate("created_by");
    res.render("admin/pages/roles/index.pug", {
        roles,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create.pug", {});
});
exports.create = create;
const create_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.created_by = new mongodb_1.ObjectId(res.locals.INFOR_ADMIN._id);
    yield roles_model_1.default.create(req.body);
    res.json({
        success: true
    });
});
exports.create_post = create_post;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield roles_model_1.default.findOne({
        _id: req.params.id
    })
        .populate("created_by");
    res.render("admin/pages/roles/update.pug", {
        role,
    });
});
exports.update = update;
const update_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles_model_1.default.updateOne({
        _id: req.params.id
    }, req.body);
    res.cookie('alert', JSON.stringify({
        icon: 'success',
        title: 'Cập nhật thành công!'
    }));
    res.json({
        success: true,
        message: 'Cập nhật thành công'
    });
});
exports.update_patch = update_patch;
const delete_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles_model_1.default.updateOne({
        _id: req.params.id
    }, {
        deleted: true
    });
    res.cookie('alert', JSON.stringify({
        icon: 'success',
        title: 'Xóa mềm thành công'
    }));
    res.json({
        success: true,
        message: "Xóa mềm thành công",
    });
});
exports.delete_patch = delete_patch;
const trash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: true,
    });
    res.render("admin/pages/roles/trash.pug", {
        roles,
    });
});
exports.trash = trash;
const restore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles_model_1.default.updateOne({
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
    yield roles_model_1.default.deleteOne({
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
