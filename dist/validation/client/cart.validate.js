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
exports.add_to_cart = void 0;
const add_to_cart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    const data_error = {
        success: false,
        icon: "error",
        message: [],
    };
    if (!quantity)
        data_error.message.push("Chưa nhập số lượng!");
    if (parseInt(quantity) <= 0)
        data_error.message.push("Số lượng sản phẩm cần >= 0!");
    if (data_error.message.length > 0) {
        res.json(data_error);
        return;
    }
    next();
});
exports.add_to_cart = add_to_cart;
