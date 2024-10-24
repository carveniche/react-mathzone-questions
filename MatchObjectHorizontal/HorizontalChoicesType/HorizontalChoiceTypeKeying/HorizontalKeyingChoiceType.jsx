import React, { useContext, useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
export default function HorizontalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  totalEmptyBox,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols, item) => {
    const hasLetter = /[a-zA-Z]/.test(item);
    const hasNumber = /\d/.test(item);
    var inpValue;
    inpValue = e.target.value;
    const studAnsHasLetter = /[a-zA-Z\s]/.test(inpValue);

    if (!hasLetter && studAnsHasLetter) return;

    if (!hasLetter && hasNumber && inpValue.length > item.length)
      inpValue = inpValue.slice(0, item.value.length);

    row[rows][cols].dropVal = inpValue;
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
    <div
      key={index}
      style={{ gridGap: 0 }}
      className={styles.MatchObjectHorizontalTypeKeyingFlexBox}
    >
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <div
            className={styles.MatchObjectHorizontalTypeKeyingFlexBox3}
            style={{
              width: `calc((100% - ${(items.length - 1) * 2}rem) / ${
                items.length
              })`,
            }}
          >
            <div>{HtmlParser(item?.imgvalue)}</div>
            <div>
              <b>
                <HtmlParserComponent value={item?.numvalue} />
              </b>
            </div>
          </div>
        ) : (
          <div
            className={styles.MatchObjectHorizontalTypeKeyingFlexBox3}
            style={{
              width: `calc((100% - ${(items.length - 1) * 2}rem) / ${
                items.length
              })`,
            }}
          >
            <div>{HtmlParser(item.imgvalue)}</div>
            <div>
              <div>
                {
                  <input
                    style={InlineCss.Input}
                    value={
                      isStudentAnswerResponse
                        ? item[student_answer]
                        : row[index][i]?.dropVal
                    }
                    maxLength={item.numvalue.length}
                    onChange={(e) => {
                      handleChange(e, index, i, item.numvalue);
                    }}
                    disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                  />
                }
              </div>
            </div>
          </div>
        )
      )}
    </div>
  ));
}

export const FlexBox = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "100%",
  },
};
