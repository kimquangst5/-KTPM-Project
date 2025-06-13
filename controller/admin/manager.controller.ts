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
