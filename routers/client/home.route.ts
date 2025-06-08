import express, { Application } from 'express';
import * as controller from '../../controller/client/home.controller'
const router = express.Router();

router.get("", controller.index);

export default router;