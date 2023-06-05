import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ParserComponent from "../../../../CommonJSFiles/ParserComponent";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import { mathQuilEditorChecker, optionSelectStaticMathField, VirtualKeyboard } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { EditableMathField, StaticMathField } from "../../../../ExternalPackages";
export default function HorizontalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  totalCols,
  hasAnswerSubmitted,
  equationKeyingRef
}) {
  const [row, setRow] = useState([]);
  const [currentVirtualKeyBoard, setCurrentVirtualKeyBoard] = useState(-1);
  const currentBoxRef = useRef([]);
  const currentElement = useRef([]);
  const [equationObj,setEquationObj]=useState({})
  let [inputState, setInputState] = useState({});
  const ref = useRef([]);
  const ref1 = useRef({});
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols, status = false) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    if (status && currentVirtualKeyBoard > -1) setCurrentVirtualKeyBoard(-1);
    let str = "" + rows + "row" + cols + "col";
    inputState = { ...inputState, [str]: e };
    if(!status)
    {
      setEquationObj({...equationObj,[str]:e})
    }
    setInputState({ ...inputState });
  };
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
  const temp = new Array(Number(totalRows) || 1).fill(0);
  
  inputRef.current = { ...inputState };
  
  let array = temp.map((item) => {
    item = [];
    let temp2 = new Array(totalCols).fill(0);
    item.push(temp2);
    return item;
  });
  
  const inputBoxRef = useRef([...array]);
  equationKeyingRef.current={...equationObj}
  return row?.map((items, index) => (
    <div key={index} className={styles.MatchObjectHorizontalTypeKeyingFlexBox}>
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <div className={styles.MatchObjectHorizontalTypeKeyingFlexBox3}  style={{
              width:`calc((100% - ${(items.length-1)*2}rem) / ${items.length})`
             }} key={i}>
            <div>{parse(item?.imgvalue,optionSelectStaticMathField)}</div>
            <div>
              <b>
                <ParserComponent value={item?.numvalue} />
              </b>
            </div>
          </div>
        ) : (
          <div key={i} className={styles.MatchObjectHorizontalTypeKeyingFlexBox3}  style={{
              width:`calc((100% - ${(items.length-1)*2}rem) / ${items.length})`
             }}>
            <div>{parse(item.imgvalue,optionSelectStaticMathField)}</div>
            <div>
              <div ref={(el) => (inputBoxRef.current[index][i] = el)}>
                {mathQuilEditorChecker(item?.numvalue) ?
                  <input
                  readOnly={hasAnswerSubmitted||isStudentAnswerResponse}
                    style={InlineCss.Input}
                    value={isStudentAnswerResponse?item[student_answer]:inputState[`${item.row}row${item.col}col`]}
                    onChange={(e) => {
                      handleChange(e.target.value, item.row, item.col, true);
                    }}
                    onFocus={() => handleFocus(index, i, true)}
                  />:  (hasAnswerSubmitted||isStudentAnswerResponse) ? (
                    <div style={{minWidth:80,minHeight:50,border:"1px solid black",display:'flex',width:'auto',height:'auto',justifyContent:'center',alignItems:"center",borderRadius:5}}>{ isStudentAnswerResponse?parse(item[student_answer],optionSelectStaticMathField): <StaticMathField>{inputState[`${item.row}row${item.col}col`] ? inputState[`${item.row}row${item.col}col`] : ""}</StaticMathField>}</div>):<EditableMathField
                  latex={
                    inputState[`${item.row}row${item.col}col`]
                      ? inputState[`${item.row}row${item.col}col`]
                      : ""
                  }
                  style={{
                    minWidth: "80px",
                    width:"auto",
                    minHeight: "50px",
                    height:"auto",
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
                }
              </div>
            </div>
          </div>
        )
      )}
        {currentVirtualKeyBoard > -1 &&
        currentBoxRef.current.length > 1 &&
        !hasAnswerSubmitted && (
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
    width: "180px",
  },
};
