import React, { useContext, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { useState } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
export default function SelectVerticalSymbolsMushroom({
  choices,
  choiceRef,
  hasAnswerSubmitted,
  studentAnswer,
}) {
  const selectOptionsChoiceRef = useRef([]);
  const [prevSelectionAnswerSelection, setPrevSelectionAnswerSelection] =
    useState(0);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const [selectedOption, setSelectedOption] = useState();

  const handleSelect=(e,i)=>{
    setSelectedOption(i)
    if(hasAnswerSubmitted||isStudentAnswerResponse)
    {
        return
    }
  
      choiceRef.current=selectOptionsChoiceRef.current[i].children[1]
      
  
    setCurrentChoice(i)
    setPrevSelectionAnswerSelection(i)

}
  const [currentChoice, setCurrentChoice] = useState(-1);
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
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      {choices.map((item, i) => (
        <div
      
          key={i}
          onClick={(e) => handleSelect(e, i)}
          ref={(el) => (selectOptionsChoiceRef.current[i] = el)}
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
            style={{ fontSize: fontSizeDynamic(HtmlParser(item)) }}
          >{HtmlParser(item)}</div>
        </div>
      ))}
    </div>
  );
}
