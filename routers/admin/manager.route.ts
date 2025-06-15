import express, { Application } from 'express';
import * as controller from '../../controller/admin/manager.controller'
import { login_patch_validate } from '../../validation/admin/manager.validate';
const router = express.Router();

router.get("", controller.login);

router.patch("/dang-nhap", login_patch_validate, controller.login_patch);

export default router;