import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import HtmlParserComponent from "../CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "./OnlineQuiz.module.css";
import SelectChoiceCommon from "./CommonFiles/SelectChoiceCommon";
let prevSelectionAnswerSelection = -1;
function OnlineQuizSelectChoiceOption({
  choices,
  correctAnswer,
  setIsAnswerCorrect,
  setanswerHasSelected,
  isAnswerSelected,
  teacher,
  answerRef,
  studentAnswer,
}) {
  const { hasAnswerSubmitted, isStudentAnswerResponse, setCurrectAnswer, setStudentAnswerChoice } =
    useContext(ValidationContext);
  let [choiceState, setChoicesState] = useState([]);
  const prevRef = useRef(0)

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || teacher || isStudentAnswerResponse) return;
    if (!isAnswerSelected) {

      choiceState[prevRef.current].show = false;
      choiceState[i].show = true;
      prevRef.current = i;
      setChoicesState([...choiceState]);
      setStudentAnswerChoice(choiceState[i]?.value);
      answerRef.current = choiceState[i]?.value;
      if (String(choiceState[i]?.value).trim() === String(correctAnswer).trim()) {
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
      }
      setanswerHasSelected(true);
    }
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

  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
    >


      <SelectChoiceCommon
        type={"htmlparse"}
        choices={choiceState}
        studentAnswer={studentAnswer}
        handleChoiceSelection={handleChoiceSelection}
      />


    </div>
  );
}
export default OnlineQuizSelectChoiceOption;
