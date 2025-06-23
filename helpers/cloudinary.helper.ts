import { v2 as cloudinary } from "cloudinary";
import "../configs/cloudinary.config";
import Product from "../models/products.model";

type Resource = {
  public_id: string;
  secure_url: string;
  [key: string]: any;
};

export const cloudinary_delete_one = async (public_id: string) => {
  return cloudinary.uploader.destroy(public_id, { resource_type: "image" });
};

export const cloudinary_delete_many = async (array_public_id: any) => {
  return cloudinary.api.delete_resources(array_public_id, {
    resource_type: "image",
  });
};

// export const cloudinary_get_all_assets = async (
//   folderPath: string
// ): Promise<Resource[]> => {
//   let resources: Resource[] = [];
//   let nextCursor: string | undefined;
//   do {
//     const result = await cloudinary.api.resources({
//       type: "upload",
//       // prefix: `${folderPath}/`,
//       max_results: 500,
//       next_cursor: nextCursor,
//     });
//     resources = resources.concat(result.resources);
//     nextCursor = result.next_cursor;
//   } while (nextCursor);
//   return resources;
// };

export const cloudinary_get_all_assets = async (
  folderPath: string
): Promise<
  (Resource & {
    usedByProducts: {
      _id: string;
      name: string;
    }[];
  })[]
> => {
  let resources: Resource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      // prefix: `${folderPath}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources = resources.concat(result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  // Lấy toàn bộ asset_id từ resources
  const publicIds = resources.map((r) => r.public_id);

  // Tìm tất cả sản phẩm có chứa assets_id tương ứng
  const products = await Product.find({
    "images.assets_id": { $ne: null },
  })
    .populate("images.assets_id")
    .select("name images")
    .lean();

  // Tạo mapping asset_id -> sản phẩm dùng nó
  const assetUsageMap: Record<string, { _id: string; name: string }[]> = {};

  for (const product of products) {
    for (const image of product.images || []) {
      if (!image["assets_id"]) continue;
      const assetIdStr = image["assets_id"]["asset_id"].toString();
      if (!assetUsageMap[assetIdStr]) {
        assetUsageMap[assetIdStr] = [];
      }
      const data = {
        _id: product._id.toString(),
        name: product.name,
      };

      assetUsageMap[assetIdStr].push(data);
    }
  }

  // Gắn thông tin product vào từng asset
  const enriched = resources.map((asset) => {
    return {
      ...asset,
      usedByProducts: assetUsageMap[asset.asset_id] || [],
    };
  });
  // console.log(enriched);
  
  return enriched;
};

export const cloudinary_rename_image = async (
  oldPublicId: string,
  newPublicId: string
): Promise<any> => {
  try {
    return cloudinary.uploader.rename(oldPublicId, newPublicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.log("lỗi");
    console.log(error);
    
    return null;
  }
};

export const cloudinary_get_image_details = async (
  public_id: string
): Promise<Resource> => {
  const result = await cloudinary.api.resource(public_id, {
    resource_type: "image",
  });
  return result as Resource;
};

export const cloudinary_exists_asset = async (
  public_id: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<boolean> => {
  try {
    // Gọi lên Cloudinary, nếu không throw sẽ về true
    const exists = await cloudinary.api.resource(public_id, {
      resource_type: resourceType,
    });
    return exists;
  } catch (error: any) {
    return null;
  }
};
