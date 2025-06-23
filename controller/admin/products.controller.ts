import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Roles from "../../models/roles.model";
import Account from "../../models/admin_accounts.model";
import Assets from "../../models/assets.model";
import { bcrypt_hash } from "../../helpers/bcrypt.helper";
import Product_Categories from "../../models/product_categories.model";
import create_tree_helper from "../../helpers/create_tree.helper";
import Product from "../../models/products.model";
import { cloudinary_delete_many } from "../../helpers/cloudinary.helper";

export const index = async (req: Request, res: Response) => {
  const products = await Product.find({
    deleted: false,
  })
    .populate({
      path: "product_categories images.assets_id created_by",
    })
    .sort({ createdAt: -1 });
  res.render("admin/pages/products/index.pug", {
    products,
  });
};

export const create = async (req: Request, res: Response) => {
  const product_categories = await Product_Categories.find({
    deleted: false,
  })
  
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
  req.body.created_by = res.locals.INFOR_ADMIN._id
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
    path: "product_categories images.assets_id created_by updated_by",
  })
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
  req.body.updated_by = res.locals.INFOR_ADMIN._id;
  req.body.featured = JSON.parse(req.body.featured);
  console.log(req.body.featured);
  
  req.body.product_categories = req.body.product_categories
    ? req.body.product_categories
    : null;
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
    deleted_by: res.locals.INFOR_ADMIN._id,
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



export const trash = async (req: Request, res: Response) => {
  const products = await Product.find({
    deleted: true,
  })
    .populate({
      path: "product_categories images.assets_id deleted_by",
    })
    .sort({ updatedAt: -1 });
  res.render("admin/pages/products/trash.pug", {
    products,
  });
}

export const restore = async (req: Request, res: Response) => {
  await Product.updateOne(
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
  const product = await Product.findOne({
    _id: req.params.id,
  }).populate("images.assets_id");
  if (product.images.length > 0){
    const array_public_id = product.images.map(
      (it) => it.assets_id["public_id"]
    );
    console.log(array_public_id);
    await cloudinary_delete_many(array_public_id);
    
  }
    await Product.deleteOne({
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