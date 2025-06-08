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
exports.login_patch_validate = exports.register_post_validate = void 0;
const user_accounts_model_1 = __importDefault(require("../../models/user_accounts.model"));
const register_post_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirm_password, fullname, phone, address, city, country, } = req.body;
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    if (password != confirm_password)
        data_error.message.push("Mật khẩu không khớp");
    const check_email = yield user_accounts_model_1.default.findOne({
        email: email,
    }).select("email");
    if (check_email)
        data_error.message.push("Email đã tồn tại");
    const check_username = yield user_accounts_model_1.default.findOne({
        username: username,
    });
    if (check_username)
        data_error.message.push("Tên đăng nhập đã tồn tại");
    if (username.length < 6)
        data_error.message.push("Tên đăng nhập phải từ 6 ký tự trở lên");
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    next();
});
exports.register_post_validate = register_post_validate;
const login_patch_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    const { account, password } = req.body;
    const check_account = yield user_accounts_model_1.default.findOne({
        $or: [
            {
                email: account,
            },
            {
                username: account,
            },
            {
                phone: account,
            },
        ],
    });
    console.log(check_account);
    if (check_account == null)
        data_error.message.push("Tài khoản không tồn tại!");
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    next();
});
exports.login_patch_validate = login_patch_validate;
