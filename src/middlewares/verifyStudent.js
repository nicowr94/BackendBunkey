
import Students from "../models/Student";

export const checkDuplicateStudentName = async (req, res, next) => {
  const students = await Students.findOne({ name: req.body.name });
  if (students) return res.status(400).json({ message: "The Student already exists" });

  next();
};

