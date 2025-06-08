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
exports.check_login_validate = void 0;
const user_accounts_model_1 = __importDefault(require("../../models/user_accounts.model"));
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const check_login_validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    try {
        if (token) {
            const data = yield (0, jwt_helpers_1.jwt_verify)(token);
            if (data == null) {
                res.cookie("alert", JSON.stringify({
                    icon: "warning",
                    title: "Hết phiên đăng nhập\nVui lòng đăng nhập lại.",
                }));
                res.clearCookie("token");
            }
            else {
                const user = yield user_accounts_model_1.default.findOne({
                    _id: data._id,
                    email: data.email,
                    username: data.username,
                }).select("-password -__v -createdAt -updatedAt");
                res.locals.INFOR_USER = user;
                if (token != user["token"]) {
                    res.clearCookie("token");
                    res.cookie("alert", JSON.stringify({
                        icon: "warning",
                        title: "Tài khoản của bạn đã được đăng nhập ở nơi khác!.",
                    }));
                    res.redirect('/');
                    return;
                }
            }
        }
        next();
    }
    catch (error) {
        if (token) {
            res.clearCookie("token");
            res.redirect("/");
        }
    }
});
exports.check_login_validate = check_login_validate;
