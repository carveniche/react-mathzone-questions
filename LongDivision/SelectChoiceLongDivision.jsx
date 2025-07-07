import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import {
  BottomBorder,
  RightPranthesis,
  TopBorder,
} from "./DragDropLongDivision";
import SelectChoiceCommon from "../../CommonJsxComponent/SelectChoiceCommon";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import getSelectChoiceMissedValue from "../../CommonJsxComponent/GetSelectChoiceMissedValue";
export default function LongDivisonSelectChoice({
  choices,
  inputRef,
  answerHasSelected,
  content,
  totalRows,
  studentAnswer
}) {
  const {setStudentAnswerChoice,setCurrectAnswer}=useContext(ValidationContext)
  const [row, setRow] = useState([]);
  let [choicesState, setChoicesState] = useState([]);
  let prev = useRef(0);
  useEffect(() => {
      const correctMissedAnswer=  getSelectChoiceMissedValue(content)
      setCurrectAnswer(correctMissedAnswer);

    let arr2 = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr2.push({ ...obj });
    });
    let arr = [];
    arr = Object.assign([], content);
    arr = arr.map((item) => {
      return item?.map((items) => {
        return { ...items, show: false };
      });
    });
    setRow([...arr]);
    setChoicesState([...arr2]);
  }, []);

  const handleChoiceSelection = (i) => {
    if (answerHasSelected) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
    setStudentAnswerChoice(choicesState[i]?.value);
  };
  inputRef.current = choicesState;
  const defaultBorderRef = useRef(3);
  return (
    <>
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
                    <td
                      key={i}
                      style={{
                        borderTop: `${
                          index == 1 && i !== 0 ? defaultBorderRef.current : 0
                        }px solid indigo`,
                      }}
                    >
                      <div>
                        <b>
                          {typeof item?.value == "string"
                            ? HtmlParser(item?.value)
                            : item?.value}
                        </b>
                      </div>
                      {index % 2 == 1 && (
                        <>
                          <TopBorder
                            width={i == 0 ? "8px" : "100%"}
                          ></TopBorder>
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
                    <td
                      key={i}
                      style={{
                        borderTop: `${
                          index == 1 && i !== 0 ? defaultBorderRef.current : 0
                        }px solid indigo`,
                      }}
                    >
                      <div>
                        {
                          <input
                            style={InlineCss.Input}
                            disabled={true}
                            value={"?"}
                          />
                        }
                      </div>
                      {index % 2 == 1 && (
                        <>
                          <TopBorder
                            width={i == 0 ? "8px" : "100%"}
                          ></TopBorder>
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
      <>

        <SelectChoiceCommon 
                choices={choicesState} 
                studentAnswer={studentAnswer} 
                handleChoiceSelection={handleChoiceSelection}
                />

        {/* {choicesState?.map((value, i) => (
          <div
            key={i}
            className={`${styles.flex} ${styles.choiceType} ${
              styles.selectChoicesFont
            } ${
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            onClick={() => handleChoiceSelection(i)}
          >
            <div className={`mathzone-circle-selectbox ${styles.circle}`}>
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div key={i}>{HtmlParser(value?.value)}</div>
          </div>
        ))} */}
      </>
    </>
  );
}
const InlineCss = {
  Input: {
    height: "30px",
    textAlign: "center",
    width: "15px",
  },
};
