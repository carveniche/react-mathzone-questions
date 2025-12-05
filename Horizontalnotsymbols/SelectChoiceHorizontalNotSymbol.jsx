import React, { useContext, useEffect, useState } from 'react';
import { useRef } from "react";
import HtmlParser from 'react-html-parser';
import HtmlParserComponent from '../../CommonJSFiles/HtmlParserComponent';
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import CompareTwoValue from '../compareTwoValue';
import styles from "../OnlineQuiz.module.css";
import SelectChoiceCommon from '../CommonFiles/SelectChoiceCommon';
function SelectChoiceHorizontalNotSymbol({
  choices,
  correctAnswer,
  setanswerHasSelected,
  isAnswerSelected,
  setIsAnswerCorrect,
  valueRef,
  studentAnswer
}) {
  const { hasAnswerSubmitted, isStudentAnswerResponse, setCurrectAnswer, setStudentAnswerChoice } =
      useContext(ValidationContext);
    let [choiceState, setChoicesState] = useState([]);
    const prevRef = useRef(0)
  
    const handleChoiceSelection = (i) => {
      if (hasAnswerSubmitted  || isStudentAnswerResponse) return;
      if (!isAnswerSelected) {
  
        choiceState[prevRef.current].show = false;
        choiceState[i].show = true;
        prevRef.current = i;
        setChoicesState([...choiceState]);
        setStudentAnswerChoice(choiceState[i]?.value);
        valueRef.current = choiceState[i]?.value;
        if (String(choiceState[i]?.value).trim() === String(correctAnswer).trim()) {
          setIsAnswerCorrect(true);
        } else {
          setIsAnswerCorrect(false);
        }
        setanswerHasSelected(true);
      }
    };
  
  
  
  
    useEffect(() => {
     
      setCurrectAnswer(correctAnswer)  
      let arr = [];
      choices?.map((item) => {
        let obj = { value: item, show:  false };
        arr.push({ ...obj });
      });
      setChoicesState([...arr]);
  
    }, []);
  
    return (
      <>
  
  
        <SelectChoiceCommon
          type={"htmlparse"}
          choices={choiceState}
          studentAnswer={studentAnswer}
          handleChoiceSelection={handleChoiceSelection}
        />
  
  
      </>
    );
  }
  export default SelectChoiceHorizontalNotSymbol;
  