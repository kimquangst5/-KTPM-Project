import express, { Application } from 'express';
import home from "./home.route";
import products from "./products.route";
import accounts from "./accounts.route";

const index = (app: Application) => {
    app.use("", home);
    app.use("/san-pham", products);
    app.use("/tai-khoan", accounts);
}


export default index;