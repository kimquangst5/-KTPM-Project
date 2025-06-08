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
import { jwt_create } from "../../helpers/jwt.helpers";

export const login = async (req: Request, res: Response) => {
  res.render("client/pages/accounts/login.pug", {});
};

export const login_patch = async (req: Request, res: Response) => {
  console.log(req.body);
  const { account, password } = req.body;
  const check_account = await UserAccount.findOne({
      $or: [
        {
          email: account,
        },
        {
          username: account,
        },
        {
          phone: account,
        },
      ],
    });
  const new_token = await jwt_create({
    _id: check_account._id,
    email: check_account.email,
    username: check_account.username,
  });
  await UserAccount.updateOne(
    { _id: check_account._id },
    {
      token: new_token,
    }
  );
  res.cookie("alert", JSON.stringify({
    icon: "success",
    title: "Đăng nhập thành công",
  }));
  res.cookie("token", new_token);

  res.json({
    success: true
  })
};

export const register = async (req: Request, res: Response) => {
  res.render("client/pages/accounts/register.pug");
};

export const register_post = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    confirm_password,
    fullname,
    phone,
    address,
    city,
    country,
  } = req.body;
  req.body._id = new ObjectId();
  req.body.password = await bcrypt_hash(req.body.password);
  req.body.token = await jwt_create({
    _id: req.body._id,
    email: req.body.email,
    username: req.body.username,
  }, {
    expiresIn: '1d',
    issuer: "ecommerce-app",
    audience: "user",
    subject: "user_account",
    algorithm: "HS256",
    noTimestamp: true,
    jwtid: req.body._id.toString(),
    header: {
      typ: "JWT",
      alg: "HS256",
    },
    
  })
  await UserAccount.create(req.body);
  res.cookie("token", req.body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });
  res.cookie("alert", JSON.stringify({
    icon: "success",
    title: "Đăng ký thành công",
  }))
  res.json({
    success: true,
  })
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("alert");
  res.cookie("alert", JSON.stringify({
    icon: "success",
    title: "Đăng xuất thành công",
  }));
  const backURL = req.get("referer") || "/";
  res.redirect(backURL);
}