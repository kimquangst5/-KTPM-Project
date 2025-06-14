import { NextFunction, Request, Response } from "express";
import UserAccount from "../../models/user_accounts.model";
import { jwt_verify } from "../../helpers/jwt.helpers";

export const check_login_validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.cookies.tokenUser;
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
        res.clearCookie("tokenUser");
      } else {

        const user = await UserAccount.findOne({
          _id: data._id,
          email: data.email,
          username: data.username,
        }).select("-password -__v -createdAt -updatedAt");
        res.locals.INFOR_USER = user;
        
        if (token != user["token"]) {
          res.clearCookie("tokenUser");
          res.cookie(
            "alert",
            JSON.stringify({
              icon: "warning",
              title: "Tài khoản của bạn đã được đăng nhập ở nơi khác!.",
            })
          );
          res.redirect('/');
          return
        }
      }
    }
    next();
  } catch (error) {
   if(token){
    res.clearCookie("tokenUser");
    res.redirect("/")
   } 
  }
};
