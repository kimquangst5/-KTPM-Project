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
exports.delete_cart = exports.get_cart = exports.add_to_cart = void 0;
const mongodb_1 = require("mongodb");
const jwt_helpers_1 = require("../../helpers/jwt.helpers");
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const add_to_cart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, user_id, quantity } = req.body;
    const check_exsit = yield carts_model_1.default.findOne({
        product_id: product_id,
        user_id: user_id,
    });
    if (check_exsit) {
        yield carts_model_1.default.updateOne({
            product_id: product_id,
            user_id: user_id,
        }, {
            quantity: check_exsit.quantity + quantity,
        });
    }
    else
        yield carts_model_1.default.create(req.body);
    res.json({
        success: true,
        message: "Thêm vào giỏ hàng thành công",
    });
});
exports.add_to_cart = add_to_cart;
const get_cart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.tokenUser;
    const data = yield (0, jwt_helpers_1.jwt_verify)(token);
    const carts = yield carts_model_1.default.find({ user_id: new mongodb_1.ObjectId(data._id) })
        .populate("user_id")
        .populate({
        path: "product_id",
        populate: [
            { path: "images", model: "Asset" },
            { path: "product_categories", model: "Product Category" },
        ],
    })
        .exec();
    res.render("client/pages/cart/list.pug", {
        carts,
    });
});
exports.get_cart = get_cart;
const delete_cart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield carts_model_1.default.deleteOne({
        _id: req.params.id
    });
    res.cookie('alert', JSON.stringify({
        icon: 'success',
        title: 'Xóa thành công!'
    }));
    const backURL = req.get("referer") || "/";
    res.redirect(backURL);
});
exports.delete_cart = delete_cart;
