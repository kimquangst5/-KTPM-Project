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
exports.check_login_admin = void 0;
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const status_const_1 = require("../../constants/status.const");
const check_login_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                const user = yield admin_accounts_model_1.default.findOne({
                    _id: data._id,
                    email: data.email,
                    username: data.username,
                    deleted: false,
                    status: status_const_1.accounts_const.ACTIVE
                }).select("-password -__v -createdAt -updatedAt");
                if (token != user["token"]) {
                    res.clearCookie("token");
                    res.cookie("alert", JSON.stringify({
                        icon: "warning",
                        title: "Tài khoản của bạn đã được đăng nhập ở nơi khác!.",
                    }));
                    res.redirect('/admin');
                    return;
                }
                res.locals.INFOR_ADMIN = user;
                res.locals.LOCATION_HREF = req.originalUrl;
                next();
            }
        }
        else {
            res.redirect(`/admin?continue=${req.path}`);
        }
    }
    catch (error) {
        if (token) {
            res.clearCookie("token");
            res.redirect("/admin");
        }
    }
});
exports.check_login_admin = check_login_admin;
