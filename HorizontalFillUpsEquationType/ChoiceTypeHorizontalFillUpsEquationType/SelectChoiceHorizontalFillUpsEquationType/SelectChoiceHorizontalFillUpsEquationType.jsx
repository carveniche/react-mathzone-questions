import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import styled from "styled-components";
import styles from "../../../OnlineQuiz.module.css";
import { optionSelectStaticMathField } from "../../replaceDomeNode/ReplaceDomNode";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
export default function SelectChoiceHorizontalFillUpsEquationType({
  choices,
  inputRef,
  answerHasSelected,
  content,
  totalRows,
  studentAnswer,
  choiceType
}) {
  const [row, setRow] = useState([]);
  let [choicesState, setChoicesState] = useState([]);
  let prev = useRef(0);
 
  useEffect(() => {
    let arr2 = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr2.push({ ...obj });
    });

    let arr = [];
    totalRows = Number(totalRows) || 0;

    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        
        item.row == i && temp.push(item);
      });
      arr.push(temp);
    }
    setRow([...arr]);
    setChoicesState([...arr2]);
  }, []);
  const {hasAnswerSubmitted,isStudentAnswerResponse}=useContext(ValidationContext)
  const handleChoiceSelection = (i) => {
  
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;
  return (
    <>
      {row?.map((items, index) => (
        <div
          className={`${styles.HorizontalPictureSelectChoiceFlexBox} mathzone-color-indigo`}
          key={index}
          style={{gap:choiceType="horizontal_fill_ups"?5:18}}
        >
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div key={i} style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>
                {parse(item.value, optionSelectStaticMathField)}
              </div>
            ) : (
              <div value={item.value} key={i}>
                <input style={InlineCss.Input} disabled={true} value="?"/>
              </div>
            )
          )}
        </div>
      ))}
      <div
        className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} mathzone-color-indigo ${styles.boxChoices}`}
      >
        {choicesState?.map((value, i) => (
          <div
            style={{ color: "initial", fontWeight: "initial" }}
            className={`${styles.flex} ${styles.choiceType} ${
              styles.selectChoicesFont
            } ${(isStudentAnswerResponse&&String(value?.value)?.trim()===String(studentAnswer)?.trim())?styles.selectedChoiceType:
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            key={i}
            onClick={() => handleChoiceSelection(i)}
          >
            <div className="mathzone-circle-selectbox">
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div key={i}>
              {parse(value?.value, optionSelectStaticMathField)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "80px",
  },
};
