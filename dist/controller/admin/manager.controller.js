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
exports.login_patch = exports.login = void 0;
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/login.pug");
});
exports.login = login;
const login_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, password, remember } = req.body;
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
    const new_token = yield (0, jwt_helpers_1.jwt_create)({
        _id: check_account._id,
        email: check_account.email,
        username: check_account.username,
    }, {
        expiresIn: "1d",
        issuer: "ecommerce-app",
        audience: "manager",
        subject: "admin_account",
        algorithm: "HS256",
        noTimestamp: true,
        jwtid: check_account._id.toString(),
        header: {
            typ: "JWT",
            alg: "HS256",
        },
    });
    yield admin_accounts_model_1.default.updateOne({
        _id: check_account._id,
    }, {
        token: new_token,
    });
    res.cookie("token", new_token, {
        expires: remember == true ? new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) : null,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.json({
        success: true,
        message: "Đăng nhập thành công!",
        continue: req.body.continue ? req.body.continue : null
    });
});
exports.login_patch = login_patch;
