import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css"
import HtmlParser from "react-html-parser";
export default function CompareDragOperatorKeyingChoiceType({
  content,
  totalRows,
  state,
  dropRef,
  isAnswerSubmitted,
  totalCols,
}) {
  let [rows, setRows] = useState([]);

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
    setRows(rows);
  }, []);

  const handleChange = (e, row, col) => {
    if (hasAnswerSubmitted) return;
    rows[row][col].dropValue = e.target.value;
    if (rows[row][col].dropValue === "") rows[row][col].show = false;
    else rows[row][col].show = true;
    setRows([...rows]);
  };
  dropRef.current = rows;
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  return (
    <div>
      <div>
        {rows?.map((items, i) => (
          <div className={styles.CompareDragOperatorKeyingFlexBox2} key={i} totalCols={totalCols}>
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div key={index}>{typeof item.value=="string"?HtmlParser(item?.value):item?.value}</div>
              ) : (
                <div>
                  <input
                    value={item.dropValue}
                    onChange={(e) => handleChange(e, i, index)}
                    disabled={hasAnswerSubmitted}
                    style={InlineCss.Input}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 1rem;
  flex-wrap: wrap;

  > div {
    min-width: 94px;
    min-height: 50px;
    width: auto;
    max-width: 50%;
    height: auto;
    word-break: break-word;
    padding: 10px;
    border-radius: 10px;
    flex-wrap: wrap;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    border: ${(props) => props.border};
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
  min-height: 50px;
  min-width: 140px;
  word-break: break-all;
  text-align: center;
`;

const InlineCss={
  Input:{
    minHeight: "50px",
  minWidth: "140px",
  wordBreak: "break-all",
  textAlign: "center"
  }
}
