import Courses from "../models/Course";

export const checkDuplicateCourseName = async (req, res, next) => {
  const course = await Courses.findOne({ name: req.body.name });
  if (course)
    return res.status(400).json({ message: "The Course already exists" });
  next();
};
