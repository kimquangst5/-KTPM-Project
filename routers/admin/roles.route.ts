import express, { Application } from 'express';
import * as controller from '../../controller/admin/roles.controller'
const router = express.Router();

router.get("", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.create_post);

router.get("/cap-nhat/:id", controller.update);

router.patch("/cap-nhat/:id", controller.update_patch);

router.patch("/xoa-mem/:id", controller.delete_patch);

router.get("/thung-rac", controller.trash);

router.patch("/khoi-phuc/:id", controller.restore);

router.delete("/xoa-cung/:id", controller.hard_delete);


export default router;