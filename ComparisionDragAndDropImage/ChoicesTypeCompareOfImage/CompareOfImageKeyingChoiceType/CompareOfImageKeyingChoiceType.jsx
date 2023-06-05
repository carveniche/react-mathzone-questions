import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export default function CompareOfImageKeyingChoiceType({
  content,
  totalRows,
  dropRef,
  totalCols,
}) {
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
  }, []);
  const { hasAnswerSubmitted,isStudentAnswerResponse } = useContext(ValidationContext);
  dropRef.current = [...rows];
  const handleChange = (e, row, col) => {
    if (hasAnswerSubmitted) return;
    rows[row][col].dropValue = e.target.value;
    if (rows[row][col].dropValue == "") rows[row][col].show = false;
    else rows[row][col].show = true;
    setRows([...rows]);
  };
  const InlineCss = {
    FlexBox2: {
      display: "flex",
      flexDirection: "row",
      margin: "2rem 0.2rem",
      gap: "4rem",
      alignItems: "center",
    },
    InsideDiv: {
      width: `Calc((100% - ${totalCols}*2rem) / ${totalCols})`,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    Input: {
      height: "50px",
      width: "100px",
      wordBreak: "break-all",
      textAlign: "center",
    },
  };

  return (
    <div>
      <div>
        {rows?.map((items, i) => (
          <div key={i} totalRows={totalCols} style={InlineCss.FlexBox2}>
            {items?.map((item, index) =>
              item.isMissed == "false" ? (
                <div style={InlineCss.InsideDiv}>{HtmlParser(item.value)}</div>
              ) : (
                <div style={InlineCss.InsideDiv}>
                
                  <input
                  
                    value={isStudentAnswerResponse?item[student_answer]:item?.dropValue}
                    onChange={(e) => handleChange(e, i, index)}
                    disabled={hasAnswerSubmitted||isStudentAnswerResponse}
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
