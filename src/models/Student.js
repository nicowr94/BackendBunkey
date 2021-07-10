import { Schema, model } from "mongoose";

const studentSchema = Schema(
  {
    name: { type: String, unique: true,required:true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default model("Student", studentSchema);
