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
exports.logout = exports.register_post = exports.register = exports.login_patch = exports.login = void 0;
const mongodb_1 = require("mongodb");
const bcrypt_helper_1 = require("../../helpers/bcrypt.helper");
const user_accounts_model_1 = __importDefault(require("../../models/user_accounts.model"));
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/accounts/login.pug", {});
});
exports.login = login;
const login_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const new_token = yield (0, jwt_helpers_1.jwt_create)({
        _id: check_account._id,
        email: check_account.email,
        username: check_account.username,
    });
    yield user_accounts_model_1.default.updateOne({ _id: check_account._id }, {
        token: new_token,
    });
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Đăng nhập thành công",
    }));
    res.cookie("token", new_token);
    res.json({
        success: true,
        message: "Đăng nhập thành công!"
    });
});
exports.login_patch = login_patch;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/accounts/register.pug");
});
exports.register = register;
const register_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirm_password, fullname, phone, address, city, country, } = req.body;
    req.body._id = new mongodb_1.ObjectId();
    req.body.password = yield (0, bcrypt_helper_1.bcrypt_hash)(req.body.password);
    req.body.token = yield (0, jwt_helpers_1.jwt_create)({
        _id: req.body._id,
        email: req.body.email,
        username: req.body.username,
    }, {
        expiresIn: '1d',
        issuer: "ecommerce-app",
        audience: "user",
        subject: "user_account",
        algorithm: "HS256",
        noTimestamp: true,
        jwtid: req.body._id.toString(),
        header: {
            typ: "JWT",
            alg: "HS256",
        },
    });
    yield user_accounts_model_1.default.create(req.body);
    res.cookie("token", req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Đăng ký thành công",
    }));
    res.json({
        success: true,
    });
});
exports.register_post = register_post;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.clearCookie("alert");
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Đăng xuất thành công",
    }));
    const backURL = req.get("referer") || "/";
    res.redirect(backURL);
});
exports.logout = logout;
