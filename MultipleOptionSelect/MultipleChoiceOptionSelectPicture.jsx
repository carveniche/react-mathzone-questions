import React, { useContext, useEffect, useState } from 'react'
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import { useRef } from 'react';
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import MultiSelectChoiceCommon from '../CommonFiles/MultiSelectChoiceCommon';

function MultipleChoiceOptionSelectPicture(
  { choices,
    setIsAnswerCorrect,
    setanswerHasSelected,
    isAnswerSelected,
    totalRows,
    totalColumns,
    inputRef,
    studentAnswer }
) {
  
  const [flag, setFlag] = useState();

  const { isStudentAnswerResponse, setCurrectAnswer, setStudentAnswerChoice } = useContext(ValidationContext);
  let prevRef = useRef(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let flag = false;
    let rows = [];
    let temVal = [];

    for (let i = 0; i < Number(totalRows); i++) {
      choices[i]?.map((item, j) => {
        item.row == i + 1 &&
          item.col == j + 1 &&
          rows.push({ ...item, show: false });
        let text = String(item?.value);
        if (text.includes("img") && text.includes("src")) {
          flag = true;
        }
        if (item.selected === "true" || item.selected === true) {
          temVal.push(item.value)
          setCurrectAnswer(temVal);
        }

      });

    }

    setFlag(flag);
    setRows([...rows]);
  }, []);

  const selectOptionHandler = (i) => {
    if (isAnswerSelected || isStudentAnswerResponse) return;
    // rows[prevRef.current].show = false;
    // rows[i].show = true;

    // Toggle the show property
    rows[i].show = !rows[i].show;
    prevRef.current = i;
    setRows([...rows]);
    const selectedValues = rows.filter((item) => item.show).map((item) => item.value);
    setStudentAnswerChoice(selectedValues)
  };


  inputRef.current = rows;
  return (
    <MultiSelectChoiceCommon
      choices={rows}
      studentAnswer={studentAnswer}
      handleChoiceSelection={selectOptionHandler}
    />
  );
}

export default MultipleChoiceOptionSelectPicture;