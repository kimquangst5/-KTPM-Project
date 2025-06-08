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