import express, { Application } from 'express';
import * as controller from '../../controller/client/accounts.controller'
import { login_patch_validate, register_post_validate } from '../../middlewares/client/accounts.middleware';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.get("/dang-nhap", controller.login);

router.patch("/dang-nhap", login_patch_validate, controller.login_patch);

router.get("/dang-ky", controller.register);

router.post(
  "/dang-ky",
  upload.none(),
  register_post_validate,
  controller.register_post
);

router.get("/dang-xuat", controller.logout);

export default router;