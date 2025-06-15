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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_success = exports.add_order = void 0;
const mongodb_1 = require("mongodb");
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const add_order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.tokenUser;
    const data = yield (0, jwt_helpers_1.jwt_verify)(token);
    req.body.infor_user.user_id = data._id;
    const carts = yield carts_model_1.default.find({
        user_id: data._id,
    }).populate("product_id");
    req.body.infor_products = [];
    for (const it of carts) {
        req.body.infor_products.push({
            price: it.product_id["price"],
            discount: it.product_id["discount"],
            product_id: new mongodb_1.ObjectId(it.product_id["_id"]),
            quantity: it["quantity"],
        });
    }
    yield orders_model_1.default.create(req.body);
    yield carts_model_1.default.deleteMany({
        user_id: data._id,
    });
    res.json({
        success: true,
        message: "Thêm đơn hàng thành công",
    });
});
exports.add_order = add_order;
const order_success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_model_1.default.findOne({
        _id: req.params.id,
    })
        .populate({
        path: "infor_user.user_id",
        model: "User Account",
    })
        .populate({
        path: "infor_products.product_id",
        model: "Product",
        populate: {
            path: "images",
            model: "Asset",
        },
    })
        .exec();
    res.render("client/pages/orders/success.pug", {
        order
    });
});
exports.order_success = order_success;
