import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import { number } from "prop-types";
import HtmlParser from "react-html-parser";
import numberSystemConverter from "../../../../CommonJSFiles/numberSystemConverter";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export default function KeyingchoiceTypePlaceValueChart({
  isAnswerSubmitted,
  content,
  dropRef,
  totalRows,
  totalColumns,
  numberSystem,
  state
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

    let temp2 = numberSystemConverter(n,numberSystem,String(state?.chartType).trim()?.toLowerCase());
     setNumbers([...temp2]);

    setRows([...rows]);
  }, []);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const handleChange = (e, i) => {
    let text = e.target.value;
    rows[i].dropVal = text;
    setRows([...rows]);
  };
  dropRef.current = rows;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <div
          totalCols={Number(totalColumns)}
          className={styles.PlaceValueChartKeyingGrid}
          style={{
            gridTemplateColumns: `repeat(${Number(totalColumns) || 1}, 1fr)`,
            overflow:"auto"
          }}
        >
          {numbers?.map((item, i) => (
            <div
              className={`${(i + 1) % totalColumns == 0 && styles.rightBorder}`}
            >
              <div>
                <b>{item}</b>
              </div>
            </div>
          ))}
          {rows?.map((items, index) =>
            items?.isMissed == "false" ? (
              <div
                key={index}
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
              >
                <div><HtmlParserComponent value={items?.value}/></div>
              </div>
            ) : (
              <div
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
              >
                <input
                  style={InlineCss.Input}
                  onChange={(e) => handleChange(e, index)}
                  disabled={isAnswerSubmitted||isStudentAnswerResponse}
                  type="text"
                  value={isStudentAnswerResponse?items[student_answer]:items[index]?.dropVal}
                />
              </div>
            )
          )}
        </div>
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

const InlineCss = {
  Input: {
    minHeight: "40px",
    position: "relative",
    textAlign: "center",
    width: "50px",
    height: "inherit",
  },
};
