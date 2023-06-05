import React from 'react';
import { useRef } from "react";
import styles from "./OnlineQuiz.module.css";
let prevSelectionAnswerSelection = -1;
function OnlineQuizSelectChoiceOption({
  choices,
  correctAnswer,
  setIsAnswerCorrect,
  setanswerHasSelected,
  isAnswerSelected
}) {
  const selectOptionsChoiceRef = useRef([]);

  
  const selectOptionHandler = (index) => {
    if (!isAnswerSelected) {
      if (prevSelectionAnswerSelection > -1) {
        selectOptionsChoiceRef.current[
          prevSelectionAnswerSelection
        ].className = `${styles.flex} ${styles.choiceType} ${styles.prevSelectionAnswerSelection} ${styles.selectChoicesFont}`;
      }
      selectOptionsChoiceRef.current[
        index
      ].className = `${styles.flex} ${styles.choiceType} ${styles.selectedChoiceType} ${styles.selectChoicesFont}` ;
      //console.log(selectOptionsChoiceRef.current[index].children[1].textContent);
      prevSelectionAnswerSelection = index;
      let choosenAnswer =
        selectOptionsChoiceRef.current[index].children[1].textContent;
        console.log(selectOptionsChoiceRef.current[index].children[1].textContent)
      if (String(choosenAnswer).trim() === String(correctAnswer).trim()) {
        setIsAnswerCorrect(true)
      } else {
       setIsAnswerCorrect(false)
      }
      setanswerHasSelected(true);
    }
  };
  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
    >
      {choices.map((item, index) => (
        <div
          key={index}
          className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont}`}
          ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
          onClick={() => selectOptionHandler(index)}
          
        >
          <div>
            <b>({String.fromCharCode(65 + index)})</b>
          </div>
          <div styles={{paddingRight:"1rem"}}>{item}</div>
        </div>
      ))}
    </div>
  );
}
export default OnlineQuizSelectChoiceOption;
