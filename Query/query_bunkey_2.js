db.getCollection("enrollments").aggregate([
  {
    $project: {
      item: 1,

      numberStudents: {
        $cond: {
          if: { $isArray: "$students" },
          then: { $size: "$students" },
          else: "NA",
        },
      },

      courseObjId: { $toObjectId: "$course" },
    },
  },

  {
    $lookup: {
      localField: "courseObjId",

      from: "courses",

      foreignField: "_id",

      as: "courseName",
    },
  },

  {
    $unwind: "$courseName",
  },

  {
    $project: { course: "$courseName.name", numberStudents: "$numberStudents" },
  },

  { $sort: { numberStudents: -1 } },

  { $limit: 3 }, // los 3 cursos con m�s alumnos inscritos
]);
