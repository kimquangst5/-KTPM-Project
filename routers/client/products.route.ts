import express, { Application } from 'express';
import * as controller from '../../controller/client/products.controller'
const router = express.Router();

router.get("/:slug", controller.detail);

router.get("", controller.list);

export default router;