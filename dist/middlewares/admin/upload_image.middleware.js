"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_multi = exports.upload_single = void 0;
const stream_upload_helper_1 = require("../../helpers/stream_upload.helper");
const upload_single = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    function upload(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield (0, stream_upload_helper_1.stream_upload_helper)(buffer);
            req.body.avatar = result;
            next();
        });
    }
    if (req["file"] && req["file"].buffer)
        upload(req["file"].buffer);
    else {
        req.body.avatar = null;
        next();
    }
});
exports.upload_single = upload_single;
const upload_multi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.images = [];
    if (req["files"] && req["files"].length > 0) {
        for (let file of req["files"]) {
            if (file.buffer) {
                let result = yield (0, stream_upload_helper_1.stream_upload_helper)(file.buffer);
                req.body.images.push(result);
            }
        }
        next();
    }
    else {
        next();
    }
});
exports.upload_multi = upload_multi;
