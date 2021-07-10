import { Schema, model } from "mongoose";

export const ROLES = ["admin","user","moderator"];

const roleSchema = Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
