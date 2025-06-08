import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import '../configs/cloudinary.config'

export const stream_upload_helper = (buffer: Buffer) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "Kim_Quang",
          unique_filename: true,
          format: "webp",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });
  };