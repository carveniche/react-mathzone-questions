import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
export default function CompareDragOperatorSelectChoice({
  content,
  totalRows,
  dropRef,
  totalCols,
  state
}) {
  let [rows, setRows] = useState([]);
  const [choices, setChoices] = useState([]);
  const prevRef = useRef(0);
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map(
        (item, ind) =>
          String(item.row) == String(i) &&
          temp.push({ ...item, show: false, dropValue: "" })
      );
      rows.push(temp);
    }
    let arr=[]
    state?.choices?.map((item) => {
        let obj = { ...item, show: false };
        arr.push({ ...obj });
      });
      setChoices([...arr]);
    setRows(rows);
  }, []);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted) return;
    choices[prevRef.current].show = false;
    choices[i].show = true;
    prevRef.current = i;
    setChoices([...choices]);
  };
  dropRef.current = [...choices];
  const  hasAnswerSubmitted  =true
  return (
    <div>
      <div>
        {rows?.map((items, i) => (
          <FlexBox2 key={i} totalCols={totalCols}>
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div key={index}>{typeof item.value=="string"?HtmlParser(item?.value):item?.value}</div>
              ) : (
                <div>
                  <Input disabled={true} />
                </div>
              )
            )}
          </FlexBox2>
        ))}
      </div>
      <FlexBox>
        {choices?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div>{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.value)}</div>
          </div>
        ))}
      </FlexBox>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 90%;
  margin-top: 0.1rem;
  cursor: pointer;
  > div {
    min-width: Calc(50% - 0.4rem);
    max-width: Calc(50% - 0.4rem);

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
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 0.6rem;
  flex-wrap: wrap;

  > div {
    min-width: 64px;
    padding: 10px;
    width: auto;
    min-height: 50px;
    height: auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    border: ${(props) => props.border};
  }
  > #missedBox {
    min-width: 120px;
    padding: 10px;
    width: auto;
    min-height: 50px;
    height: auto;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 140px;
  word-break: break-all;
  text-align: center;
`;
