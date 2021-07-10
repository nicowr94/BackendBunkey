import { Schema, model } from "mongoose";

const enrollmentSchema = Schema(
  {
    course: { type: String, required: true },
    students: [
      {
        students: { type: String, required: true },
        credits: [{ type: Number }],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Enrollment", enrollmentSchema);
