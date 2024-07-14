import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { cancelExam, registerForExam } from "../redux/anmeldeList/actions";
import { useDispatch, useSelector } from "react-redux";
import { getNotenspiegel } from "../redux/notenspiegel/actions";

const ExamItem = ({ exam, anmeldeliste }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { notenspiegel } = useSelector((state) => state.notenspiegel);
  const { examList } = useSelector((state) => state.exam);
  const handleToggle = () => {
    setShow((prev) => !prev);
  };
  useEffect(() => {
    dispatch(getNotenspiegel());
  }, [dispatch]);

  const handleExamRegisteration = (e, exam, initdata) => {
    e.preventDefault();
    const myForm = new FormData();
    const myForm2 = new FormData();

    myForm.set("desiredExam", JSON.stringify(exam));
    myForm.set("initialdata", JSON.stringify(initdata));
    myForm2.set("desiredExam", JSON.stringify(exam));
    if (window.confirm(`are you sure you want to register for ${exam.title}`)) {
      dispatch(registerForExam(myForm, myForm2, notenspiegel?.length || 0));
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
          <div>
            <span>{`Datum: ${
              exam.datum
                ? new Date(exam.datum).toISOString().split("T")[0]
                : " -"
            },  Prüfer: ${exam.pruefer_lastname}, ${
              exam.pruefer_firstname
            }, Semester: ${exam.semester}`}</span>

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
          </div>
        )}
      </div>
    </li>
  );
};

const ExamTree = ({ exams, anmeldeliste, filteredExams }) => {
  console.log(exams);
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
