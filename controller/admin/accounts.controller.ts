import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import { format_date, parse_date } from "../../helpers/format_date.helper";
import { jwt_create } from "../../helpers/jwt.helpers";

export const login = async (req: Request, res: Response) => {
  res.render('admin/pages/accounts/login.pug')
}

export const index = async (req: Request, res: Response) => {
  const accounts = await Account.find({
    deleted: false,
  }).populate({
    path: "role_id avatar",
  });
  res.render("admin/pages/accounts/index.pug", {
    accounts,
  });
};

export const create = async (req: Request, res: Response) => {
  const roles = await Roles.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    roles,
  });
};

export const create_post = async (req: Request, res: Response) => {
  req.body._id = new ObjectId();
  if(req.body["avatar"]){
    const avatar = await Assets.create(req.body["avatar"]);
    req.body["avatar"] = avatar._id;
  }
  req.body.password = await bcrypt_hash(req.body.password);
  req.body.role_id = (req.body.role_id ? new ObjectId(req.body.role_id): null);
  req.body.token = await jwt_create({
      _id: req.body._id,
      email: req.body.email,
      username: req.body.username,
    }, {
      expiresIn: '1d',
      issuer: "ecommerce-app",
      audience: "manager",
      subject: "admin_account",
      algorithm: "HS256",
      noTimestamp: true,
      jwtid: req.body._id.toString(),
      header: {
        typ: "JWT",
        alg: "HS256",
      },
    })
  await Account.create(req.body);
  res.json({
    success: true,
  });
};
export const update = async (req: Request, res: Response) => {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false,
  }).populate("avatar role_id");
  account["birthday_new"] = (account.birthday ?  await format_date(account.birthday) : "")
  console.log(account["birthday_new"]);
  const roles = await Roles.find({
    deleted: false
  })
  
  res.render("admin/pages/accounts/update.pug", {
    account,
    roles
  });
}

export const update_patch = async (req: Request, res: Response) => {
  req.body.birthday = req.body.birthday ? parse_date(req.body.birthday) : null;
  req.body.role_id = req.body.role_id ? new ObjectId(req.body.role_id) : null;
  await Account.updateOne({
    _id: req.params.id
  }, req.body)
    res.cookie(
      "alert",
      JSON.stringify({
        icon: "success",
        title: "Cập nhật thành công!",
      })
    );
  res.json({
    success: true
  })
}


export const delete_patch = async (req: Request, res: Response) => {
  await Account.updateOne({
    _id: req.params.id
  }, {
    deleted: true
  })
  res.cookie('alert', JSON.stringify({
    icon: 'success',
    title: 'Xóa mềm thành công'
  }));
  res.json({
    success: true,
    message: "Xóa mềm thành công",
  });
};

export const trash = async (req: Request, res: Response) => {
  const accounts = await Account.find({
    deleted: true,
  }).populate({
    path: "role_id avatar",
  });
  res.render("admin/pages/accounts/trash.pug", {
    accounts,
  });
}

export const restore = async (req: Request, res: Response) => {
  await Account.updateOne(
    {
      _id: req.params.id,
    },
    {
      deleted: false,
    }
  );
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Khôi phục thành công",
    })
  );
  res.json({
    success: true,
    message: 'Khôi phục thành công!'
  })
}

export const hard_delete = async (req: Request, res: Response) => {
  await Account.deleteOne({
    _id: req.params.id,
  });
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Xóa vĩnh viên thành công!",
    })
  );
  res.json({
    success: true,
    message: "Xóa vĩnh viên thành công!",
  });
}