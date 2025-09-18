import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import styles from "../OnlineQuiz.module.css";
import { SelectChoiceCommonOld } from "../../CommonJsxComponent/SelectChoiceCommon";
export default function SelectMultipleChoice({
  choices,
  inputRef,
  answerHasSelected,
  submitted,
  choiceId,

}) {
 
  let [choicesState, setChoicesState] = useState([]);
  const { hasAnswerSubmitted, isStudentAnswerResponse, setCurrectAnswer, setStudentAnswerChoice } =
         useContext(ValidationContext);

  let prev = useRef(0);

  useEffect(() => {
    let arr = [];
    choices?.map((item,index) => {
      if(item.correct==="true" || item.correct===true){ 
        setCurrectAnswer(item.choice_id)
      }

      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);

  const handleChoiceSelection = (i) => {
    if (answerHasSelected || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    setStudentAnswerChoice(choicesState[i]?.choice_id);
    prev.current = i;
  };
  inputRef.current = choicesState;
  
  return (
    <>

       <SelectChoiceCommonOld
              type={"htmlparse"}
              choices={choicesState}
              choiceId={choiceId}
              handleChoiceSelection={handleChoiceSelection}
            />

   
    </>
  );
}
