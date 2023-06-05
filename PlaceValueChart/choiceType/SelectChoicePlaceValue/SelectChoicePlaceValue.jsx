import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import numberSystemConverter from "../../../../CommonJSFiles/numberSystemConverter";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export default function SelectChoicePlaceValue({
  isAnswerSubmitted,
  content,
  dropRef,
  totalRows,
  totalColumns,
  choices,
  numberSystem,
  state,
  studentAnswer
}) {
  totalColumns = Number(totalColumns) || 1;
  const [numbers, setNumbers] = useState([]);
  const [rows, setRows] = useState([]);
  const prev = useRef(0);
  const [choicesState, setChoicesState] = useState([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  useEffect(() => {
   
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      content[i]?.map((item, j) => {
       
        item.row == i && item.col == j && rows.push({ ...item });
      });
    }
    let temp = [];

    choices?.map((item) => {
      let obj = { value: item, show: false };
      temp.push({ ...obj });
    });
    let n = Number(totalColumns) || 0;
    let temp2 = numberSystemConverter(n,numberSystem,String(state?.chartType).trim()?.toLowerCase());
     setNumbers([...temp2]);
    setRows([...rows]);
    setChoicesState([...temp]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (isAnswerSubmitted||isStudentAnswerResponse) return;

    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  dropRef.current = choicesState;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <div
          totalCols={Number(totalColumns)}
          className={styles.PlaceValuechartSelectChoiceGrid}
          style={{
            gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
          }}
        >
          {numbers?.map((item, i) => (
            <div
              className={`${(i + 1) % totalColumns == 0 && styles.rightBorder}`}
            >
              <div>
                <b>{typeof item=="string"?HtmlParser(item):item}</b>
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
                <div><HtmlParserComponent value={items?.value} /></div>
              </div>
            ) : (
              <div
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
              >
                <div
                  id={index}
                  bgColor={false}
                  className={styles.PlaceValuechartSelectChoiceBox}
                  style={{
                    border: `${false ? 0 : "1"}px solid indigo`,
                  }}
                ></div>
              </div>
            )
          )}
        </div>
        <div
          className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
        >
          {choicesState?.map((value, i) => (
            <div
              className={`${styles.flex} ${styles.choiceType} ${
                styles.selectChoicesFont
              } ${
                (isStudentAnswerResponse&&String(value?.value)?.trim()===String(studentAnswer)?.trim())?styles.selectedChoiceType:value.show
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
              <div key={i}>{HtmlParser(value?.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


