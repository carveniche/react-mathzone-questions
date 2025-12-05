import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../CommonFiles/ModuleStyles/choices.module.css";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
export default function SelectMultipleSelect({
  choices,
  inputRef,
  answerHasSelected,
  choiceId,
}) {
  let [choicesState, setChoicesState] = useState([]);
  const { isStudentAnswerResponse, hasAnswerSubmitted, setStudentAnswerChoice, currectAnswer, setCurrectAnswer } = useContext(ValidationContext);
  let student_answer = []; 
  if(typeof choiceId =="string"){
   student_answer = JSON.parse(choiceId);
   }
  student_answer = student_answer?.map((item) => item.toString());
  let prev = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
      if (item.correct === "true" || item.correct === true) {

      }
    });

    const correctMissedAnswer = choices
      ?.filter((item) => item.correct === "true" || item.correct === true)
      .map((item) => item.choice_id);

    setCurrectAnswer(correctMissedAnswer);
    setChoicesState([...arr]);
  }, []);

  const handleChoiceSelection = (i) => {
   
    if (answerHasSelected || isStudentAnswerResponse) return;
    choicesState[i].show = !choicesState[i].show;
    setChoicesState([...choicesState]);
    const selectedChoices = choicesState
      .filter((item) => item.show)
      .map((item) => item.choice_id);
    setStudentAnswerChoice(selectedChoices);
  };

  inputRef.current = choicesState;

  return (
    <div className={styles.choices_wrapper}>
      {choicesState?.map((item, i) => {
        const valueTrimmed = String(item?.choice_id).trim();
        const studentAnswerTrimmed = (student_answer || []).map(id => String(id).trim());
        const correctAnswerTrimmed = (currectAnswer || []).map(id => String(id).trim());

        const isVisible = item?.show;
        // During student response view
        // const isSelectedByStudent = isStudentAnswerResponse && studentAnswerTrimmed.includes(valueTrimmed);
        const isCorrectAnswer = isStudentAnswerResponse && correctAnswerTrimmed.includes(valueTrimmed);
        const isIncorrectAnswer = isStudentAnswerResponse && !item.correct && studentAnswerTrimmed.includes(valueTrimmed)
       
        // During submission
        const isAnswerSubmitted = hasAnswerSubmitted;
        const isCorrectAtSubmit = isAnswerSubmitted && correctAnswerTrimmed.includes(valueTrimmed);
        const isIncorrectAtSubmit = isAnswerSubmitted && isVisible && !correctAnswerTrimmed.includes(valueTrimmed);

        const classList = new Set([
          styles.choiceType,
          isVisible ? styles.selectedChoiceType : styles.prevSelectionAnswerSelection,
          isIncorrectAnswer && styles.red,
          isCorrectAnswer && styles.green,
          isCorrectAtSubmit && styles.green,
          isIncorrectAtSubmit && styles.red,
          (isAnswerSubmitted || isStudentAnswerResponse)   && styles.notHoverClass
        ]);

        const className = Array.from(classList).filter(Boolean).join(" ");

        return (
          (item.choices || item?.choice_image) && (
            <div
              className={className}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div className={styles.choiceTypeInner}>
                <div className={`${styles.circle}`}>
                  <b>{String.fromCharCode(65 + i)}</b>
                </div>
                <div className={`${styles.flex} ${styles.flexDirectionColumn}`}>
                  {item.choices && <div>{HtmlParser(item.choices)}</div>}
                  {item?.choice_image && (
                    <div className="choiceImage">
                      <img src={item?.choice_image} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}

    </div>
  );
}
