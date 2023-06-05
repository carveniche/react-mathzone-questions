import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../HorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../../replaceDomeNode/ReplaceDomNode";
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
const elementFinds2 = (target, xyAxis,dragState) => {
  
  let elem = document?.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    
    if (elem?.className.includes(target)) {
      const index = Number(elem?.getAttribute("id"));
   
      if (!dragState[index].show) return index
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
  targetState[row][col].dropVal = sourceState[index].val;
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
  col,index
) => {
  // targetState.push(sourceState[row][col]?.val);
  targetState[index].val=sourceState[row][col].dropVal
  targetState[index].show=true
  sourceState[row][col].dropVal = "";
  sourceState[row][col].show = false;
   updateTargetState([...targetState]);
   updateSourceState([ ...sourceState ]);

};
export default function ContentHorizontalFillUpsEquationType({
  content,
  choices,
  inputRef,
  totalEmptyBox,
  totalRows,
}) {
  const {hasAnswerSubmitted,isStudentAnswerResponse}=useContext(ValidationContext)
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const currentDrag = useRef(-1);
  const [handleDrag,handleDragStart]=useScrollBar()
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
  useEffect(() => {
    let arr = [];


    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
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
    
  },[] );
  
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
  useEffect(() => {

    if (xyPosition.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppablehfu", xyPosition, dropState);
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
  
useEffect(()=>{
  
  if (xyPosition.length>0 && isDropActive) {
    let id = setTimeout(() => {
      let val=elementFinds2("draggablehfu", xyPosition,dragState)
      if (val!==false) {
       
        updateState2(
          dragState,
          dropState,
          setDragState,
          setDropState,
          currentDrop.current[0],
          currentDrop.current[1],val
        );
      }
      clearTimeout(id);
      currentDrop.current = [-1, -1];
      setXyPosition([]);
      setIsDropActive(false);
    }, 0);
  }
},[isDropActive,xyPosition.length])


  const handleStop2 = (e, row, col) => {
    dropState[row][col].show = false;
    let value= dropState[row][col].dropVal
    for(let item of dragState){
      if(!item.show){
        item.show=true
        item.val=value
        break;
      }
    }
 
    dropState[row][col].dropVal = "";
    setDropState([ ...dropState] );
    setDragState([...dragState])
  };
  inputRef.current=[...dropState]
  return (
    <>
      {dropState?.map((items, index) => (
        <div className={`${styles.HorizontalPictureDragDropFlexBox} mathzone-color-indigo`} key={index} style={{marginBottom:'1rem'}}>
          {items?.map((item, i) =>
            item.isMissed !== "true" ? (
              <div className="fontColor" style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>{parse(item.value,optionSelectStaticMathField)}</div>
            ) : (
            
              <div
               
                className={`droppablehfu ${styles.HorizontalPictureDragDropBox}`}
                id={`${index} ${i}`}
                value={item.value}
                key={i}
                style={
                  {
                    border:`${(item.show||isStudentAnswerResponse)?0:1}px dashed black`,minHeight:'60px'
                  }
                }
              >
                {(item?.show||isStudentAnswerResponse) && (
                  <Draggable onStop={(e) => handleStop2(e, index, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                    <div style={{
                      backgroundColor:`${(item?.show||isStudentAnswerResponse)?'indigo':'initial'}`

                    }}>{parse(isStudentAnswerResponse?item[student_answer]:item?.dropVal,optionSelectStaticMathField)}</div>
                  </Draggable>
                )}
              </div>
            )
          )}
        </div>
      ))}
      <div className={styles.questionName} style={{marginTop:"1rem"}}>Drag And Drop</div>
      <div className={styles.HorizontalPictureDragDropFlexBox2}>
        {dragState?.map((items, i) => (
          <div id={`${i}`} className={`draggablehfu ${styles.HorizontalPictureDragDropBox}`} style={{border:`${items?.show?0:1}px solid black`,minHeight:'60px'}}>
            {items.show && (
              <Draggable onStop={(e) => handleStop1(e, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                <div style={{
                      backgroundColor:`${items?.show?'indigo':'initial'}`
                    }}>{parse(items.val,optionSelectStaticMathField)}</div>
              </Draggable>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;
  margin-top:2rem;
  margin-bottom:2rem;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .fontColor{
    color:indigo;
    font-size:25px;
    font-weight:600;
    
  }
`;

