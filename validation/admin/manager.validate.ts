import { NextFunction, Request, Response } from "express";
import UserAccount from "../../models/user_accounts.model";
import { bcrypt_compare } from "../../helpers/bcrypt.helper";
import Account from "../../models/admin_accounts.model";
import { accounts_const } from "../../constants/status.const";

export const login_patch_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { account, password } = req.body;
  const data_error = {
    success: false,
    icon: "error",
    message: [],
  };
  if (!account) data_error.message.push("Chưa nhập tài khoản!");
  if (!password) data_error.message.push("Chưa nhập mật khẩu!");
  if (account) {
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
    if (!check_account)
      data_error.message.push("Tài khoản hoặc mật khẩu không hợp lệ!");
    else {
      if (check_account.deleted == true)
        data_error.message.push("Tài khoản của bạn đã bị xóa!");
      if (check_account.status == accounts_const.INACTIVE)
        data_error.message.push("Tài khoản của bạn đã tạm khóa!");
      const check_password = await bcrypt_compare(
        password,
        check_account.password
      );
      if (check_password == false)
        data_error.message.push("Tài khoản hoặc mật khẩu không hợp lệ!");
    }
  }
  if (data_error.message.length > 0) {
    res.json(data_error);
    return;
  }
  next();
};
