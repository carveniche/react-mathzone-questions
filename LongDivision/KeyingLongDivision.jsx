import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import {
  BottomBorder,
  RightPranthesis,
  TopBorder,
} from "./DragDropLongDivision";
export default function LongDivisionKeyingChoiceType({
  inputRef,
  content,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols) => {
    row[rows][cols].dropVal = e.target.value;
    if (row[rows][cols].dropVal == "") {
      row[rows][cols].show = false;
    } else row[rows][cols].show = true;
    setRow([...row]);
  };

  useEffect(() => {
    let arr = [];
    arr = Object.assign([], content);
    arr = arr.map((item) => {
      return item?.map((items) => {
        return { ...items, show: false };
      });
    });

    setRow([...arr]);
  }, []);
  inputRef.current = row;
  let defaultBorderRef = useRef(3);
  return (
    <div style={{ width: "fit-content" }}>
      <table
        style={{ borderCollapse: "collapse" }}
        className={styles.longDivisonTable}
      >
        <tbody>
          {row?.map((items, index) => (
            <tr key={index}>
              {items?.map((item, i) =>
                item.isMissed !== "true" ? (
                  <td key={i}>
                    <div>
                      <b>
                        <HtmlParserComponent value={item?.value} />
                      </b>
                    </div>
                    {index % 2 === 1 && (
                      <>
                        <TopBorder width={i == 0 ? "8px" : "100%"}></TopBorder>
                      </>
                    )}
                    {index == row.length - 1 && (
                      <BottomBorder
                        width={i == 0 ? "8px" : "100%"}
                      ></BottomBorder>
                    )}
                    {index == 1 && i == 0 && (
                      <>
                        <RightPranthesis>)</RightPranthesis>
                      </>
                    )}
                  </td>
                ) : (
                  <td key={i}>
                    <div>{HtmlParser(item.imgvalue)}</div>
                    <div>
                      <div>
                        {
                          <input
                            maxLength={1}
                            type={"text"}
                            style={InlineCss.Input}
                            value={
                              isStudentAnswerResponse
                                ? item[student_answer]
                                : row[index][i]?.dropVal
                            }
                            onChange={(e) => {
                              handleChange(e, index, i);
                            }}
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
                          />
                        }
                      </div>
                    </div>
                    {index % 2 == 1 && (
                      <>
                        <TopBorder width={i == 0 ? "8px" : "100%"}></TopBorder>
                      </>
                    )}
                    {index == row.length - 1 && (
                      <BottomBorder
                        width={i == 0 ? "8px" : "100%"}
                      ></BottomBorder>
                    )}
                    {index == 1 && i == 0 && (
                      <>
                        <RightPranthesis>)</RightPranthesis>
                      </>
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const InlineCss = {
  Input: {
    height: "30px",
    textAlign: "center",
    width: "18px",
  },
};
