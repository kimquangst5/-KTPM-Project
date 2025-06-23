import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import "../../configs/cloudinary.config";
import { cloudinary_exists_asset } from "../../helpers/cloudinary.helper";

export const image_edit_patch_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data_error = {
    success: false,
    icon: "error",
    message: [],
  };
  const { public_id } = req["query"];
  if ((public_id as string) == req.body["public_id"])
    data_error.message.push("Bạn chưa thay đổi public id!");
  else {
    const check = await cloudinary_exists_asset(req.body.public_id);
    if (check) data_error.message.push(
      `Tên đã trùng với file tên là: ${check["display_name"]}`
    );
  }
  console.log(data_error.message);
  
  if (data_error.message.length > 0) {
    res.json(data_error);
    return;
  }
  else{
    console.log("next thôi");
    next();

  }
  // await cloudinary_rename_image(public_id as string, req.body.public_id);
};
