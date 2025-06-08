import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import Product_Categories from "../../models/product_categories.model";
import create_tree_helper from "../../helpers/create_tree.helper";
import Product from "../../models/products.model";
import UserAccount from "../../models/user_accounts.model";
import { jwt_create, jwt_verify } from "../../helpers/jwt.helpers";
import Carts from "../../models/carts.model";

export const add_to_cart = async (req: Request, res: Response) => {
  console.log(req.body);
  const { product_id, user_id, quantity  } = req.body;
  const check_exsit = await Carts.findOne({
    product_id: product_id,
    user_id: user_id,
  });
  if (check_exsit){
    await Carts.updateOne(
      {
        product_id: product_id,
        user_id: user_id,
      },
      {
        quantity: check_exsit.quantity + quantity,
      }
    ); 
  }
  else
    
    await Carts.create(req.body);

  res.json({
    success: true,
    message: "Thêm vào giỏ hàng thành công",
  });
};

export const get_cart = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const data = await jwt_verify(token);
  const carts = await Carts.find({ user_id: new ObjectId(data._id) })
    .populate("user_id")
    .populate({
      path: "product_id",
      populate: [
        { path: "images", model: "Asset" },
        // đọc trường product_categories
        { path: "product_categories", model: "Product Category" },
      ],
    })
    .exec();

  res.render("client/pages/cart/list.pug", {
    carts,
  });
};

export const delete_cart = async (req: Request, res: Response) => {
  await Carts.deleteOne({
    _id: req.params.id
  })
  res.cookie('alert', JSON.stringify({
    icon: 'success',
    title: 'Xóa thành công!'
  }))
  const backURL = req.get("referer") || "/";
  res.redirect(backURL);
}