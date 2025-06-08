import { NextFunction, Request, Response } from "express";
import { stream_upload_helper } from "../../helpers/stream_upload.helper";

export const upload_single = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  async function upload(buffer: Buffer) {
    let result = await stream_upload_helper(buffer);
    req.body.avatar = result;
    next();
  }
  if (req["file"] && req["file"].buffer) upload(req["file"].buffer);
  else {
    req.body.avatar = null;
    next();
  }
};

export const upload_multi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.images = [];
  if( req["files"] && req["files"].length > 0) {
    for (let file of req["files"]) {
      if (file.buffer) {
        let result = await stream_upload_helper(file.buffer);
        req.body.images.push(result);
      }
    }
    next()
  }
  else{
    next();
  }
};
