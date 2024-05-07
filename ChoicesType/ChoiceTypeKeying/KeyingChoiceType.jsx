import React, { useContext, useEffect, useState,useRef } from "react";
import styled from "styled-components";
import HtmlParserComponent from "../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../OnlineQuiz.module.css";
export default function VerticalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols) => {
    row[rows][cols].dropVal = e.target.value;
    row[rows][cols].stringLength =
      e.target.value.length > 5 ? e.target.value.length : 5;
    if (e.target.value === "" && e.target.value === undefined)
      row[rows][cols].show = false;
    else row[rows][cols].show = true;
    setRow([...row]);
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        if (item.row == i) {
          temp.push({ ...item, dropVal: "" });
        }
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);
  inputRef.current = [...row];
 
  return (
  <table className={`${styles.HorizontalPictureKeyingFlexBox} mathzone-color-indigo`} style={{ gap: 5 }}>
    <tbody>
      {row?.map((items, index) => (
        <tr key={index}>
          {items?.map((item, i) => (
       <td key={i} style={{ textAlign: 'center', padding: '2px 5px' }}>
              {item.isMissed === "false" ? (
                <Box>
                  <HtmlParserComponent value={item?.value} />
                </Box>
              ) : (
                <div value={item.value}>
                <input
                  style={InlineCss.Input}
                  value={isStudentAnswerResponse ? item[student_answer] : row[index][i]?.dropVal}
                  onChange={(e) => {
                    if (isStudentAnswerResponse) return;
                    handleChange(e, index, i);
                  }}
                  disabled={hasAnswerSubmitted}
                  size={item?.stringLength || 5}
                />
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

}

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Box = styled.div`
  overflow-wrap: anywhere;
`;
const InlineCss = {
  Input: {
    height: "40px",
    textAlign: "center",
    minWidth: "50px",
  },
};
