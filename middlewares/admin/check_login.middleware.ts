import { NextFunction, Request, Response } from "express";
import UserAccount from "../../models/user_accounts.model";
import { jwt_verify } from "../../helpers/jwt.helpers";
import Account from "../../models/admin_accounts.model";

export const check_login_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.cookies.token;
  try {
    if (token) {
      const data = await jwt_verify(token);
      if (data == null) {
        res.cookie(
          "alert",
          JSON.stringify({
            icon: "warning",
            title: "Hết phiên đăng nhập\nVui lòng đăng nhập lại.",
          })
        );
        res.clearCookie("token");
      } else {

        const user = await Account.findOne({
          _id: data._id,
          email: data.email,
          username: data.username,
        }).select("-password -__v -createdAt -updatedAt");
        
        if (token != user["token"]) {
          res.clearCookie("token");
          res.cookie(
            "alert",
            JSON.stringify({
              icon: "warning",
              title: "Tài khoản của bạn đã được đăng nhập ở nơi khác!.",
            })
          );
          res.redirect('/admin');
          return
        }
        res.locals.INFOR_ADMIN = user;
        next()
      }
    }
    else{
      res.redirect(`/admin?continue=${req.path}`);
    }
  } catch (error) {
   if(token){
    res.clearCookie("token");
    res.redirect("/admin")
   } 
  }
};
