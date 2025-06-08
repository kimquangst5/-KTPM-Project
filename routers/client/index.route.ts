import express, { Application } from 'express';
import home from "./home.route";
import products from "./products.route";
import accounts from "./accounts.route";
import carts from "./cart.route";
import orders from "./orders.route";

const index = (app: Application) => {
    app.use("", home);
    app.use("/san-pham", products);
    app.use("/tai-khoan", accounts);
    app.use("/gio-hang", carts);
    app.use("/don-hang", orders);
}


export default index;