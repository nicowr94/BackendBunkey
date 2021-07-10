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
      idCourse: "$courseName._id",
      nameCourse: "$courseName.name",
      idUser: { $toObjectId: "$listStudents.students" },
      credits: "$courseName.credit",
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
      idCourse: "$idCourse",
      nameCourse: "$nameCourse",
      creditCourse: "$creditCourse",
      nameStudent: "$studentObj.name",
      credits: "$credits",
    },
  },

  {
    $group: {
      _id: "$idCourse",
      course: { $addToSet: { name: "$nameCourse" } },
      studients: { $push: { name: "$nameStudent", credits: "$credits" } },
    },
  },

  {
    $unwind: "$course",
  },

  {
    $project: { _id: "$_id", name: "$course.name", studients: "$studients" },
  },
]);
