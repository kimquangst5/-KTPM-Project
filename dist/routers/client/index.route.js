"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_route_1 = __importDefault(require("./home.route"));
const products_route_1 = __importDefault(require("./products.route"));
const accounts_route_1 = __importDefault(require("./accounts.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const orders_route_1 = __importDefault(require("./orders.route"));
const check_login_middleware_1 = require("../../middlewares/client/check_login.middleware");
const index = (app) => {
    app.use(check_login_middleware_1.check_login_validate);
    app.use("", home_route_1.default);
    app.use("/san-pham", products_route_1.default);
    app.use("/tai-khoan", accounts_route_1.default);
    app.use("/gio-hang", cart_route_1.default);
    app.use("/don-hang", orders_route_1.default);
};
exports.default = index;
