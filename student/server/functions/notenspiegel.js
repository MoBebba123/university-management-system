// recursive Function to create a nested  structure

export function createNotenspiegel(exams, parentId) {
    const examList = [];
    let exam;
    if (parentId == null) {
      exam = exams.filter((ex) => ex.parentId == undefined);
    } else {
      exam = exams.filter((ex) => ex.parentId == parentId);
    }
  
    for (let ex of exam) {
      examList.push({
        ...ex,
        children: createNotenspiegel(exams, ex.id),
      });
    }
  
    return examList;
  }
  