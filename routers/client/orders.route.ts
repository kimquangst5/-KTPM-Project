import express, { Application } from 'express';
import * as controller from '../../controller/client/orders.controller';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post("/them-don-hang", controller.add_order);

router.get("/:id", controller.order_success);


export default router;