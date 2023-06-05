import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import { number } from "prop-types";
import HtmlParser from "react-html-parser";
import numberSystemConverter from "../../../../../../../CommonJSFiles/numberSystemConverter";
export default function KeyingchoiceTypePlaceValueChart({
  isAnswerSubmitted,
  content,
  dropRef,
  totalRows,
  totalColumns,
  numberSystem,
  state,
}) {
  const [rows, setRows] = useState([]);
  const [numbers, setNumbers] = useState([]);
  totalColumns = Number(totalColumns) || 1;
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      content[i]?.map((item, j) => {
        item.row == i && item.col == j && rows.push({ ...item, dropVal: "" });
      });
    }
    let n = Number(totalColumns) || 0;
    let temp2 = numberSystemConverter(
      n,
      numberSystem,
      String(state?.chartType).trim()?.toLowerCase()
    );
    setNumbers([...temp2]);

    setRows([...rows]);
  }, []);
  const handleChange = (e, i) => {
    let text = e.target.value;
    rows[i].dropVal = text;
    setRows([...rows]);
  };
  dropRef.current = rows;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <Grid totalCols={Number(totalColumns)}>
          {numbers?.map((item, i) => (
            <div className={`${(i + 1) % totalColumns == 0 && "rightBorder"}`}>
              <div>
                <b>{typeof item == "string" ? HtmlParser(item) : item}</b>
              </div>
            </div>
          ))}
          {rows?.map((items, index) =>
            items?.isMissed == "false" ? (
              <div
                key={index}
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <div>
                  {typeof items.value == "string"
                    ? HtmlParser(items?.value)
                    : items?.value}
                </div>
              </div>
            ) : (
              <div
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <Input
                  onChange={(e) => handleChange(e, index)}
                  disabled={isAnswerSubmitted}
                  type="text"
                  value={items[index]?.dropVal}
                />
              </div>
            )
          )}
        </Grid>
      </div>
    </div>
  );
}

const Grid = styled.div`
  display: Grid;
  width: 100%;
  min-width: 100px;
  margin: 2rem 0;
  max-width: 100%;
  height: auto;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
  border: 1px solid black;

  > div {
    display: relative;
    display: flex;
    width: auto;
    justify-content: center;
    align-items: center;
    word-break: break;
    padding: 1rem 0.4rem;
    border-right: 1px solid black;
    height: auto;
  }
  > .borderBottom {
    border-top: 1px solid black;
  }
  > .rightBorder {
    border-right: 0px solid black;
  }
  > div > div {
    word-break: break;
    height: auto;
  }
`;
const Input = styled.input`
  min-height: 40px;
  position: relative;
  text-align: center;
  width: 50px;
  height: inherit;
`;
