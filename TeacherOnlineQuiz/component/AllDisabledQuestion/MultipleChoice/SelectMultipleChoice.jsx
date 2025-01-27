import React, { useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { useContext } from "react";
import { ValidationContext } from "../../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function SelectMultipleChoice({
  choices,
  inputRef,
  answerHasSelected,
  resultView,
  choiceId,
}) {
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  let [choicesState, setChoicesState] = useState([]);
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
    <FlexBox>
      {choicesState?.map(
        (value, i) =>
          (value.choices || value?.choice_image) && (
            <React.Fragment key={i}>
              <div
                className={`${styles.flex}  ${
                  isStudentAnswerResponse &&
                  String(choiceId) === String(value?.choice_id)?.trim()
                    ? styles.selectedChoiceType
                    : value.show
                    ? styles.selectedChoiceType
                    : styles.prevSelectionAnswerSelection
                } ${
                  value?.correct === true &&
                  resultView === true &&
                  "correctChoicesMultiple"
                }`}
                style={{
                  padding: `${value?.choice_image ? 0.5 : 1}rem 1rem`,
                  position: "relative",
                }}
                key={i}
                onClick={() => handleChoiceSelection(i)}
              >
                <div>
                  {" "}
                  <b>{String.fromCharCode(65 + i)}</b>
                </div>
                <div className={`${styles.flex} ${styles.flexDirectionColumn}`}>
                  {value.choices && (
                    <div key={i}>
                      {parse(value.choices, optionSelectStaticMathField)}{" "}
                    </div>
                  )}
                  {value?.choice_image && (
                    <div className="choiceImage">
                      <img src={value?.choice_image} />
                    </div>
                  )}
                </div>
                {resultView === true && value?.student_choice === true && (
                  <div className={styles.circleResponse}></div>
                )}
              </div>
            </React.Fragment>
          )
      )}
    </FlexBox>
  );
}
const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 90%;
  margin-top: 1.5rem;
  cursor: pointer;
  > .correctChoicesMultiple {
    background-color: #cceea5;
  }
  > div {
    min-width: calc(50% - 0.5rem);

    flex: 1;
    display: flex;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    align-items: center;
    padding-left: 18px;
    color: #233584;
    border-radius: 12px;
    word-break: break;
    min-height: auto;
    height: 60px;

    gap: 2rem;

    border: 1px solid black;

    height: auto;
  }
  > div > div {
    min-width: auto;
    min-height: auto;
  }
  > div > div:nth-child(2) {
    flex: 1;
    display: flex;

    flex-wrap: wrap;
    word-break: break;
  }
  * .choiceImage {
    padding: 0;
  }
`;
