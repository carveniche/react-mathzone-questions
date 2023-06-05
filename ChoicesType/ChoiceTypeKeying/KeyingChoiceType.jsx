import React, { useContext, useEffect, useState } from "react";
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
    row[rows][cols].stringLength=e.target.value.length>5?e.target.value.length:5
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
  return row?.map((items, index) => (
    <div className={`${styles.HorizontalPictureKeyingFlexBox} mathzone-color-indigo`} key={index} style={{gap:5}} >
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <Box key={i}>
            <HtmlParserComponent value={"ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddditem?.value"} />
          </Box>
        ) : (
          <div value={item.value} key={i}>
            <input
              style={InlineCss.Input}
              value={isStudentAnswerResponse?item[student_answer]:row[index][i]?.dropVal}
              onChange={(e) => {
                if (isStudentAnswerResponse) return;
                handleChange(e, index, i);
              }}
              disabled={hasAnswerSubmitted}
              size={item?.stringLength||5}
            />
          </div>
        )
      )}
    </div>
  ));
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
export const Box=styled.div`
overflow-wrap:anywhere;

`
const InlineCss = {
  Input: {
    height: "40px",
    textAlign: "center",
    minWidth: "50px",
  },
};
