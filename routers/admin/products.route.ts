import express, { Application } from 'express';
import * as controller from '../../controller/admin/products.controller'
import multer from "multer";
import {
  upload_single,
  upload_multi,
} from "../../middlewares/admin/upload_image.middleware";

const upload = multer();
const router = express.Router();

router.get("/index", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.array("images", 6),
  upload_multi,
  controller.create_post
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.array("images", 6),
  upload_multi,
  controller.edit_patch
);

router.patch(
  "/xoa-mem/:id",
  controller.delete_soft
);


router.get("/thung-rac", controller.trash);

router.patch("/khoi-phuc/:id", controller.restore);

router.delete("/xoa-cung/:id", controller.hard_delete);


export default router;