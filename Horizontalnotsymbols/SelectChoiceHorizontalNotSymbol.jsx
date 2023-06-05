import React, { useContext } from 'react';
import { useRef } from "react";
import HtmlParser from 'react-html-parser';
import HtmlParserComponent from '../../CommonJSFiles/HtmlParserComponent';
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import CompareTwoValue from '../compareTwoValue';
import styles from "../OnlineQuiz.module.css";
let prevSelectionAnswerSelection = -1;
function SelectChoiceHorizontalNotSymbol({
  choices,
  correctAnswer,
  setanswerHasSelected,
  isAnswerSelected,
  setIsAnswerCorrect,
  valueRef,
  studentAnswer
}) {
  const selectOptionsChoiceRef = useRef([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const selectOptionHandler = (index) => {
    if(isStudentAnswerResponse)
    return
    if (!isAnswerSelected) {
      if (prevSelectionAnswerSelection > -1) {
        selectOptionsChoiceRef.current[
          prevSelectionAnswerSelection
        ].className = `${styles.flex} ${styles.choiceType} ${styles.prevSelectionAnswerSelection} ${styles.selectChoicesFont}`;
      }
      selectOptionsChoiceRef.current[
        index
      ].className = `${styles.flex} ${styles.choiceType} ${styles.selectedChoiceType} ${styles.selectChoicesFont}`;
      prevSelectionAnswerSelection = index;
      let choosenAnswer = selectOptionsChoiceRef.current[index].children[1].textContent;
    
      if (CompareTwoValue(choosenAnswer,correctAnswer)) {
        setIsAnswerCorrect(true)
      } else {
        setIsAnswerCorrect(false)
      }
      valueRef.current=choosenAnswer
      setanswerHasSelected(true);
    }
  };
  
  return <div
  className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
>
  {choices?.map((item, index) => (
    <div
      key={index}
      className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont} ${isStudentAnswerResponse&&String(item)?.trim()==String(studentAnswer)?.trim()&&styles.selectedChoiceType}`}
      ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
      onClick={() => selectOptionHandler(index)}
    >
      <div className="mathzone-circle-selectbox">
        <b>{String.fromCharCode(65 + index)}</b>
      </div>
      <div style={{paddingRight:"1rem"}}><HtmlParserComponent value={item}/></div>
    </div>
  ))}
</div>
  }
export default SelectChoiceHorizontalNotSymbol;



