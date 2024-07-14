import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { cancelExam, registerForExam } from "../redux/anmeldeList/actions";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../redux/exams/actions";

const ExamItem = ({ exam, anmeldeliste }) => {
  const [show, setShow] = useState(false);
  const { examList } = useSelector((state) => state.exam);

  const dispatch = useDispatch();
  const handleToggle = () => {
    setShow((prev) => !prev);
  };
  const handleExamRegisteration = (e, exam, initdata) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("desiredExam", JSON.stringify(exam));
    myForm.set("initialdata", JSON.stringify(initdata));
    if (window.confirm(`are you sure you want to register for ${exam.title}`)) {
      dispatch(registerForExam(myForm));
    }
  };
  const handleExamCancel = (e, pruefungsId, title) => {
    e.preventDefault();

    if (window.confirm(`are you sure you want to cancel for ${title}`)) {
      dispatch(cancelExam(pruefungsId));
    }
  };
  const isExamRegistered =
    anmeldeliste && anmeldeliste.some((item) => item.pruefungsId === exam.id);

  function removeEmptyChildren(exams) {
    return exams.reduce((acc, exam) => {
      if (exam.children && exam.children.length > 0) {
        // Recursively remove empty children
        const updatedExam = {
          ...exam,
          children: removeEmptyChildren(exam.children),
        };
        acc.push(updatedExam);
      }
      return acc;
    }, []);
  }

  // Example usage
  const filteredExams = removeEmptyChildren(examList);
  return (
    <li key={exam.id}>
      <div>
        {exam.children.length > 0 && (
          <button
            type="button"
            style={{
              border: "none",
              margin: "10px",
            }}
            onClick={handleToggle}
          >
            {show ? (
              <IoIosArrowDown style={{ backgroundColor: "transparent" }} />
            ) : (
              <IoIosArrowForward style={{}} />
            )}
          </button>
        )}
        <span>{exam.title}</span>
        {show && exam.children.length > 0 && (
          <ul>
            {exam.children.map((child) => (
              <ExamItem
                key={child.id}
                exam={child}
                anmeldeliste={anmeldeliste}
              />
            ))}
          </ul>
        )}
        {exam.children.length === 0 && (
          <span
            style={{
              margin: "20px",
              cursor: "pointer",
              color: isExamRegistered ? "red" : "green",
            }}
            onClick={(e) => {
              if (isExamRegistered) {
                handleExamCancel(e, exam.id, exam.title);
              } else {
                handleExamRegisteration(e, exam, filteredExams);
              }
            }}
          >
            {isExamRegistered ? "abmelden" : "anmelden"}
          </span>
        )}
      </div>
    </li>
  );
};

const ExamTree = ({ exams, anmeldeliste, filteredExams }) => {
  return (
    <ul>
      {exams.map((exam) => (
        <ExamItem
          key={exam.id}
          exam={exam}
          anmeldeliste={anmeldeliste}
          filteredExams={filteredExams}
        />
      ))}
    </ul>
  );
};

export default ExamTree;
