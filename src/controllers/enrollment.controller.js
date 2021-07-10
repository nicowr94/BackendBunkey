import Enrollment from "../models/Enrollment";
import Course from "../models/Course";
import Student from "../models/Student";
import { countCredits } from "../controllers/student.controller";

export const createEnrollment = async (req, res) => {
  const { nameCourse, nameStudent } = req.body;

  try {
    const course = await Course.findOne({ name: nameCourse });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = await Student.findOne({ name: nameStudent });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const creditTotal = await countCredits(student._id);
    console.log("creditTotal " + creditTotal);

    console.log(course);
    const newEnrollment = new Enrollment({
      course: course._id,
      students: [
        {
          students: student._id,
          credits: [creditTotal],
        },
      ],
    });

    const enrollmentSaved = await newEnrollment.save();
    res.status(201).json(enrollmentSaved);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Incomplete data" });
  }
};

export const getEnrollments = async (req, res) => {
  const enrollment = await Enrollment.find();
  res.status(201).json(enrollment);
};

export const getEnrollmentByID = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.enrollmentId);
  res.status(200).json(enrollment);
};

export const updateEnrollmentByID = async (req, res) => {
  const updateEnrollment = await Enrollment.findByIdAndUpdate(
    req.params.enrollmentId,
    req.body,
    { new: true }
  );
  res.status(200).json(updateEnrollment);
};

export const deleteEnrollmentByID = async (req, res) => {
  const deleteEnrollment = await Enrollment.findByIdAndDelete(
    req.params.enrollmentId
  );
  res.status(204).json(deleteEnrollment);
};
