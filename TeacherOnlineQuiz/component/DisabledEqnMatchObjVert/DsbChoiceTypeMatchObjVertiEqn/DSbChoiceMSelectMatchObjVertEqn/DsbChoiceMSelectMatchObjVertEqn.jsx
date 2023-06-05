import React, { useEffect } from "react";
import { useState } from "react";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import styles from "../../../../../OnlineQuiz.module.css";
export default function DsbChoiceMSelectMatchObjVertEqn({
  choices,
  content,
  totalRows,
}) {
  const [row, setRow] = useState([]);
  let [choicesState, setChoicesState] = useState([]);

  useEffect(() => {
    let arr2 = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
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
        <FlexBox key={index}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div key={i}>{item.value}</div>
            ) : (
              <div value={item.value} key={i}>
                <Input disabled={true} />
              </div>
            )
          )}
        </FlexBox>
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
          >
            <div>
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div key={i}>{HtmlParser(value?.value)}</div>
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
