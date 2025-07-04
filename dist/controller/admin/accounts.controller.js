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
exports.hard_delete = exports.restore = exports.trash = exports.delete_patch = exports.update_patch = exports.update = exports.create_post = exports.create = exports.index = exports.login = void 0;
const mongodb_1 = require("mongodb");
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const bcrypt_helper_1 = require("../../helpers/bcrypt.helper");
const format_date_helper_1 = require("../../helpers/format_date.helper");
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('admin/pages/accounts/login.pug');
});
exports.login = login;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield admin_accounts_model_1.default.find({
        deleted: false,
    }).populate({
        path: "role_id avatar",
    });
    res.render("admin/pages/accounts/index.pug", {
        accounts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/accounts/create.pug", {
        roles,
    });
});
exports.create = create;
const create_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    if (req.body["avatar"]) {
        const avatar = yield assets_model_1.default.create(req.body["avatar"]);
        req.body["avatar"] = avatar._id;
    }
    req.body.password = yield (0, bcrypt_helper_1.bcrypt_hash)(req.body.password);
    req.body.role_id = (req.body.role_id ? new mongodb_1.ObjectId(req.body.role_id) : null);
    req.body.token = yield (0, jwt_helpers_1.jwt_create)({
        _id: req.body._id,
        email: req.body.email,
        username: req.body.username,
    }, {
        expiresIn: '1d',
        issuer: "ecommerce-app",
        audience: "manager",
        subject: "admin_account",
        algorithm: "HS256",
        noTimestamp: true,
        jwtid: req.body._id.toString(),
        header: {
            typ: "JWT",
            alg: "HS256",
        },
    });
    yield admin_accounts_model_1.default.create(req.body);
    res.json({
        success: true,
    });
});
exports.create_post = create_post;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield admin_accounts_model_1.default.findOne({
        _id: req.params.id,
        deleted: false,
    }).populate("avatar role_id");
    account["birthday_new"] = (account.birthday ? yield (0, format_date_helper_1.format_date)(account.birthday) : "");
    const roles = yield roles_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/accounts/update.pug", {
        account,
        roles
    });
});
exports.update = update;
const update_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.birthday = req.body.birthday ? (0, format_date_helper_1.parse_date)(req.body.birthday) : null;
    req.body.role_id = req.body.role_id ? new mongodb_1.ObjectId(req.body.role_id) : null;
    yield admin_accounts_model_1.default.updateOne({
        _id: req.params.id
    }, req.body);
    res.cookie("alert", JSON.stringify({
        icon: "success",
        title: "Cập nhật thành công!",
    }));
    res.json({
        success: true
    });
});
exports.update_patch = update_patch;
const delete_patch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin_accounts_model_1.default.updateOne({
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
    const accounts = yield admin_accounts_model_1.default.find({
        deleted: true,
    }).populate({
        path: "role_id avatar",
    });
    res.render("admin/pages/accounts/trash.pug", {
        accounts,
    });
});
exports.trash = trash;
const restore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin_accounts_model_1.default.updateOne({
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
    yield admin_accounts_model_1.default.deleteOne({
        _id: req.params.id,
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
