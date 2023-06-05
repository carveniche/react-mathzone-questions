import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate"
const elementFinds = (target, xyAxis, checkState) => {
  if (xyAxis[0] == undefined) return false;

  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const val = elem?.getAttribute("id")?.split(" ").map(Number);
      if (checkState[val[0]][val[1]]?.show === false) {
        return val;
      }
      // if (!checkState[val].show) return val;
    }
    elem = elem.parentNode;
  }

  return false;
};
const elementFinds2 = (target, xyAxis) => {
  if (xyAxis[0] == undefined) return false;

  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);
  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      return true;
      // if (!checkState[val].show) return val;
    }
    elem = elem.parentNode;
  }

  return true;
};
const updateState = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  targetIndex,
  sourceIndex
) => {
  targetState[targetIndex[0]][targetIndex[1]].dropVal =
    sourceState[sourceIndex].val;
  targetState[targetIndex[0]][targetIndex[1]].show = true;
  updateTargetState([...targetState]);
  sourceState[sourceIndex].show = false;
  sourceState = sourceState?.map((item, i) => {
    if(i === sourceIndex)
    return {...item,show:false}
    return {...item}
  });
  updateSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  sourceIndex
) => {

for(let item of targetState){
  if(!item.show&&item.val===sourceState[sourceIndex[0]][sourceIndex[1]]?.dropVal)
  {
    item.show=true
    break
  }
}
  

  updateTargetState([...targetState]);
  sourceState[sourceIndex[0]][[sourceIndex[1]]].show = false;
  sourceState[sourceIndex[0]][[sourceIndex[1]]].dropVal = "";
  updateSourceState([...sourceState]);
};
export default function VerticalDragDrop({
  content,
  totalRows,
  totalCols,
 
  totalEmptyBox,
  inputRef,
  choices,
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  let [choiceState, setChoicesState] = useState([]);
  const [dropState, setDropState] = useState([]);
  const {hasAnswerSubmitted}=useContext(ValidationContext)
  const [handleDrag,handleDragStart]=useScrollBar()
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { val: item, show: true };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
    let temp = [...content];
    temp = temp.map((item) => {
      let arr = item?.map((items) => {
        let obj = { ...items, dropVal: "", show: false };
        return { ...obj };
      });
      return arr;
    });
    setDropState([...temp]);
  }, []);
  const currentDragIndex = useRef(-1);
  const [position, setPosition] = useState([]);
  inputRef.current = choiceState;
  const handleMouseStop1 = (e, i) => { 
    setIsDragActive(true);
    let [x,y]=dragdropPointCordinate(e)
    let mouseX = x;
    let mouseY = y;
    choiceState[i].show = false;
    setChoicesState([...choiceState]);
    currentDragIndex.current = i;
    choiceState[i].show = true;
    setChoicesState([...choiceState]);
    let position = [mouseX, mouseY];
    setPosition([...position]);
  };
const {isStudentAnswerResponse}=useContext(ValidationContext)
  const currentDropIndex = useRef([-1, -1]);
  const handleMouseStop2 = (e, row, col) => {
    setIsDropActive(true);
    let [x,y]=dragdropPointCordinate(e)
    let position = [x, y];
    dropState[row][col].show = false;
    setDropState([...dropState]);
    dropState[row][col].show = true;
    currentDropIndex.current = [row, col];
    setDropState([...dropState]);
    setPosition([...position]);
  };
  useEffect(() => {
    if (isDropActive && position?.length > 1) {
      let id = setTimeout(() => {
        let val = elementFinds2("verticalDrop", position);
        if (val) {
          updateState2(
            [...choiceState],
            [...dropState],
            setChoicesState,
            setDropState,
            [...currentDropIndex.current]
          );
        }
        setIsDropActive(false);
        currentDropIndex.current = [];
        setPosition([]);
        clearTimeout(id);
      }, 0);
    }
  }, [position.length]);
  useEffect(() => {
    if (position.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("verticalDrop", position, dropState);
        if (val) {
          updateState(
            dropState,
            choiceState,
            setDropState,
            setChoicesState,
            val,
            currentDragIndex.current
          );
        }
        setPosition([]);

        currentDragIndex.current = -1;
        setIsDragActive(false);
        clearTimeout(id);
      }, 0);
    }
  }, [position.length]);
  inputRef.current=[...dropState]
  return (
    <div>
      <div style={{ marginTop: "4rem" }}>
        {dropState?.map((items, index) => (
          <div
            className={styles.VerticalDragDropFlexBox}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              borderBottom: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 80}px`,
              maxWidth:'fit-content'
            }}
            key={index}
            border={index === totalRows - 1 && "2px"}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                 <HtmlParserComponent value={item?.value}/>
                </div>
              ) : isStudentAnswerResponse||item?.show ? (
                <Draggable onStop={(e) => {
                  if(isStudentAnswerResponse)
                  return
                  handleMouseStop2(e, index, i)
                  }} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                  <div
                    style={{
                      backgroundColor: "indigo",
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "50%",
                    }}
                  >
                   
                   <HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item?.dropVal}/>
                  </div>
                </Draggable>
              ) : (
                <div
                  className={`${styles.verticalDropVal} verticalDropVal`}
                  style={{ border: "1px dashed black" }}
                  id={`${index} ${i}`}
                ></div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.questionName} style={{marginTop:"1rem"}}>Drag and Drop the answers.</div>
      <div className={styles.VerticalDragDropFlexBox2} id="verticalDragVal" style={{flexWrap:'wrap'}}>
        {choiceState?.map((value, i) =>
          value?.show ? (
            <Draggable onStop={(e) => {
              if(isStudentAnswerResponse)
              return
              handleMouseStop1(e, i)
              }} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
              <div style={{ backgroundColor: "indigo", cursor: "pointer" }}>
               <HtmlParserComponent value={value.val} />
              </div>
            </Draggable>
          ) : (
            <div id={`${i}`} style={{ border:'1px solid indigo' }}>{1}</div>
          )
        )}
      </div>
    </div>
  );
}
