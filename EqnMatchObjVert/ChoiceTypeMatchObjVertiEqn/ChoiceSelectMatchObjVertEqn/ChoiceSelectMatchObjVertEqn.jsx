import React, { useEffect } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import styles from "../../../OnlineQuiz.module.css";
export default function ChoiceSelectMatchObjVertEqn({
  choices,
  inputRef,
  answerHasSelected,
  content,
  totalRows,
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
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        item.row == i && temp.push({ ...item, show: false, dropVal: "" });
      });
      arr.push(temp);
    }
    setRow([...arr]);
    setChoicesState([...arr2]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (answerHasSelected) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;
  return (
    <>
      {row?.map((items, index) => (
        <div key={index}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div
                className={styles.MatchObjectVerticalVerticalFlexBox3}
                style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "black",
                    gap:"1rem"
                  }}
                >
                  {parse(item?.imgvalue, optionSelectStaticMathField)}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "black",
                    gap:"1rem"
                  }}
                >
                  {parse(item?.numvalue, optionSelectStaticMathField)}
                </div>
              </div>
            ) : (
              <div className={styles.MatchObjectVerticalVerticalFlexBox3}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "black",
                    gap:"1rem"
                  }}
                >
                  {parse(item.imgvalue, optionSelectStaticMathField)}
                </div>
                <div>
                  <div>
                    {<input style={InlineStyling.Input} disabled={true} />}
                  </div>
                </div>
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
            className={`${styles.flex} ${styles.choiceType} ${
              styles.selectChoicesFont
            } ${
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            key={i}
            onClick={() => handleChoiceSelection(i)}
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
  width: 180px;
`;
const InlineStyling = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "180px",
  },
};
const FlexBox3 = styled.div`
  width: 80%;
  margin: 1rem 0;
  display: flex;
  gap: 4rem;
  > div {
    max-width: calc(50% - 2rem);
    min-width: 90px;
    width: auto;
  }
  > div {
    display: flex;
    justify-content: left;
  }
`;
