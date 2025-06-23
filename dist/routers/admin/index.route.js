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
const manager_route_1 = __importDefault(require("./manager.route"));
const media_route_1 = __importDefault(require("./media.route"));
const check_login_middleware_1 = require("../../middlewares/admin/check_login.middleware");
const router = express_1.default.Router();
const index = (app) => {
    app.set("strict routing", false);
    app.use("/admin", manager_route_1.default);
    app.use(check_login_middleware_1.check_login_admin);
    app.use("/admin/roles", roles_route_1.default);
    app.use("/admin/accounts", accounts_route_1.default);
    app.use("/admin/product_categories", product_categories_route_1.default);
    app.use("/admin/products", products_route_1.default);
    app.use("/admin/media", media_route_1.default);
};
exports.default = index;
