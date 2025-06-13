import express, { Application } from 'express';
import * as controller from '../../controller/admin/manager.controller'
const router = express.Router();

router.get("", controller.login);

export default router;