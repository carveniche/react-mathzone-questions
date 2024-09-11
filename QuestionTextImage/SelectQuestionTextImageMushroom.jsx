import React, { useContext } from "react";
import styles from "../OnlineQuiz.module.css";
import { useState, useRef } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import parse from "html-react-parser";
const isDirectParse = (str) => {
  let flag = str.includes("mq-selectable");
  return !flag ? parse(str) : parse(str, optionSelectStaticMathField);
};
export default function SelectQuestionTextImageMushroom({
  choices,
  hasAnswerSubmitted,
  setChoosenAnswer,
  studentAnswer,
  answrerRef,
}) {
  const [prevSelect, setPrevSelect] = useState(0);
  const [selectedOption, setSelectedOption] = useState();

  const choicesBoxRef = useRef([]);
  const { setIsAnswerCorrect, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const handleSelect = (e, i) => {
    setSelectedOption(i)
    if (hasAnswerSubmitted || isStudentAnswerResponse) {
      return;
    }
    choices[i]?.option === "true"
      ? setIsAnswerCorrect(true)
      : setIsAnswerCorrect(false);
    setChoosenAnswer(true);
    answrerRef.current = choices[i]?.image;
    setPrevSelect(i);
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
      {choices.map((item, i) => (
        <div
       
          key={i}
          name={item.option}
          onClick={(e) => handleSelect(e, i)}
          ref={(el) => (choicesBoxRef.current[i] = el)}
          className={styles.choiceItem}

          style={{
            position: "relative",
            cursor: "pointer",
              outline: selectedOption === i ? "4px solid yellow" : "none",
              borderRadius: "50%", 
              padding: "0", 
            }}
        >
          <img
            src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
            alt="Mushroom"
          />
          <div
                 className={styles.choiceText}
                 style={{ fontSize: fontSizeDynamic(isDirectParse(item.image))}}
          >{isDirectParse(item.image)}</div>
        </div>
      ))}
    </div>
  );
}
