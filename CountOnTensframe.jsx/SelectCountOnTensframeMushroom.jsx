import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
export default function SelectCountOnTensframeMushroom({ choices, inputRef,studentAnswer }) {
  let [choicesState, setChoicesState] = useState([]);
  const prev = useRef(0);
  const { hasAnswerSubmitted,isStudentAnswerResponse } = useContext(ValidationContext);
  const [selectedOption, setSelectedOption] = useState();

  const handleChoiceSelection = (i) => {
    setSelectedOption(i)

    if (hasAnswerSubmitted||isStudentAnswerResponse) return;

    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  console.log("----------------")
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
    < >
      <div  
      className={`${styles.flex} ${styles.flexWrap} ${styles.boxChoices}`}
      style={{ marginTop: "100px",marginBottom:"50px" }}>
        {choicesState?.map((value, i) => (
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
          

            <div key={i}
            className={styles.choiceText}
            style={{ fontSize: fontSizeDynamic(HtmlParser(value.value)) }}
            >{HtmlParser(value.value)}</div>
          </div>
        ))}
      </div>
    </>
  );
}


