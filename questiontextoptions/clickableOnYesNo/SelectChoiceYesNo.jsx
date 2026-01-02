import React, { useContext } from 'react'
import styles from "../../CommonFiles/ModuleStyles/choices.module.css";
import { ValidationContext } from '../../../MainOnlineQuiz/MainOnlineQuizPage';
export  default function SelectChoiceYesNo({
  choices,
  onSelect,
  studentAnswer,
}) {
  const values = ['yes', "no"]
  // Safe normalization helper
  const {
    hasAnswerSubmitted,
    isStudentAnswerResponse,
    currectAnswer
  } = useContext(ValidationContext)
 
  return (
    <div className={styles.choices_wrapper}>
      {
        values.map((item, i) => {

          const isVisible = choices === item
          const correctAnswerTrimmed = (hasAnswerSubmitted || isStudentAnswerResponse) && currectAnswer == item
          const inCorrectAnswerTrimmed = isVisible && hasAnswerSubmitted && choices === item && currectAnswer !== choices
          const inCorrectStudentAnswer = isStudentAnswerResponse && currectAnswer !== studentAnswer  && studentAnswer == item
          const classList = new Set([
            styles.choiceType,
            isVisible ? styles.selectedChoiceType : styles.prevSelectionAnswerSelection,
            correctAnswerTrimmed && styles.green,
            inCorrectAnswerTrimmed && styles.red,
            inCorrectStudentAnswer && styles.red ,
            (hasAnswerSubmitted || isStudentAnswerResponse) && styles.notHoverClass

          ]);

          const className = Array.from(classList).filter(Boolean).join(' ');
          return (

            <div className={className} key={i}>
              <div className={styles.choiceTypeInner}
                onClick={() => onSelect(item)}
              >
                <div className={`${styles.circle}`}>
                  {" "}
                  <b>{String.fromCharCode(65 + i)}</b>
                </div>
                <div className={`${styles.choice_text}`}>
                  {item}
                </div>
              </div>
            </div>
          )

        })
      }

    </div>
  );
}
