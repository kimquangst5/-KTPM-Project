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
exports.create_post = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const admin_accounts_model_1 = __importDefault(require("../../models/admin_accounts.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const bcrypt_helper_1 = require("../../helpers/bcrypt.helper");
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
    if (req.body["avatar"]) {
        const avatar = yield assets_model_1.default.create(req.body["avatar"]);
        req.body["avatar"] = avatar._id;
    }
    req.body.password = yield (0, bcrypt_helper_1.bcrypt_hash)(req.body.password);
    req.body.role_id = (req.body.role_id ? new mongodb_1.ObjectId(req.body.role_id) : null);
    yield admin_accounts_model_1.default.create(req.body);
    res.json({
        success: true,
    });
});
exports.create_post = create_post;
