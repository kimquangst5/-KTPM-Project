import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import { format_date, parse_date } from "../../helpers/format_date.helper";
import { jwt_create } from "../../helpers/jwt.helpers";
import { cloudinary_delete_many, cloudinary_delete_one, cloudinary_exists_asset, cloudinary_get_all_assets, cloudinary_get_image_details, cloudinary_rename_image } from "../../helpers/cloudinary.helper";

export const image = async (req: Request, res: Response) => {
  const assets = await cloudinary_get_all_assets("Kim_Quang");
  res.render("admin/pages/media/image.pug", {
    assets,
  });
};

export const image_edit = async (req: Request, res: Response) => {
    const { public_id } = req.query;
    const asset = await cloudinary_get_image_details(public_id as string);
    
  res.render("admin/pages/media/image edit.pug", {
    asset,
  });
};

export const image_edit_patch = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  const ok = await cloudinary_rename_image(req.query.public_id as string, req.body.public_id);
  res.cookie("alert", JSON.stringify({
    icon: "success",
    title: "Cập nhật thành công!"
  }))
  res.json({
    success: true,
    message: "Cập nhật thành công!",
    redirect: `/admin/media/image/edit?public_id=${req.body.public_id}`,
  });
};

export const image_delete = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  await cloudinary_delete_one(public_id);

  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Xóa thành công!",
    })
  );
  res.json({
    success: true,
    message: "Xóa thành công!",
  });
};

export const image_deletes = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  await cloudinary_delete_many(public_id)

  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Xóa thành công!",
    })
  );
  res.json({
    success: true,
    message: "Xóa thành công!",
  });
};

