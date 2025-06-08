import mongoose, { model, Schema } from "mongoose";

const role_schema = new Schema({
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

const Roles = model("Role", role_schema);

export default Roles;