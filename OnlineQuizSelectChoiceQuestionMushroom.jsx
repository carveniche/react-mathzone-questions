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
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
      style={{ marginTop: "100px" }}
    >
      {choices.map((item, index) => (
        <div
          key={index}
          ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
          onClick={() => selectOptionHandler(index)}
          style={{
            position: "relative",
            cursor: "pointer",
            border: selectedOption === index ? "2px solid yellow" : "none",
            borderRadius: "50%", // Makes the border round
            padding: selectedOption === index ? "4px" : "0", 
            borderWidth:selectedOption === index ? "18px" : "0"

          }}
        >
          <img
            src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
            alt="Mushroom"
            style={{ height: "200px", width: "200px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              pointerEvents: "none",
              fontSize: fontSizeDynamic(HtmlParser(item)),
              border:"10px solid red",
              borderRadius:"50%",
             borderBlockColor:"red",
             backgroundColor:"red"
            }}
          >
            {typeof item === "string" ? HtmlParser(item) : item}
            {/* "hdfkjhdsuhfsdiuifi" */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnlineQuizSelectChoiceOptionMushroom;
