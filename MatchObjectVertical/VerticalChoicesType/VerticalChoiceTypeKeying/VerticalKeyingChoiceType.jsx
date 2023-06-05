import React, { useContext, useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css"
export default function VerticalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  totalEmptyBox,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const handleChange = (e, rows, cols) => {
    row[rows][cols].dropVal = e.target.value;
    if (row[rows][cols].dropVal == "") {
      row[rows][cols].show = false;
    } else row[rows][cols].show = true;
    setRow([...row]);
  };

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        item.row == i && temp.push({ ...item, show: false, dropVal: "" });
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);
  inputRef.current = row;

  return row?.map((items, index) => (
    <div key={index} className={"mathzone-color-indigo"}>
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <div className={styles.MatchObjectVerticalKeyingFlexBox3}>
            <div>{HtmlParser(item?.imgvalue)}</div>
            <div><HtmlParserComponent value={item?.numvalue}/></div>
          </div>
        ) : (
          <div className={styles.MatchObjectVerticalKeyingFlexBox3}>
            <div>{HtmlParser(item.imgvalue)}</div>
            <div>
              <div>
                {
                  
                  <input style={StylesInline.Input}
                    value={isStudentAnswerResponse?item[student_answer]:row[index][i]?.dropVal}
                    onChange={(e) => {
                      if(isStudentAnswerResponse)
                      return
                      handleChange(e, index, i);
                    }}
                    disabled={hasAnswerSubmitted||isStudentAnswerResponse}
                  />
                }
              </div>
            </div>
          </div >
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

const StylesInline={
  Input:{height: "50px",
  textAlign: "center",
  width: "100px",
  }
}

