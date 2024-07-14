export const createNestedExamsWithNotenspiegel = (exams, noten) => {
  const examsNotenMap = new Map();
};
export const setParents = (exams) => {
  const examList = [];
  for (const exam of exams) {
    examList.push({
      ...exam,
      parentId: exam.semester === null ? null : exam.parentId,
    });
  }
  return examList;
};

export const createExams = (exams, parentId) => {
  const examList = [];
  let myExams;
  if (parentId == null) {
    myExams = exams.filter((ex) => ex.parentId == undefined);
  } else {
    myExams = exams.filter((ex) => ex.parentId == parentId);
  }

  for (let exam of myExams) {
    examList.push({
      ...exam,
      children: createExams(exams, exam.id),
    });
  }

  return examList;
};
