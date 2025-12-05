import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import SelectChoiceCommon from "../CommonFiles/SelectChoiceCommon";
export default function SelectCountOnTensframe({ choices, inputRef,studentAnswer,correctAnswer }) {
  let [choicesState, setChoicesState] = useState([]);
  const prev = useRef(0);
  const { hasAnswerSubmitted,isStudentAnswerResponse ,setStudentAnswerChoice,setCurrectAnswer} = useContext(ValidationContext);
  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;

    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
    setStudentAnswerChoice(choicesState[i]?.value);
  };

  useEffect(() => {
     setCurrectAnswer(correctAnswer);
    let arr = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  console.log("----------------")
  inputRef.current = choicesState;
  return (
    <>
         <SelectChoiceCommon
                type={"htmlparse"}
                choices={choicesState}
                studentAnswer={studentAnswer}
                handleChoiceSelection={handleChoiceSelection}
              />
        
    </>
  );
}


