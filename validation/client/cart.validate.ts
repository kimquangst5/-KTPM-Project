import UserAccount from "../../models/user_accounts.model";
import { bcrypt_compare } from "../../helpers/bcrypt.helper";
import Account from "../../models/admin_accounts.model";
import { Request, Response, NextFunction } from "express";

export const add_to_cart = async (req: Request, res: Response, next: NextFunction) => {
    const { quantity } = req.body;
    const data_error = {
      success: false,
      icon: "error",
      message: [],
    };
    if (!quantity) data_error.message.push("Chưa nhập số lượng!");
    if (parseInt(quantity) <= 0) data_error.message.push("Số lượng sản phẩm cần >= 0!");
      if (data_error.message.length > 0) {
        res.json(data_error);
        return;
      }
    next();
  
};
