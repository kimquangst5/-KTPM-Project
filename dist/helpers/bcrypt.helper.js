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
exports.bcrypt_compare = exports.bcrypt_hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const bcrypt_hash = (plain_text_password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(SALT_ROUNDS);
    return yield bcrypt_1.default.hash(plain_text_password, salt);
});
exports.bcrypt_hash = bcrypt_hash;
const bcrypt_compare = (plain_text_password, hashed_password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plain_text_password, hashed_password);
});
exports.bcrypt_compare = bcrypt_compare;
