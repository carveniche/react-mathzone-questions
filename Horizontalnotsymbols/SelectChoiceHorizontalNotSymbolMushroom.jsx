import React, { useContext, useState } from "react";
import { useRef } from "react";
import HtmlParser from "react-html-parser";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CompareTwoValue from "../compareTwoValue";
import styles from "../OnlineQuiz.module.css";
let prevSelectionAnswerSelection = -1;
function SelectChoiceHorizontalNotSymbolMushroom({
  choices,
  correctAnswer,
  setanswerHasSelected,
  isAnswerSelected,
  setIsAnswerCorrect,
  valueRef,
  studentAnswer,
}) {
  const selectOptionsChoiceRef = useRef([]);
  const [selectedOption, setSelectedOption] = useState();

  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const selectOptionHandler = (index) => {
    if (isStudentAnswerResponse || isAnswerSelected) return;

    setSelectedOption(index); 

    const choosenAnswer = choices[index];
    if (CompareTwoValue(choosenAnswer, correctAnswer)) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

    valueRef.current = choosenAnswer; // Store the selected answer in the ref
    setanswerHasSelected(true); // Mark answer as selected
  };
  const fontSizeDynamic = (text) => {
    const length = text.length;
  
    if (length > 10) {
      return "12px";
    } else if (length > 5) {
      return "18px"; 
    } else {
      return "24px";
    }
  };
  return (
    <div
      className={`${styles.flex} ${styles.flexWrap} ${styles.boxChoices}`}
      style={{ marginTop: "100px",marginBottom:"50px" }}
    >
      {choices?.map((item, index) => (
        <div
          key={index}
          ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
          onClick={() => selectOptionHandler(index)}
          className={styles.choiceItem}
          style={{
            position: "relative",
            cursor: "pointer",
            outline: selectedOption === index ? "4px solid yellow" : "none",
            borderRadius: "50%",
            padding: "0",
          }}
        >
          <img
            src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
            alt="Mushroom"
            className={styles.choiceImage}
          />
         
          <div 
           className={styles.choiceText}
           style={{ fontSize: fontSizeDynamic(HtmlParser(item)) }}>
            <HtmlParserComponent value={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default SelectChoiceHorizontalNotSymbolMushroom;
