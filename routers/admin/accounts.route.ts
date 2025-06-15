import express, { Application } from 'express';
import * as controller from '../../controller/admin/accounts.controller'
import multer from "multer";
import { upload_single } from "../../middlewares/admin/upload_image.middleware";
import { create_post_validate } from '../../validation/admin/accounts.validate';

const upload = multer();
const router = express.Router();

router.get("/index", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  create_post_validate,
  upload_single,
  controller.create_post
);

router.get(
  "/cap-nhat/:id",
  controller.update
);

router.patch("/cap-nhat/:id", controller.update_patch);






export default router;