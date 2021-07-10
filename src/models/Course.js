import strictTransportSecurity from "helmet/dist/middlewares/strict-transport-security";
import { Schema, model } from "mongoose";

const courseSchema = Schema(
  {
    name: { type: String, unique: true, required: true },
    credit: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Course", courseSchema);
