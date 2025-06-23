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
exports.image_edit_patch_validate = void 0;
require("../../configs/cloudinary.config");
const cloudinary_helper_1 = require("../../helpers/cloudinary.helper");
const image_edit_patch_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    const { public_id } = req["query"];
    if (public_id == req.body["public_id"])
        data_error.message.push("Bạn chưa thay đổi public id!");
    else {
        const check = yield (0, cloudinary_helper_1.cloudinary_exists_asset)(req.body.public_id);
        if (check)
            data_error.message.push(`Tên đã trùng với file tên là: ${check["display_name"]}`);
    }
    console.log(data_error.message);
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    else {
        console.log("next thôi");
        next();
    }
});
exports.image_edit_patch_validate = image_edit_patch_validate;
