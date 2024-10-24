import React, { useContext, useRef } from "react";
import { useState } from "react";
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import {
  GridPlaceValueTable,
  HeaderRowPlaceValueTable,
} from "./PlaceValueTableChoiceType/PlaceValueTableSelectChoice/PlaceValueTableSelectChoice";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useEffect } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
export default function ContentPlaceValueTableSelect({
  content,
  inputRef,
  totalEmptyBox,
  hasAnswerSubmitted,
  questionHead,
  totalCols,
  input2Ref,
}) {
  let [rowsData, setRowsData] = useState([]);
  const size = useRef({});
  const { isStudentAnswerResponse } = useContext(ValidationContext);

  const [row, setRow] = useState([]);
  useEffect(() => {
    let arr = content?.map((row) =>
      row?.map((cols) => {
        let item = { ...cols, [student_answer]: "" };
        return item;
      })
    );

    setRowsData([...arr]);
    setRow([...arr]);
  }, []);
  const [state, setState] = useState({});
  const handleChange = (e, rows, cols, item) => {
    console.log("row", row, item);
    row[rows][cols].stringLength =
      e.target.value.length > 1 ? e.target.value.length : 1;
    setRow([...row]);

    let str = "" + rows + cols;

    const hasLetter = /[a-zA-Z]/.test(item.value);
    const hasNumber = /\d/.test(item.value);
    var inpValue;
    inpValue = e.target.value;
    const studAnsHasLetter = /[a-zA-Z]/.test(inpValue);
    const studAnsHasSpace = /[\s]/.test(inpValue);
    const solnHasSpace = /[\s]/.test(item.value);
    if (!solnHasSpace && studAnsHasSpace) return;

    if (!hasLetter && studAnsHasLetter) return;

    if (!hasLetter && hasNumber && inpValue.length > item.value.length)
      inpValue = inpValue.slice(0, item.value.length);

    setState({ ...state, [str]: inpValue });
    rowsData[rows][cols][student_answer] = inpValue;
    size.current[str] = inpValue?.length > 2 ? inpValue.length : 2;
    setRowsData([...rowsData]);
  };

  let currentIndex = 0;
  input2Ref.current = [...rowsData];
  return (
    <div style={GridPlaceValueTable}>
      <div
        className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox}
        style={HeaderRowPlaceValueTable}
      >
        {questionHead?.map((item, i) => (
          <div key={i}>
            <HtmlParserComponent value={item?.value} />
          </div>
        ))}
      </div>
      {row?.map((items, index) => (
        <div
          key={index}
          className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox}
        >
          {items.map((item, i) =>
            item?.isMissed !== "true" ? (
              <div key={i}>
                <HtmlParserComponent value={item.value} />
              </div>
            ) : (
              <div
                key={i}
                ref={(el) => {
                  inputRef.current[currentIndex] = el;
                  if (currentIndex < totalEmptyBox - 1)
                    currentIndex = currentIndex + 1;
                }}
                value={item.value}
              >
                <input
                  type="text"
                  maxLength={item.value.length}
                  value={
                    isStudentAnswerResponse
                      ? item[student_answer]
                      : state[`${index}${i}`]
                      ? state[`${index}${i}`]
                      : ""
                  }
                  onChange={(e) => {
                    handleChange(e, index, i, item);
                  }}
                  disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                  style={{ width: "auto", minHeight: 35, minWidth: 35 }}
                  size={item?.stringLength || 1}
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
