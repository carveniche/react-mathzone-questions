import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
export default function VerticalSelect({
  content,
  totalRows,
  totalCols,
  hasAnswerSubmitted,
  totalEmptyBox,
  inputRef,
  choices,
}) {
  let [choiceState, setChoicesState] = useState([]);
  const prevRef = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { val: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted) return;
    choiceState[prevRef.current].show = false;
    choiceState[i].show = true;
    prevRef.current = i;
    setChoicesState([...choiceState]);
  };
  inputRef.current = choiceState;
  return (
    <div>
      <div style={{ marginTop: "4rem" }}>
        {content?.map((items, index) => (
          <FlexBox
            key={index}
            border={index === totalRows - 1 && "2px"}
            totalWidth={totalCols}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                  {typeof item.value=="string"?HtmlParser(item?.value):item?.value}
                </div>
              ) : (
                <div value={item.value} key={i}>
                  <Input disabled={true} />
                </div>
              )
            )}
          </FlexBox>
        ))}
      </div>
      <FlexBox2>
        {choiceState?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div>{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.val)}</div>
          </div>
        ))}
      </FlexBox2>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  border-top: ${(props) => (props.border ? props.border : 0)} solid black;
  width: ${(props) => props.totalWidth * 35}px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    font-size: 25px;
    font-weight: 600;
    color: indigo;
  }
`;
const Input = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
`;
const FlexBox2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 80%;
  margin-top: 2rem;
  cursor: pointer;
  > div {
    width: auto;

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
    border-radius: 5px;
    word-break: break;
    min-height: auto;
    height: 60px;

    gap: 2rem;

    border: 1px solid black;

    height: auto;

    padding: 1rem;
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
`;
