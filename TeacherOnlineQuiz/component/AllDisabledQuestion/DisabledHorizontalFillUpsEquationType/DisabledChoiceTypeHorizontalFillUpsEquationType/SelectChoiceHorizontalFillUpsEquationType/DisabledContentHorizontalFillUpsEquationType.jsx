import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";

import parse from "html-react-parser";
import styled from "styled-components";
import styles from "../../../../../../OnlineQuiz.module.css";
import { optionSelectStaticMathField } from "../../../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";

export default function DisabledSelectChoiceHorizontalFillUpsEquationType({
  choices,
  inputRef,
  answerHasSelected,
  content,
  totalRows,
}) {
  const [row, setRow] = useState([]);
  let [choicesState, setChoicesState] = useState([]);
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

  return (
    <>
      {row?.map((items, index) => (
        <div
          className={styles.HorizontalPictureSelectChoiceFlexBox}
          key={index}
          style={{margin:"1rem 0"}}
        >
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div key={i} style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>
                {parse(item.value, optionSelectStaticMathField)} 
              </div>
            ) : (
              <div value={item.value} key={i}>
                <input style={InlineCss.Input} disabled={true} />
              </div>
            )
          )}
        </div>
      ))}
      <div
        className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
      >
        {choicesState?.map((value, i) => (
          <div
            style={{ color: "initial", fontWeight: "initial" }}
            className={`${styles.flex} ${styles.choiceType} ${
              styles.selectChoicesFont
            } ${
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            key={i}
          >
            <div>
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
const Input = styled.input`
  height: 50px;
  text-align: center;
  width: 80px;
`;
const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "80px",
  },
};
