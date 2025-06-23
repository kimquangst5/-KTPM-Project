import express, { Application } from 'express';
import * as controller from '../../controller/admin/media.controller'
import multer from "multer";
import { image_edit_patch_validate } from '../../validation/admin/media.validate';

const upload = multer();
const router = express.Router();

router.get("/image", controller.image);

router.get("/image/edit", controller.image_edit);

router.patch(
    "/image/edit",
    image_edit_patch_validate,
    controller.image_edit_patch
);
router.delete("/image/xoa-mot", controller.image_delete);

router.delete("/image/xoa-nhieu", controller.image_deletes);


export default router;