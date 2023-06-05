import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
export default function SelectCountOnTensframe({ choices, inputRef,studentAnswer }) {
  let [choicesState, setChoicesState] = useState([]);
  const prev = useRef(0);
  const { hasAnswerSubmitted,isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;

    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  inputRef.current = choicesState;
  return (
    <div>
      <div className={styles.CountOnTensframeSelectFlexBox}>
        {choicesState?.map((value, i) => (
          <div
            className={`${(isStudentAnswerResponse&&String(studentAnswer)?.trim()===String(value?.value)?.trim())?styles.selectedChoiceType:
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            key={i}
            onClick={() => handleChoiceSelection(i)}
          >
            <div className="mathzone-circle-selectbox">
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>

            <div key={i}>{HtmlParser(value.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


