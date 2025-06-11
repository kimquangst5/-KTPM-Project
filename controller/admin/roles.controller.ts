import { Request, Response } from "express";
import Roles from "../../models/roles.model";


export const index = async (req: Request, res: Response) => {
  const roles = await Roles.find({
    deleted: false,
  });
  res.render("admin/pages/roles/index.pug", {
    roles,
  });
};

export const create = async (req: Request, res: Response) => {
  
  
  res.render("admin/pages/roles/create.pug", {});
};

export const create_post = async (req: Request, res: Response) => {
    await Roles.create(req.body)

    res.json({
        success: true
    })
    
}

export const update = async (req: Request, res: Response) => {
  const role = await Roles.findOne({
    _id: req.params.id
  })
  res.render("admin/pages/roles/update.pug", {
    role,
  });
}

export const update_patch = async (req: Request, res: Response) => {
  await Roles.updateOne({
    _id: req.params.id
  }, req.body)
  res.cookie('alert', JSON.stringify({
    icon: 'success',
    title: 'Cập nhật thành công!'
  }))
  res.json({
    success: true,
    message: 'Cập nhật thành công'
  })
  
}

export const delete_patch = async (req: Request, res: Response) => {
  await Roles.updateOne({
    _id: req.params.id
  }, {
    deleted: true
  })
  res.cookie('alert', JSON.stringify({
    icon: 'success',
    title: 'Xóa mềm thành công'
  }));
  const backURL = req.get("referer") || "/admin/roles";
  res.redirect(backURL);
};

export const trash = async (req: Request, res: Response) => {
  const roles = await Roles.find({
    deleted: true,
  });
  res.render("admin/pages/roles/trash.pug", {
    roles,
  });
}

export const restore = async (req: Request, res: Response) => {
  await Roles.updateOne(
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
  await Roles.deleteOne({
    _id: req.params.id
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