import express, { Application } from 'express';
import * as controller from '../../controller/client/carts.controller';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post("/them-moi", controller.add_to_cart);

router.get("", controller.get_cart);

router.get("/xoa-san-pham/:id", controller.delete_cart);


export default router;