import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import { parse_date } from "../../helpers/format_date.helper";

export const index = async (req: Request, res: Response) => {
  const accounts = await Account.find({
    deleted: false,
  }).populate({
    path: "role_id avatar",
  });
  res.render("admin/pages/accounts/index.pug", {
    accounts,
  });
};

export const create = async (req: Request, res: Response) => {
  const roles = await Roles.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    roles,
  });
};

export const create_post = async (req: Request, res: Response) => {
  if(req.body["avatar"]){
    const avatar = await Assets.create(req.body["avatar"]);
    req.body["avatar"] = avatar._id;
  }
  req.body.password = await bcrypt_hash(req.body.password);
  req.body.role_id = (req.body.role_id ? new ObjectId(req.body.role_id): null);
  await Account.create(req.body);
  res.json({
    success: true,
  });
};
export const update = async (req: Request, res: Response) => {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false,
  }).populate("avatar role_id");
  const roles = await Roles.find({
    deleted: false
  })
  
  res.render("admin/pages/accounts/update.pug", {
    account,
    roles
  });
}

export const update_patch = async (req: Request, res: Response) => {
  req.body.birthday = req.body.birthday ? parse_date(req.body.birthday) : null;
  await Account.updateOne({
    _id: req.params.id
  }, req.body)
    res.cookie(
      "alert",
      JSON.stringify({
        icon: "success",
        title: "Cập nhật thành công!",
      })
    );
  res.json({
    success: true
  })
}