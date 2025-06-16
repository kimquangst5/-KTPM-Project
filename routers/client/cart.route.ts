import express, { Application } from 'express';
import * as controller from '../../controller/client/carts.controller';
import multer from "multer";
import { add_to_cart } from '../../validation/client/cart.validate';

const upload = multer();
const router = express.Router();

router.post("/them-moi", add_to_cart, controller.add_to_cart);

router.get("", controller.get_cart);

router.get("/xoa-san-pham/:id", controller.delete_cart);


export default router;