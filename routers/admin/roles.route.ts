import express, { Application } from 'express';
import * as controller from '../../controller/admin/roles.controller'
const router = express.Router();

router.get("/index", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.create_post);


export default router;