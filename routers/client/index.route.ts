import express, { Application } from 'express';
import home from "./home.route";
import products from "./products.route";
import accounts from "./accounts.route";
import carts from "./cart.route";
import orders from "./orders.route";
import { check_login_validate } from '../../middlewares/client/check_login.middleware';

const index = (app: Application) => {
    app.use(check_login_validate)
    app.use("", home);
    app.use("/san-pham", products);
    app.use("/tai-khoan", accounts);
    app.use("/gio-hang", carts);
    app.use("/don-hang", orders);
}


export default index;