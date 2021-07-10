db.getCollection("enrollments").aggregate([
  {
    $project: {
      courseObjId: { $toObjectId: "$course" },
      listStudents: "$students",
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
    $unwind: "$listStudents",
  },

  {
    $unwind: "$listStudents.credits",
  },

  {
    $unwind: "$courseName",
  },

  {
    $project: {
      course: "$courseName.name",
      idUser: { $toObjectId: "$listStudents.students" },
      creditCourse: "$courseName.credit",
    },
  },

  {
    $lookup: {
      localField: "idUser",

      from: "students",

      foreignField: "_id",

      as: "studentObj",
    },
  },

  {
    $unwind: "$studentObj",
  },

  {
    $project: {
      course: "$course",
      creditCourse: "$creditCourse",
      nameStudent: "$studentObj.name",
    },
  },
]);
