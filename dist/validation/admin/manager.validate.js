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
exports.login_patch_validate = void 0;
const bcrypt_helper_1 = require("../../helpers/bcrypt.helper");
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const login_patch_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, password, } = req.body;
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    if (!account)
        data_error.message.push("Chưa nhập tài khoản!");
    if (!password)
        data_error.message.push("Chưa nhập mật khẩu!");
    if (account) {
        const check_account = yield admin_accounts_model_1.default.findOne({
            $or: [
                {
                    email: account,
                },
                {
                    username: account,
                },
            ],
        });
        if (!check_account)
            data_error.message.push("Tài khoản hoặc mật khẩu không hợp lệ!");
        else {
            const check_password = yield (0, bcrypt_helper_1.bcrypt_compare)(password, check_account.password);
            if (check_password == false)
                data_error.message.push("Tài khoản hoặc mật khẩu không hợp lệ!");
        }
    }
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    next();
});
exports.login_patch_validate = login_patch_validate;
