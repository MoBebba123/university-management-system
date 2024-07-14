import React, { useState } from 'react';
import {
  
    IoIosArrowForward,
    IoIosArrowDown,
  } from "react-icons/io";
const ExamItem = ({ exam }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <li key={exam.id} >
        {exam.children.length > 0 && (
        <button type="button" onClick={handleToggle}>
          {show ?  <IoIosArrowDown />:<IoIosArrowForward style={{}} /> }
        </button>
      )}
      {exam.title}
      

      {show && exam.children.length > 0 && (
        <ul>{exam.children.map((child) => <ExamItem key={child.id} exam={child} />)}</ul>
      )}
    </li>
  );
};

const ExamTree = ({ exams }) => {
  return <ul>{exams.map((exam) => <ExamItem key={exam.id} exam={exam} />)}</ul>;
};

export default ExamTree;
