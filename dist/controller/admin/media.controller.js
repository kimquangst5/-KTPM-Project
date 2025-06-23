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
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_deletes = exports.image_delete = exports.image_edit_patch = exports.image_edit = exports.image = void 0;
const cloudinary_helper_1 = require("../../helpers/cloudinary.helper");
const image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield (0, cloudinary_helper_1.cloudinary_get_all_assets)("Kim_Quang");
    res.render("admin/pages/media/image.pug", {
        assets,
    });
});
exports.image = image;
const image_edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id } = req.query;
    const asset = yield (0, cloudinary_helper_1.cloudinary_get_image_details)(public_id);
    res.render("admin/pages/media/image edit.pug", {
        asset,
    });
});
exports.image_edit = image_edit;
const image_edit_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id } = req.body;
    const ok = yield (0, cloudinary_helper_1.cloudinary_rename_image)(req.query.public_id, req.body.public_id);
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Cập nhật thành công!"
    }));
    res.json({
        success: true,
        message: "Cập nhật thành công!",
        redirect: `/admin/media/image/edit?public_id=${req.body.public_id}`,
    });
});
exports.image_edit_patch = image_edit_patch;
const image_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id } = req.body;
    yield (0, cloudinary_helper_1.cloudinary_delete_one)(public_id);
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Xóa thành công!",
    }));
    res.json({
        success: true,
        message: "Xóa thành công!",
    });
});
exports.image_delete = image_delete;
const image_deletes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { public_id } = req.body;
    yield (0, cloudinary_helper_1.cloudinary_delete_many)(public_id);
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Xóa thành công!",
    }));
    res.json({
        success: true,
        message: "Xóa thành công!",
    });
});
exports.image_deletes = image_deletes;
