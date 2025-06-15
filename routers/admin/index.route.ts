import express, { Application } from 'express';
import roles from './roles.route'
import accounts from "./accounts.route";
import product_categories from "./product_categories.route";
import products from "./products.route";
import manager from "./manager.route";

import { check_login_admin } from '../../middlewares/admin/check_login.middleware';
import { login } from '../../controller/admin/accounts.controller';

const router = express.Router();

const index = (app: Application) => {
    app.set("strict routing", false);
    app.use("/admin", manager);
    app.use(check_login_admin);
    app.use("/admin/roles", roles);
    app.use("/admin/accounts", accounts);
    app.use("/admin/product_categories", product_categories);
    app.use("/admin/products", products);
}


export default index;