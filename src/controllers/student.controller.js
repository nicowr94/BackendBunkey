import Student from "../models/Student";
import Enrollment from "../models/Enrollment";
import Course from "../models/Course";

export const createStudent = async (req, res) => {
  const { name } = req.body;
  try {
    const newStudent = new Student({ name });
    const StudentSaved = await newStudent.save();
    res.status(201).json(StudentSaved);
  } catch (error) {
    return res.status(401).json({ message: "Incomplete data" });
  }
};

export const getStudents = async (req, res) => {
  const student = await Student.find();
  res.status(201).json(student);
};

export const getStudentByID = async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  res.status(200).json(student);
};

export const updateStudentByID = async (req, res) => {
  const updateStudent = await Student.findByIdAndUpdate(
    req.params.studentId,
    req.body,
    { new: true }
  );
  res.status(200).json(updateStudent);
};

export const deleteStudentByID = async (req, res) => {
  const deleteStudent = await Student.findByIdAndDelete(req.params.studentId);
  res.status(204).json(deleteStudent);
};

// Función para calcular los créditos totales del estudiante
export const countCredits = async (idStudent) => {
  const nuevoEnrolled = await Enrollment.aggregate([
    {
      $match: {
        students: {
          $elemMatch: { students: "60e7be2321d7ce613ca742ed" },
        },
      },
    },
    {
      $project: { userObjId: { $toObjectId: "$course" } },
    },
    {
      $lookup: {
        localField: "userObjId",
        from: "courses",
        foreignField: "_id",
        as: "arrayCourse",
      },
    },
  ]);

  const cursos = nuevoEnrolled.map((elemento) => {
    const elm = {
      course: elemento.arrayCourse[0].name,
      credit: elemento.arrayCourse[0].credit,
    };
    return elm;
  });

  let sumaCreditos = 0;
  cursos.forEach((e) => {
    sumaCreditos += e.credit;
  });
  return sumaCreditos;
};
