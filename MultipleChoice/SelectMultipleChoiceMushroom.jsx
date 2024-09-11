import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import styles from "../OnlineQuiz.module.css";

export default function SelectMultipleChoiceMushroom({
  choices,
  inputRef,
  answerHasSelected,
  submitted,
  choiceId,
}) {
  let [choicesState, setChoicesState] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const [selectedOption, setSelectedOption] = useState();

  let prev = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  const handleChoiceSelection = (i) => {
    setSelectedOption(i)
    if (answerHasSelected || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;
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
      {choicesState?.map(
        (value, i) =>
          (value.choices || value?.choice_image) && (
            <div
              key={i}
              onClick={() => handleChoiceSelection(i)}
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
              
              >
                {value.choices && (
                  <div key={i}   
                  className={styles.choiceText}
                  style={{ fontSize: fontSizeDynamic(parse(value.choices)) }}
                  >
                    
                    {parse(value.choices, optionSelectStaticMathField)}
                  </div>
                )}
               
              </div>
            </div>
          )
      )}
    </div>
  );
}
