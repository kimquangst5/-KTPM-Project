import express, { Application } from 'express';
import roles from './roles.route'
import accounts from "./accounts.route";
import product_categories from "./product_categories.route";
import products from "./products.route";
import { check_login_validate } from '../../middlewares/client/check_login.middleware';

const router = express.Router();

const index = (app: Application) => {
    app.use(check_login_validate);
    app.use("/admin/roles", roles);
    app.use("/admin/accounts", accounts);
    app.use("/admin/product_categories", product_categories);
    app.use("/admin/products", products);
}


export default index;