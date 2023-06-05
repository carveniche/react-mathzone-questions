import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";

export default function CompareOfImageSelectChoice({
  content,
  totalRows,
  dropRef,
  totalCols,
  state,
}) {
  const [choices, setChoices] = useState([]);
  let [rows, setRows] = useState([]);
  useEffect(() => {
    let row = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map((items) =>
        items.map(
          (item) =>
            String(item.row) == String(i) &&
            temp.push({ ...item, show: false, dropValue: "" })
        )
      );
      row.push(temp);
    }
    setRows([...row]);
    let arr = [];
    state?.choices?.map((item) => {
      let obj = { val: item, show: false };
      arr.push({ ...obj });
    });
    setChoices([...arr]);
  }, []);
  dropRef.current = [...choices];
  let hasAnswerSubmitted  = true
  const prevRef = useRef(0);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted) return;
    choices[prevRef.current].show = false;
    choices[i].show = true;
    prevRef.current = i;
    setChoices([...choices]);
  };
  return (
    <div>
      <div>
        {/* Droppable Part */}
        {rows?.map((items, i) => (
          <FlexBox2 key={i} totalRows={totalCols}>
            {items?.map((item, index) =>
              item.isMissed == "false" ? (
                <div>{HtmlParser(item.value)}</div>
              ) : (
                <div>
                  <Input disabled={true} />
                </div>
              )
            )}
          </FlexBox2>
        ))}

        {/* Draggable Part */}
      </div>
      <FlexBox>
        {choices?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div>{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.val)}</div>
          </div>
        ))}
      </FlexBox>
    </div>
  );
}
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: row;

  margin: 2rem 0.2rem;
  gap: 4rem;
  //justify-content:center;
  align-items: center;
  > div {
    width: Calc(
      (100% - ${(props) => props.totalRow}*2rem) / ${(props) => props.totalRows}
    );
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 100px;
  word-break: break-all;
  text-align: center;
`;

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
