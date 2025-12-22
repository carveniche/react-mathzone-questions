import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import SelectChoiceCommon from "../CommonFiles/SelectChoiceCommon";

function SelectChoiceOptionMultiplePicture({
  choices,
  setIsAnswerCorrect,
  setanswerHasSelected,
  isAnswerSelected,
  totalRows,
  totalColumns,
  inputRef,
  studentAnswer,
  hasAnswerSubmitted
}) {
  const [flag, setFlag] = useState();
  const { isStudentAnswerResponse, setStudentAnswerChoice, setCurrectAnswer } = useContext(ValidationContext);
  let prevRef = useRef(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {

    let flag = false;
    let rows = [];
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
          setCurrectAnswer(item.value);
        }
      });
    }

    setRows([...rows]);
  }, [choices[0]?.[0]?.value]);
  // }, []);

  const handleChoiceSelection = (i) => {
    if (isAnswerSelected || isStudentAnswerResponse) return;
    rows[prevRef.current].show = false;
    rows[i].show = true;
    prevRef.current = i;
    setStudentAnswerChoice(rows[i]?.value)
    setRows([...rows]);
  };
  inputRef.current = rows;

  return (
    <>
     
        <SelectChoiceCommon
          type={"htmlparse"}
          choices={rows}
          studentAnswer={studentAnswer}
          handleChoiceSelection={handleChoiceSelection}
        />

    </>
  );
}
export default SelectChoiceOptionMultiplePicture;


