import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../OnlineQuiz.module.css"
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { dragdropPointCordinate } from "../../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../../CommonFunction/useScrollBar";
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
  // console.log(targetState[row][col])

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
export default function DragAndDropType({
  content,
  choices,
  inputRef,
  totalEmptyBox,
  totalRows,
  choiceType
}) {
  const {hasAnswerSubmitted}=useContext(ValidationContext)
  let currentIndex = 0;
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag,handleDragStart]=useScrollBar()
  const [isDragActive, setIsDragActive] = useState(false);
  const currentDrag = useRef(-1);
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
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
        console.log(val,'vlaue')
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
    let value=dropState[row][col].dropVal
    dropState[row][col].dropVal=""
    dropState[row][col].show = false;
   for(let i=0;i<dragState.length;i++){
    console.log(dragState)
    if(!dragState[i].show){
      dragState[i].show=true
      dragState[i].val=value
      break;
    }
   }
    setDragState([...dragState])
    setDropState([ ...dropState] );
    
  };
  inputRef.current=dropState
  return (
    <>
     <table className="mathzone-color-indigo">
     {dropState?.map((items, index) => (
        <tr className={styles.HorizontalPictureDragDropFlexBox} key={index}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <td  style={{padding:choiceType?5:10}}><div className="fontColor"><HtmlParserComponent value={item?.value} /></div></td>
            ) : (
            
             <td style={{padding:choiceType?5:10}}>
               <div
               
               className={`droppablehfu ${styles.HorizontalPictureDragDropBox}`}
               id={`${index} ${i}`}
               value={item.value}
               key={i}
               style={
                 {
                   border:`${item?.show||isStudentAnswerResponse?0:1}px dashed black`
                 }
               }
             >
               {(isStudentAnswerResponse||item?.show) && (
                 <Draggable onStop={(e) => handleStop2(e, index, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                   <div style={{
                     backgroundColor:`${item?.show||isStudentAnswerResponse?'indigo':'initial'}`
                   }} ><HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item?.dropVal}/></div>
                 </Draggable>
               )}
             </div>
             </td>
            )
          )}
        </tr>
      ))}
     </table>
     <div className={styles.questionName} style={{marginTop:"1rem"}}>Drag and Drop the answers.</div>
      <div className={styles.HorizontalPictureDragDropFlexBox2}>
        {dragState?.map((items, i) => (
          <div id={`${i}`} className={`draggablehfu ${styles.HorizontalPictureDragDropBox}`} style={{border:`${items?.show?0:1}px solid indigo`}}>
            {items.show && (
              <Draggable onStop={(e) => handleStop1(e, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                <div style={{
                      backgroundColor:`${items?.show?'indigo':'initial'}`
                    }}><HtmlParserComponent value={items?.val}/></div>
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

