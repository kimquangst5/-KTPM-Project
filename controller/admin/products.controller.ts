import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import Product_Categories from "../../models/product_categories.model";
import create_tree_helper from "../../helpers/create_tree.helper";
import Product from "../../models/products.model";

export const index = async (req: Request, res: Response) => {
  const products = await Product.find({
    deleted: false,
  })
    .populate({
      path: "product_categories images.assets_id",
    })
    .sort({ createdAt: -1 });
  res.render("admin/pages/products/index.pug", {
    products,
  });
};

export const create = async (req: Request, res: Response) => {
  const product_categories = await Product_Categories.find({
    deleted: false,
  });
  const tree_categories = create_tree_helper(product_categories);
  res.render("admin/pages/products/create.pug", {
    product_categories,
    tree_categories,
  });
};

export const create_post = async (req: Request, res: Response) => {
  req.body.product_categories = (req.body.product_categories as string)
    ? req.body.product_categories
    : null;
  req.body.price = (req.body.price as string) ? parseInt(req.body.price) : 0;
  req.body.discount = (req.body.discount as string) ? parseInt(req.body.discount) : 0;
  for (const it of req.body.images) {
    const result = await Assets.create(it);
    it._id = new ObjectId(result._id);
  }
  req.body.images = req.body.images.map((it: any, index: number) => {
    return {
      assets_id: new ObjectId(it._id),
      position: index + 1,
    };
  });
  await Product.create(req.body);
  res.cookie(
    "alert",
    JSON.stringify({
      icon: 'success',
      title: "Thêm sản phẩm thành công!",
    })
  );
  
  res.json({
    success: true,
    message: 'Thêm sản phẩm thành công!'
  });
};

export const edit = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate({
    path: "product_categories images.assets_id",
  });
  if (!product) return res.redirect("/admin/products/index");
  const product_categories = await Product_Categories.find({
    deleted: false,
  });
  const tree_categories = create_tree_helper(product_categories);
  res.render("admin/pages/products/edit.pug", {
    product,
    product_categories,
    tree_categories,
  });
};

export const edit_patch = async (req: Request, res: Response) => {
  req.body.product_categories = (req.body.product_categories ? req.body.product_categories : null)
  let index = 0;
  let array_data = []
  if (
    req.body.array_data_image &&
    JSON.parse(req.body.array_data_image).length > 0
  ) {
    for (const it of JSON.parse(req.body.array_data_image)) {
      if (it.new == true) {
        const new_result = await Assets.create(req.body.images[index]);
        it["assets_id"] = new_result._id;
        index++;
      }
      array_data.push(it);
    }
    req.body.images = array_data;
  } else {
    delete req.body.images;
  }
    
  
  await Product.updateOne({
    _id: req.params.id
  }, req.body);
  
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Cập nhật thành công!",
    })
  );
  res.json({
    success: true,
    message: 'Cập nhật thành công!'
  })
};


export const delete_soft = async (req: Request, res: Response) => {
  await Product.updateOne({
    _id: req.params.id
  }, {
    deleted: true
  });
  res.cookie(
    "alert",
    JSON.stringify({
      icon: "success",
      title: "Xóa (mềm) sản phẩm thành công!",
    })
  );
  res.json({
    success: true,
    message: "Xóa (mềm) sản phẩm thành công!"
  })
};