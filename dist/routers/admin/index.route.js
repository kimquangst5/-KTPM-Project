"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roles_route_1 = __importDefault(require("./roles.route"));
const accounts_route_1 = __importDefault(require("./accounts.route"));
const product_categories_route_1 = __importDefault(require("./product_categories.route"));
const products_route_1 = __importDefault(require("./products.route"));
const check_login_middleware_1 = require("../../middlewares/client/check_login.middleware");
const router = express_1.default.Router();
const index = (app) => {
    app.use(check_login_middleware_1.check_login_validate);
    app.use("/admin/roles", roles_route_1.default);
    app.use("/admin/accounts", accounts_route_1.default);
    app.use("/admin/product_categories", product_categories_route_1.default);
    app.use("/admin/products", products_route_1.default);
};
exports.default = index;
