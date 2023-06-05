import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import Draggable from "react-draggable";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { GridPlaceValueTable, HeaderRowPlaceValueTable } from "../PlaceValueTableSelectChoice/PlaceValueTableSelectChoice";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
const elementFinds = (target, xyAxis, dropState) => {
  if (xyAxis[0] == undefined) return false;
  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);
  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const [row, col] = elem?.getAttribute("id")?.split(" ").map(Number);
      if (!dropState[row][col].show) return elem?.getAttribute("id");
    }
    elem = elem.parentNode;
  }

  return false;
};
const elementFinds2 = (target, xyAxis, dragState) => {
  let elem = document?.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const index = Number(elem?.getAttribute("id"));

      if (!dragState[index].show) return index;
    }
    elem = elem.parentNode;
  }

  return false;
};
const updateState = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  index,
  row,
  col
) => {
  targetState[row][col].dropVal = sourceState[index]?.val?.value;
  targetState[row][col].show = true;


  updateTargetState([...targetState]);
  sourceState[index] = { ...sourceState[index], show: false };

  updateSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  row,
  col,
  index
) => {
  // targetState.push(sourceState[row][col]?.val);
  targetState[index].val.value = sourceState[row][col].dropVal;
  targetState[index].show = true;
  sourceState[row][col].dropVal = "";
  sourceState[row][col].show = false;
  updateTargetState([...targetState]);
  updateSourceState([...sourceState]);
};
export default function PlaceValueTableDragDrop({
  content,
  inputRef,
  totalEmptyBox,
  hasAnswerSubmitted,
  questionHead,
  totalCols,
  choices,
  totalRows,
}) {
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const currentDrag = useRef(-1);
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const [handleDrag,handleDragStart]=useScrollBar()
  useEffect(() => {
    let arr = [];
    let n = Number(totalRows) || 0;

    for (let i = 0; i < n; i++) {
      let temp = [];
      content[i]?.map((item) => {
        let obj = { ...item, show: false, dropVal: "" };
        item.row == i && temp.push(obj);
      });
      arr.push(temp);
    }
    let temp = [];
    choices?.map((item) => {
      let obj = { show: true, val: item };
      temp.push({ ...obj });
    });
    setDropState([...arr]);
    setDragState([...temp]);
  }, []);
  const handleStop1 = (e, i) => {
    setIsDragActive(true);
    let [x,y]=dragdropPointCordinate(e)
    let temp = [...dragState];
    let position = [x, y];
    setXyPosition([...position]);
    setDragState([]);
    currentDrag.current = i;
    setDragState([...temp]);
  };
  const handleStop2 = (e, row, col) => {
    dropState[row][col].show = false;
    let value=dropState[row][col].dropVal
    dropState[row][col].dropVal = '';
    for(let item of dragState){
      if(!item.show)
      {
          item.val.value=value
          item.show=true
        break
      }
    }
    console.log(dragState)
    setDropState([...dropState]);
    setDragState([...dragState]);
   
  };
  useEffect(() => {
    if (xyPosition.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppablepvt", xyPosition, dropState);
        if (val !== false) {
          const [row, col] = val.split(" ").map(Number);
          updateState(
            dropState,
            dragState,
            setDropState,
            setDragState,
            currentDrag.current,
            row,
            col
          );
        }
        clearTimeout(id);
        setXyPosition([]);
        setIsDragActive(false);
        currentDrag.current = -1;
      }, 0);
    }
  }, [xyPosition.length]);
  inputRef.current = dropState;
  useEffect(() => {
    if (xyPosition.length > 0 && isDropActive) {
      let id = setTimeout(() => {
        let val = elementFinds2("draggablepvt", xyPosition, dragState);
        if (val !== false) {
          updateState2(
            dragState,
            dropState,
            setDragState,
            setDropState,
            currentDrop.current[0],
            currentDrop.current[1],
            val
          );
        }
        clearTimeout(id);
        currentDrop.current = [-1, -1];
        setXyPosition([]);
        setIsDropActive(false);
      }, 0);
    }
  }, [isDropActive, xyPosition.length]);

  return (
    <>
      <div style={GridPlaceValueTable}>
        <div
          totalCols={totalCols}
          className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox}
          style={HeaderRowPlaceValueTable}
        >
          {questionHead?.map((item, i) => (
            <div
              key={i}
              style={{
                width: `Calc(100% / ${totalCols})`,
              }}
            >
             <HtmlParserComponent value={item?.value} />
            </div>
          ))}
        </div>
        {dropState?.map((items, index) => (
          <div
            key={index}
            totalCols={totalCols}
            className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox}
          >
            {items.map((item, i) =>
              item?.isMissed !== "true" ? (
                <div
                  key={i}
                  style={{
                    width: `Calc(100% / ${totalCols})`,
                  }}
                >
                 <HtmlParserComponent value={item?.value} />
                </div>
              ) : (
                <div
                  key={i}
                  value={item.value}
                  style={{
                    width: `Calc(100% / ${totalCols})`,
                  }}
                >
                  <div
                    id={`${index} ${i}`}
                    className={`droppablepvt ${styles.PlaceValueTableSelectFlexBoxDragDropTypeBox}`}
                    bgColor={item.show}
                    style={{
                      border:`${(item?.show||isStudentAnswerResponse)?0:1}px dashed black`
                    }}
                  >
                    {(item.show||isStudentAnswerResponse) && (
                      <Draggable
                        onStop={(e) => handleStop2(e, index, i)}
                        disabled={hasAnswerSubmitted||isStudentAnswerResponse}
                        onDrag={handleDrag} onStart={handleDragStart}
                      >
                        <div  style={{
                  backgroundColor:`${(item?.show||isStudentAnswerResponse) ? "indigo" : "initial"}`
                }}><HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item.dropVal} /></div>
                      </Draggable>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.PlaceValueTableSelectFlexBoxDragDropTypeFlexBox2}>
        {dragState?.map((items, i) => (
          <div id={`${i}`} className={`draggablepvt ${styles.PlaceValueTableSelectFlexBoxDragDropTypeBox}`} bgColor={items.show}
          style={{
            border:`${items?.show?0:1}px dashed black`
          }}
          >
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted||isStudentAnswerResponse}
                onDrag={handleDrag} onStart={handleDragStart}
              >
                <div style={{
                  backgroundColor:`${items?.show ? "indigo" : "initial"}`
                }}><HtmlParserComponent  value={items?.val?.value}/></div>
              </Draggable>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    min-height: 60px;
    width: Calc(100% / ${(props) => props.totalCols});
    height: auto;
    word-break: break-word;
  }
  * input {
    min-width: 80px;
    width: auto;
    min-height: 45px;
    word-break: break-word;
    text-align: center;
  }
`;
const Grid = styled.div`
  display: grid;
`;
const FlexBox2 = styled.div`
  display: flex;
  margin-top: 2rem;
 
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Box = styled.div`
  min-height: 50px;
  height: auto;
  width: auto;
  text-align: center;
  min-width: ${(props) => (!props.bgColor ? 96 : 80)}px;
  color: black;
  border: ${(props) => (props.bgColor ? "0" : "1")}px solid black;
  > div {
    background-color: ${(props) => (props.bgColor ? "indigo" : "initial")};
    min-width: inherit;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    padding: 1rem;
    width: inherit;
    height: inherit;
  }
`;
