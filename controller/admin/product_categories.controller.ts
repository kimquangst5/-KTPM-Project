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
