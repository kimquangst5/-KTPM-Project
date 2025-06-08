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
exports.jwt_verify = exports.jwt_create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_create = (payload_1, ...args_1) => __awaiter(void 0, [payload_1, ...args_1], void 0, function* (payload, options = {}) { return yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options); });
exports.jwt_create = jwt_create;
const jwt_verify = (token_1, ...args_1) => __awaiter(void 0, [token_1, ...args_1], void 0, function* (token, options = {}) {
    try {
        return yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, options);
    }
    catch (error) {
        return null;
        throw new Error("Invalid token");
    }
});
exports.jwt_verify = jwt_verify;
