"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const status_const_1 = require("../constants/status.const");
const role_schema = new mongoose_1.Schema({
    fullname: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    token: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        default: status_const_1.accounts_const.ACTIVE,
    },
    avatar: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Asset",
        default: null
    },
    role_id: {
        type: mongoose_1.default.Schema.Types.Mixed,
        ref: "Role",
    },
}, {
    timestamps: true,
    autoCreate: true,
});
const Account = (0, mongoose_1.model)("Admin Account", role_schema);
exports.default = Account;
