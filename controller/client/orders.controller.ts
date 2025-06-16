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
import Order from "../../models/orders.model";

export const add_order = async (req: Request, res: Response) => {

  const token = req.cookies.tokenUser;
  const data = await jwt_verify(token);
  req.body.infor_user.user_id = data._id;
  const carts = await Carts.find({
    user_id: data._id,
  }).populate("product_id")
  req.body.infor_products = []
  for (const it of carts) {
    req.body.infor_products.push({
      price: it.product_id["price"],
      discount: it.product_id["discount"],
      product_id: new ObjectId(it.product_id["_id"]),
      quantity: it["quantity"],
    });
  }
  const order = await Order.create(req.body);
  await Carts.deleteMany({
    user_id: data._id,
  });

  res.json({
    success: true,
    message: "Thêm đơn hàng thành công",
    order_id: order._id
  });
};

export const order_success = async (req: Request, res: Response) => {
  const order = await Order.findOne({
    _id: req.params.id,
  })
    .populate({
      path: "infor_user.user_id",
      model: "User Account",
    })
    .populate({
      path: "infor_products.product_id",
      model: "Product",
      populate: {
        path: "images.assets_id",
        model: "Asset",
      },
    })
    .exec();
    
  res.render("client/pages/orders/success.pug", {
    order
  });
};
