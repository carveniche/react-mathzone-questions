import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import styles from "../../HorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";
import {
  mathQuilEditorChecker,
  optionSelectStaticMathField,
  VirtualKeyboard,
} from "../../replaceDomeNode/ReplaceDomNode";
import {
  EditableMathField,
  StaticMathField,
} from "../../../../ExternalPackages";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export default function KeyingHorizontalFillUpsEquationType({
  inputRef,
  content,
  totalRows,
  totalEmptyBox,
  totalCols,
  equationKeyingRef,
}) {
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  let [inputState, setInputState] = useState({});
  const [equetionState, setEquationState] = useState({});
  const [currentVirtualKeyBoard, setCurrentVirtualKeyBoard] = useState(-1);
  const [isFrac, setisFrac] = useState(false);
  const currentBoxRef = useRef([]);
  const temp = new Array(Number(totalRows) || 1).fill(0);
  const ref = useRef([]);
  const currentElement = useRef([]);
  let array = temp.map((item) => {
    item = [];
    let temp2 = new Array(totalCols).fill(0);
    item.push(temp2);
    return item;
  });
  const inputBoxRef = useRef([...array]);
  const [row, setRow] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols, status = false) => {
    var negativeFraction;
    const numeDenomArrE = [...e.matchAll(/\{([^}]*)\}/g)].map(
      (match) => match[1]
    );
    var IntegerPartVal2 = e?.split("\\")[0];
    if (IntegerPartVal2 === "-")
      negativeFraction = `\\frac{-${numeDenomArrE[0] || ""}}{${
        numeDenomArrE[1] || ""
      }}`;

    if (
      IntegerPartVal2 === "-" &&
      numeDenomArrE[0] &&
      numeDenomArrE[1] &&
      numeDenomArrE[0].replaceAll(" ", "") &&
      numeDenomArrE[1].replaceAll(" ", "")
    )
      e = negativeFraction;
    console.log("E", e);
    // row[rows][cols].stringLength=e.length >5?e.length:5;
    row[rows][cols].stringLength = e.length > 1 ? e.length : 1;

    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    if (status && currentVirtualKeyBoard > -1) setCurrentVirtualKeyBoard(-1);

    let str = "" + rows + "row" + cols + "col";

    inputState = { ...inputState, [str]: e };
    if (!status) {
      setEquationState({ ...equetionState, [str]: e });
    }
    setInputState({ ...inputState });
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        if (item?.value?.includes("\\frac") && !isFrac) setisFrac(true);
        item.row == i && temp.push(item);
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);
  useEffect(() => {}, []);
  const ref1 = useRef({});
  const handleFocus = (row, col, status = false, elemRow, elemCol) => {
    if (hasAnswerSubmitted) return;
    if (status && currentVirtualKeyBoard > -1) {
      setCurrentVirtualKeyBoard(-1);
      currentBoxRef.current = [];
      currentElement.current = [];
      return;
    } else if (!status && currentVirtualKeyBoard != `${row}${col}`) {
      currentBoxRef.current = [row, col];
      currentElement.current = [elemRow, elemCol];
      setCurrentVirtualKeyBoard(-1);
      let id = setTimeout(() => {
        setCurrentVirtualKeyBoard(`${row}${col}`);
        clearTimeout(id);
      }, 0);

      return;
    }
  };

  equationKeyingRef.current = { ...equetionState };
  inputRef.current = { ...inputState };
  return (
    <div
      className={`${styles.HorizontalPictureKeyingFlexBox} mathzone-color-indigo`}
      style={{ gap: 2 }}
    >
      <table>
        <tbody>
          {row?.map((items, index) => (
            <tr key={index}>
              {items?.map((item, i) => (
                <td key={i} style={{ textAlign: "center", padding: "2px 5px" }}>
                  {item.isMissed !== "true" ? (
                    <div style={{ fontSize: 16, fontWeight: "bold" }}>
                      {parse(item.value, optionSelectStaticMathField)}
                    </div>
                  ) : (
                    <div ref={(el) => (inputBoxRef.current[index][i] = el)}>
                      {mathQuilEditorChecker(item?.value) ? (
                        <input
                          readOnly={hasAnswerSubmitted}
                          style={InlineCss.Input}
                          maxLength={item.value.length}
                          value={
                            isStudentAnswerResponse
                              ? item[student_answer]
                              : inputState[`${item.row}row${item.col}col`]
                          }
                          onChange={(e) => {
                            handleChange(
                              e.target.value,
                              item.row,
                              item.col,
                              true
                            );
                          }}
                          onFocus={() => handleFocus(index, i, true)}
                          size={item?.stringLength || 1}
                        />
                      ) : !hasAnswerSubmitted && !isStudentAnswerResponse ? (
                        <EditableMathField
                          latex={
                            inputState[`${item.row}row${item.col}col`]
                              ? inputState[`${item.row}row${item.col}col`]
                              : ""
                          }
                          style={{
                            minWidth: "35px",
                            width: "auto",
                            minHeight: "50px",
                            height: "auto",
                            textAlign: "center",
                            borderRadius: 5,
                            outline: 0,
                            "&focus": {
                              border: 0,
                              boxShadow: 0,
                            },
                          }}
                          onFocus={() =>
                            handleFocus(index, i, false, item.row, item.col)
                          }
                          onChange={(e) =>
                            handleChange(e.latex(), item.row, item.col, false)
                          }
                          ref={(el) => (ref1.current[`${index}${i}`] = el)}
                        />
                      ) : (
                        <div
                          style={{
                            minWidth: "35px",
                            minHeight: 50,
                            border: "1px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                            width: "auto",
                          }}
                        >
                          {isStudentAnswerResponse ? (
                            parse(
                              item[student_answer],
                              optionSelectStaticMathField
                            )
                          ) : (
                            <StaticMathField>
                              {inputState[`${item.row}row${item.col}col`]
                                ? inputState[`${item.row}row${item.col}col`]
                                : ""}
                            </StaticMathField>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {currentVirtualKeyBoard > -1 &&
        currentBoxRef.current.length > 1 &&
        !hasAnswerSubmitted &&
        !isFrac && (
          <VirtualKeyboard
            inputRef={
              inputBoxRef.current[currentBoxRef.current[0]][
                currentBoxRef.current[1]
              ]
            }
            reference={ref}
            setCurrentVirtualKeyBoard={setCurrentVirtualKeyBoard}
            currentBox={currentBoxRef}
            currentVirtualKeyBoard={currentVirtualKeyBoard}
            currentRow={currentElement.current[0]}
            currentCol={currentElement.current[1]}
            inputState={inputState}
            setInputState={setInputState}
            ref2={
              ref1.current[
                `${currentBoxRef.current[0]}${currentBoxRef.current[1]}`
              ]
            }
          />
        )}
    </div>
  );
}

export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    minWidth: "35px",
    borderRadius: 5,
    border: "1px solid gray",
  },
};
