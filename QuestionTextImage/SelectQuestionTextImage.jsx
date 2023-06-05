import React, { useContext } from "react";
import styles from "../OnlineQuiz.module.css";
import { useState, useRef } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import parse from "html-react-parser";
export default function SelectQuestionTextImage({
  choices,
  hasAnswerSubmitted,
  setChoosenAnswer,
  studentAnswer,
  answrerRef,
}) {
  const [prevSelect, setPrevSelect] = useState(0);
  const choicesBoxRef = useRef([]);
  const { setIsAnswerCorrect, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const handleSelect = (e, i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) {
      return;
    }
    choicesBoxRef.current[
      prevSelect
    ].className = `${styles.flex} ${styles.choiceType} ${styles.prevSelectionAnswerSelection} ${styles.selectChoicesFont}`;
    choicesBoxRef.current[
      i
    ].className = `${styles.flex} ${styles.choiceType} ${styles.selectedChoiceType} ${styles.selectChoicesFont}`;
    choices[i]?.option === "true"
      ? setIsAnswerCorrect(true)
      : setIsAnswerCorrect(false);
    setChoosenAnswer(true);
    answrerRef.current = choices[i]?.image;
    setPrevSelect(i);
  };

  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices} ${styles.questiontextImage}`}
    >
      {choices.map((item, i) => (
        <div
          className={`${styles.flex} ${styles.choiceType} ${
            styles.selectChoicesFont
          } ${
            isStudentAnswerResponse &&
            String(item?.image)?.trim() === String(studentAnswer)?.trim() &&
            styles.selectedChoiceType
          }`}
          key={i}
          name={item.option}
          onClick={(e) => handleSelect(e, i)}
          ref={(el) => (choicesBoxRef.current[i] = el)}
        >
          <div className="mathzone-circle-selectbox">
            <b>{String.fromCharCode(65 + i)}</b>
          </div>
          <div>{parse(item.image,optionSelectStaticMathField)}</div>
        </div>
      ))}
    </div>
  );
}
