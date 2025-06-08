"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const role_schema = new mongoose_1.Schema({
    name: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    autoCreate: true
});
const Roles = (0, mongoose_1.model)("Role", role_schema);
exports.default = Roles;
