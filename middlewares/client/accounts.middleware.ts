import { NextFunction, Request, Response } from "express";
import UserAccount from "../../models/user_accounts.model";
import { bcrypt_compare } from "../../helpers/bcrypt.helper";

export const register_post_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    email,
    password,
    confirm_password,
    fullname,
    phone,
    address,
    city,
    country,
  } = req.body;
  const data_error = {
    success: false,
    icon: "error",
    message: [],
  };
  if (password != confirm_password) data_error.message.push("Mật khẩu không khớp");
  const check_email = await UserAccount.findOne({
    email: email,
  }).select("email");
  if (check_email) data_error.message.push("Email đã tồn tại");
  const check_username = await UserAccount.findOne({
    username: username,
  });
  if (check_username)  data_error.message.push("Tên đăng nhập đã tồn tại");
  if (username.length < 6)  data_error.message.push("Tên đăng nhập phải từ 6 ký tự trở lên");
  if (data_error.message.length > 0) {
    res.json(data_error);
    return;
  }
  next();
  
};

export const login_patch_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data_error = {
    success: false,
    icon: "error",
    message: [],
  };
  
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
  if (check_account == null) data_error.message.push("Tài khoản không tồn tại!");
  else{
    const check_password = await bcrypt_compare(password, check_account.password);
    if (!check_password) data_error.message.push("Mật khẩu không đúng!");
  }
  
  if (data_error.message.length > 0) {
    res.json(data_error);
    return;
  }
  next();
  
};
