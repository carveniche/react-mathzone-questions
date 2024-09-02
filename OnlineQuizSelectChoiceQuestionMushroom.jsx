import React, { useContext, useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "./OnlineQuiz.module.css";

let prevSelectionAnswerSelection = -1;

function OnlineQuizSelectChoiceOptionMushroom({
  choices,
  correctAnswer,
  setIsAnswerCorrect,
  setanswerHasSelected,
  isAnswerSelected,
  teacher,
  answerRef,
  studentAnswer,
}) {
  const selectOptionsChoiceRef = useRef([]);
  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);

  const [selectedOption, setSelectedOption] = useState();
  const selectOptionHandler = (index) => {
    setSelectedOption(index);
    if (hasAnswerSubmitted || teacher || isStudentAnswerResponse) return;
    if (!isAnswerSelected) {
      prevSelectionAnswerSelection = index;
      let choosenAnswer =
        selectOptionsChoiceRef.current[index].children[1].textContent;

      answerRef.current = choosenAnswer;
      if (String(choosenAnswer).trim() === String(correctAnswer).trim()) {
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
      }
      setanswerHasSelected(true);
    }
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
      style={{ marginTop: "100px" }}
    >
      {choices.map((item, index) => (
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
            style={{ fontSize: fontSizeDynamic(HtmlParser(item)) }}
          >
            {typeof item === "string" ? HtmlParser(item) : item}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnlineQuizSelectChoiceOptionMushroom;
