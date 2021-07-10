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
    $project: {
      course: "$courseName.name",
      id_user: { $toObjectId: "$listStudents.students" },
      creditsTotal: "$courseName.credit",
    },
  },

  {
    $lookup: {
      localField: "id_user",

      from: "students",

      foreignField: "_id",

      as: "studentObj",
    },
  },

  {
    $unwind: "$studentObj",
  },

  {
    $unwind: "$creditsTotal",
  },

  {
    $project: {
      course: "$course",
      creditsTotal: "$creditsTotal",
      nameStudent: "$studentObj.name",
    },
  },

  { $group: { _id: "$nameStudent", total: { $sum: "$creditsTotal" } } },

  { $match: { total: { $gt: 50 } } },
]);
