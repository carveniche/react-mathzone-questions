import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import styles from "../OnlineQuiz.module.css";
export default function SelectMultipleChoice({
  choices,
  inputRef,
  answerHasSelected,
  submitted,
  choiceId,

}) {
  let [choicesState, setChoicesState] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
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
    if (answerHasSelected || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;
  return (
    <div className="mathzoneMultipleChoiceFlexBox .word-space_pre-wrap">
      {choicesState?.map(
        (value, i) =>
          (value.choices || value?.choice_image) && (
            <div

              // className={`${styles.choicebox} ${answerHasSelected || isStudentAnswerResponse
              //     ? value?.correct == true
              //       ? styles.green
              //       : value?.show && styles.red

              //     : value?.show ? styles.selectedChoiceType : ''
              //   }`}

              className={`${styles.choicebox} ${
                      isStudentAnswerResponse &&
                      String(choiceId)?.trim() === String(value?.choice_id)?.trim()
                        ? styles.selectedChoiceType
                        : value.show
                        ? styles.selectedChoiceType
                        : "mathzonePrevSelectionAnswerSelection"
                    }`}

              style={{ padding: `${value?.choice_image ? 0.5 : 1}rem 1rem` }}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div className={`mathzone-circle-selectbox ${styles.circle}`}>
                {" "}
                <b>{String.fromCharCode(65 + i)}</b>
              </div>
              <div className={`mathzoneFlex mathzoneFlexDirectionColumn`}>
                {value.choices && (
                  <div key={i}>
                    {parse(value.choices, optionSelectStaticMathField)}
                  </div>
                )}
                {value?.choice_image && (
                  <div className="choiceImage">
                    <img src={value?.choice_image} />
                  </div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
