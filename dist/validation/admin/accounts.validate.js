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
exports.create_post_validate = void 0;
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const create_post_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, username, password, confim_password } = req.body;
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    if (!email)
        data_error.message.push("Chưa nhập email!");
    if (!username)
        data_error.message.push("Chưa nhập tên đăng nhập!");
    if (!password)
        data_error.message.push("Chưa nhập mật khẩu!");
    if (!confim_password)
        data_error.message.push("Chưa nhập xác nhận mật khẩu!");
    if (password && confim_password && password != confim_password)
        data_error.message.push("Mật khẩu không khớp!");
    if (email) {
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(email))
            data_error.message.push("Email không hợp lệ!");
        const check_email = yield admin_accounts_model_1.default.findOne({
            email: email,
        });
        if (check_email)
            data_error.message.push("Email đã tồn tại!");
    }
    if (username) {
        const check_username = yield admin_accounts_model_1.default.findOne({
            username: username,
        });
        if (check_username)
            data_error.message.push("Tên đăng nhập đã tồn tại!");
    }
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    next();
});
exports.create_post_validate = create_post_validate;
