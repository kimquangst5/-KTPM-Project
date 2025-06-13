import express, { Application } from 'express';
import roles from './roles.route'
import accounts from "./accounts.route";
import product_categories from "./product_categories.route";
import products from "./products.route";
import manager from "./manager.route";

import { check_login_validate } from '../../middlewares/client/check_login.middleware';
import { login } from '../../controller/admin/accounts.controller';

const router = express.Router();

const index = (app: Application) => {
    app.set("strict routing", false);
    app.use(check_login_validate);
    app.use("/admin", manager);
    app.use("/admin/roles", roles);
    app.use("/admin/accounts", accounts);
    app.use("/admin/product_categories", product_categories);
    app.use("/admin/products", products);
}


export default index;