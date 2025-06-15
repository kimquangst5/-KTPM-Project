import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import { parse_date } from "../../helpers/format_date.helper";
import { jwt_create } from "../../helpers/jwt.helpers";

export const login = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/login.pug");
};


export const login_patch = async (req: Request, res: Response) => {
  const { account, password, remember } = req.body;
  const check_account = await Account.findOne({
    $or: [
      {
        email: account,
      },
      {
        username: account,
      },
    ],
  });
  const new_token = await jwt_create(
    {
      _id: check_account._id,
      email: check_account.email,
      username: check_account.username,
    },
    {
      expiresIn: "1d",
      issuer: "ecommerce-app",
      audience: "manager",
      subject: "admin_account",
      algorithm: "HS256",
      noTimestamp: true,
      jwtid: check_account._id.toString(),
      header: {
        typ: "JWT",
        alg: "HS256",
      },
    }
  );

  await Account.updateOne(
    {
      _id: check_account._id,
    },
    {
      token: new_token,
    }
  );
  res.cookie("token", new_token, {
    expires: remember == true ? new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) : null, // ngày hiện tại + 1 ngày
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });


  res.json({
    success: true,
    message: "Đăng nhập thành công!",
    continue: req.body.continue ? req.body.continue : null
  });
  
};