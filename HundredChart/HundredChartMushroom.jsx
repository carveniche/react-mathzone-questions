import React, { useContext, useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import styles from "../OnlineQuiz.module.css";

let prevSelectionAnswerSelection = -1;

function HundredChartMushroom({
  choices,
  correctAnswer,
  setPrevState,
  hasAnswerSubmitted,
  isStudentAnswerResponse,
  setIsAnswerCorrect,
  setSelectedAnswer,
}) {
  const selectOptionsChoiceRef = useRef([]);

  const [selectedOption, setSelectedOption] = useState();

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
  const handleClick = (item, index) => {
    setSelectedOption(index); // Set the currently selected option
    if (hasAnswerSubmitted || isStudentAnswerResponse) return; // Do nothing if answer is already submitted or in response mode

    // Check if the selected answer is correct
    if (Number(item) === Number(correctAnswer)) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

    // Update the selected answer and previous state
    setSelectedAnswer(Number(item));
    setPrevState(index);
  };
  return (
    <div
      className={`${styles.flex} ${styles.flexWrap} ${styles.boxChoices}`}
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      {choices.map((item, index) => (
        <div
          key={index}
          ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
          onClick={() => handleClick(item, index)}
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
            // className={styles.choiceImage}
          />
          <div
            className={styles.choiceText}
            style={{ fontSize: fontSizeDynamic(Number(item)) }}
          >
            {Number(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HundredChartMushroom;
