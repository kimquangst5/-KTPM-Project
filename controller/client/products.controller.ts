import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import Product_Categories from "../../models/product_categories.model";
import create_tree_helper from "../../helpers/create_tree.helper";
import Product from "../../models/products.model";

export const detail = async (req: Request, res: Response) => {

  const product = await Product.findOne({
    slug: req.params.slug,
    deleted: false,
  })
    .populate({
      path: "product_categories images",
    });
    
  res.render("client/pages/products/detail.pug", {
    product,
  });
};

export const list = async (req: Request, res: Response) => {
  const products = await Product.find({ deleted: false })
    .populate({
      path: "product_categories images",
    });

  res.render("client/pages/products/list.pug", {
    products,
  });
};