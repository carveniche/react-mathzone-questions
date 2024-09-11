import React, { useContext } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
let obj = `<div id="studentAnswerResponse"><div class="OnlineQuiz_questionName__Xd-AR">Use the model to subtract&nbsp;<div>800 - 300&nbsp;</div></div><div><div class="sc-gsnTZi jgXmDM"><div></div></div></div><div><div class="sc-breuTD ifQRBy"><div class="sc-breuTD ifQRBy"><div class="sc-ksZaOG kWQTOQ"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"></div></div></div><div class="sc-evZas jFURDb"><div class="OnlineQuiz_prevSelectionAnswerSelection__3bfOR "><div>A</div><div>50</div></div><div class="  OnlineQuiz_selectedChoiceType__U5H8o "><div>B</div><div>500</div></div><div><div>C</div><div>40</div></div><div><div>D</div><div>400</div></div></div></div></div>`;
export default function BlockBaseImageChoiceSelectionMushroom({
  choices,
  correctAnswer,
  hasAnswerSubmitted,
  setIsAnswerCorrect,
  setHasOptionSelected,
  valueRef,
  studentAnswer,
}) {
  const [prevSelect, setPrevSelect] = useState(0);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const choicesBoxRef = useRef([]);
  const [selectedOption, setSelectedOption] = useState();

  const handleChoiceSelection = (i) => {
    setSelectedOption(i); 

    if (hasAnswerSubmitted || isStudentAnswerResponse) {
      return;
    }

    //console.log(choicesBoxRef.current[i].children[1].textContent)
    if (
      String(choicesBoxRef.current[i].children[1].textContent).trim() ===
      String(correctAnswer).trim()
    ) {
      setIsAnswerCorrect(true);
    } else setIsAnswerCorrect(false);
    setHasOptionSelected(true);
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
    <>
      <div
        className={`${styles.flex} ${styles.flexWrap} ${styles.boxChoices}`}
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        {" "}
        {choices?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
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
            // className={styles.choiceImage}
          />
           
            <div key={i}
             className={styles.choiceText}
             style={{ fontSize: fontSizeDynamic(HtmlParser(value)) }}
            >{HtmlParser(value)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
