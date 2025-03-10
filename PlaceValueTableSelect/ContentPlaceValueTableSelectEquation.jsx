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
import parse from "html-react-parser";
import {
  VirtualKeyboard,
  mathQuilEditorChecker,
  optionSelectStaticMathField,
} from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { EditableMathField, StaticMathField } from "../../ExternalPackages";

export default function ContentPlaceValueTableSelectEquation({
  inputRefs,
  content,
  inputRef,
  totalEmptyBox,
  hasAnswerSubmitted,
  questionHead,
  totalCols,
  input2Ref,
  equationKeyingRef,
}) {
  const ref = useRef([]);
  let [inputState, setInputState] = useState({});
  const [equationObj, setEquationObj] = useState({});
  const [currentVirtualKeyBoard, setCurrentVirtualKeyBoard] = useState(-1);
  const currentBoxRef = useRef([]);
  const currentElement = useRef([]);

  const temp = new Array(Number(content.length) || 1).fill(0);
  let array = temp.map((item) => {
    item = [];
    let temp2 = new Array(totalCols).fill(0);
    //console.log('this is temp2',temp2);
    item.push(temp2);
    return item;
  });

  const inputBoxRef = useRef([...array]);
  inputRefs.current = inputBoxRef.current;
  let [rowsData, setRowsData] = useState([]);
  const size = useRef({});
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const [row, setRow] = useState([]);
  const [isFrac, setisFrac] = useState(false);
  useEffect(() => {
    let arr = content?.map((row) =>
      row?.map((cols) => {
        if (cols?.value?.includes("\\frac") && !isFrac) setisFrac(true);
        let item = { ...cols, [student_answer]: "" };
        return item;
      })
    );
    // content?.map((item) => {
    //   if (item?.value?.includes("\\frac") && !isFrac) setisFrac(true);
    //   item.row == i && temp.push(item);
    // });

    setRowsData([...arr]);
    setRow([...arr]);
  }, []);

  const ref1 = useRef({});

  const [state, setState] = useState({});

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

  const handleChange = (value, rows, cols, status = false) => {
    var negativeFraction;
    const numeDenomArrE = [...value.matchAll(/\{([^}]*)\}/g)].map(
      (match) => match[1]
    );
    var IntegerPartVal2 = value?.split("\\")[0];
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
      value = negativeFraction;
    console.log("E", value);
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    if (status && currentVirtualKeyBoard > -1) setCurrentVirtualKeyBoard(-1);

    row[rows][cols].stringLength = value.length > 1 ? value.length : 1;
    setRow([...row]);

    //let str = "" + rows + cols;
    let str = "" + rows + "row" + cols + "col";
    inputState = { ...inputState, [str]: value };
    if (!status) {
      setEquationObj({ ...equationObj, [str]: value });
    }

    setInputState({ ...inputState });
  };

  let currentIndex = 0;
  input2Ref.current = [...rowsData];

  inputRef.current = { ...inputState };
  equationKeyingRef.current = { ...equationObj };

  return (
    <div style={GridPlaceValueTable}>
      <div
        className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox}
        style={HeaderRowPlaceValueTable}
      >
        {questionHead?.map((item, i) => (
          <div key={i}>
            {JSON.stringify(item?.value).includes("mq-selectable") ? (
              parse(item?.value, optionSelectStaticMathField)
            ) : (
              <HtmlParserComponent value={item?.value} />
            )}
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
                {JSON.stringify(item?.value).includes("mq-selectable") ? (
                  parse(item?.value, optionSelectStaticMathField)
                ) : (
                  <HtmlParserComponent value={item?.value} />
                )}
              </div>
            ) : (
              <div
                key={i}
                ref={(el) => (inputBoxRef.current[index][i] = el)}
                value={item.value}
              >
                {mathQuilEditorChecker(item?.value) ? (
                  <input
                    type="text"
                    value={
                      isStudentAnswerResponse
                        ? item[student_answer]
                        : inputState[`${index}row${i}col`]
                        ? inputState[`${index}row${i}col`]
                        : ""
                    }
                    onChange={(e) => {
                      handleChange(e.target.value, item.row, item.col, true);
                    }}
                    readOnly={hasAnswerSubmitted || isStudentAnswerResponse}
                    style={{ width: "auto", minHeight: 35, minWidth: 35 }}
                    size={item?.stringLength || 1}
                  />
                ) : !hasAnswerSubmitted && !isStudentAnswerResponse ? (
                  <EditableMathField
                    latex={item?.student_answer ?? ""}
                    style={{
                      minWidth: 35,
                      minHeight: 35,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      width: "auto",
                      height: "auto",
                      outline: 0,
                      "&focus": {
                        border: 0,
                        boxShadow: 0,
                      },
                    }}
                    onFocus={() =>
                      handleFocus(index, i, false, item.row, item.col)
                    }
                    ref={(el) => (ref1.current[`${index}${i}`] = el)}
                    onChange={(e) =>
                      handleChange(e.latex(), item.row, item.col, false)
                    }
                  />
                ) : (
                  <div
                    style={{
                      minWidth: 35,
                      minHeight: 35,
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      width: "auto",
                    }}
                  >
                    {isStudentAnswerResponse ? (
                      parse(item[student_answer], optionSelectStaticMathField)
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
            )
          )}
        </div>
      ))}
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
            inputState={{}}
            setInputState={() => {}}
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
