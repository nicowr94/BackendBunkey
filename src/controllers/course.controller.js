import Course from "../models/Course";

export const createCourse = async (req, res) => {
  const { name, credit } = req.body;

  try {
    const newCourse = new Course({ name, credit });
    const courseSaved = await newCourse.save();
    res.status(201).json(courseSaved);
  } catch (error) {
    return res.status(401).json({ message: "Incomplete data" });
  }
};

export const getCourses = async (req, res) => {
  const course = await Course.find();
  res.status(201).json(course);
};

export const getCourseByID = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.status(200).json(course);
};

export const updateCourseByID = async (req, res) => {
  const updateCourse = await Course.findByIdAndUpdate(
    req.params.courseId,
    req.body,
    { new: true }
  );
  res.status(200).json(updateCourse);
};

export const deleteCourseByID = async (req, res) => {
  const deleteCourse = await Course.findByIdAndDelete(req.params.courseId);
  res.status(204).json(deleteCourse);
};
