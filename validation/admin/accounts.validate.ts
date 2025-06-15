import { NextFunction, Request, Response } from "express";
import UserAccount from "../../models/user_accounts.model";
import { bcrypt_compare } from "../../helpers/bcrypt.helper";
import Account from "../../models/admin_accounts.model";

export const create_post_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);

  const { email, username, password, confim_password } = req.body;
  const data_error = {
    success: false,
    icon: "error",
    message: [],
  };
  if (!email) data_error.message.push("Chưa nhập email!");
  if (!username) data_error.message.push("Chưa nhập tên đăng nhập!");
  if (!password) data_error.message.push("Chưa nhập mật khẩu!");
  if (!confim_password) data_error.message.push("Chưa nhập xác nhận mật khẩu!");
  if (password && confim_password && password != confim_password)
    data_error.message.push("Mật khẩu không khớp!");
  if (email) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(email)) data_error.message.push("Email không hợp lệ!");
    const check_email = await Account.findOne({
      email: email,
    });
    if (check_email) data_error.message.push("Email đã tồn tại!");
  }
  if (username) {
    const check_username = await Account.findOne({
      username: username,
    });
    if (check_username) data_error.message.push("Tên đăng nhập đã tồn tại!");
  }

  if (data_error.message.length > 0) {
    res.json(data_error);
    return;
  }
  next();
};
