import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import Product_Categories from "../../models/product_categories.model";
import create_tree_helper from "../../helpers/create_tree.helper";

export const index = async (req: Request, res: Response) => {
  const categories = await Product_Categories.find({
    deleted: false,
  })
    .populate("parent_id avatar", "name secure_url")
    .sort({ createdAt: -1 });

  res.render("admin/pages/product_categories/index.pug", {
    categories,
  });
};

export const create = async (req: Request, res: Response) => {
  const categories = await Product_Categories.find({
    deleted: false,
  });
  const tree_categories = create_tree_helper(categories);

  res.render("admin/pages/product_categories/create.pug", {
    tree_categories,
  });
};

export const create_post = async (req: Request, res: Response) => {
  if(req.body["avatar"]){
    const avatar = await Assets.create(req.body["avatar"]);
    req.body["avatar"] = avatar._id;
  }
  req.body["parent_id"] = (req.body["parent_id"] as string) === "" ? null : new ObjectId(req.body["parent_id"]);
  
  await Product_Categories.create(req.body);
  res.json({
    success: true,
  });
};

export const delete_patch = async (req: Request, res: Response) => {
  await Product_Categories.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: true,
    }
  );
  res.cookie('alert', JSON.stringify({
    icon: 'success',
    title: 'Xóa mềm thành công'
  }));
  res.json({
    success: true,
    message: "Xóa mềm thành công",
  });
};

export const trash = async (req: Request, res: Response) => {
  const roles = await Product_Categories.find({
    deleted: true,
  });
  res.render("admin/pages/product_categories/trash.pug", {
    roles,
  });
}

export const restore = async (req: Request, res: Response) => {
  await Product_Categories.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: false,
    }
  );
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Khôi phục thành công",
    })
  );
  res.json({
    success: true,
    message: 'Khôi phục thành công!'
  })
}

export const hard_delete = async (req: Request, res: Response) => {
  await Product_Categories.deleteOne({
    _id: req.params.id
  });
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Xóa vĩnh viên thành công!",
    })
  );
  res.json({
    success: true,
    message: "Xóa vĩnh viên thành công!",
  });
}
