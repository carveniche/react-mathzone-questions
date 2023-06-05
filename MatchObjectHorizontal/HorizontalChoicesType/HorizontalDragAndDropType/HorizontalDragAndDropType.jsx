import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css"
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
export default function HorizontalDragAndDropType({
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
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
  const [handleDrag,handleDragStart]=useScrollBar()
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
    for(let item of dragState){
      if(!item?.show){
        item.show=true
        item.val=value
        break
      }
    }
    dropState[row][col].show = false;
    setDropState([ ...dropState] );
    setDragState([...dragState])
    
  };
  inputRef.current=dropState
  const heightRef=useRef([])
  const [currentHeight,setCurrentHeight]=useState(0)
  const [currentWidth,setCurrentWidth]=useState(0)
  useEffect(()=>{
if(currentHeight==0){
  
      let divHeight=[]
      let divWidth=[]
let n=heightRef?.current?.length||0
for(let i=0;i<n;i++)
{
divHeight.push(heightRef?.current[i]?.offsetHeight)
divWidth.push(heightRef?.current[i]?.offsetWidth)
}
let maxHeight=Math.max(...divHeight)
let maxWidth=Math.max(...divWidth)
setCurrentWidth(maxWidth)
setCurrentHeight(maxHeight)
}  },[currentHeight])
  return (
    <>
      {dropState?.map((items, index) => (
        <div key={index} className={styles.MatchObjectHorizontalTypeDragDropFlexBox}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
             <div className={styles.MatchObjectHorizontalTypeDragDropFlexBox3} style={{
              width:`calc((100% - ${(items.length-1)*2}rem) / ${items.length})`
             }}>
              <div>{HtmlParser(item?.imgvalue)}</div>
              <div><b><HtmlParserComponent value={item?.numvalue} /></b></div>
             </div>
            ) : (
            
              <div className={styles.MatchObjectHorizontalTypeDragDropFlexBox3}style={{
                width:`calc((100% - ${(items.length-1)*2}rem) / ${items.length})`
              }}>
                <div>{HtmlParser(item.imgvalue)}</div>
               <div>
               <div
                bgColor={item.show}
                className={`droppablehfu ${styles.MatchObjectHorizontalTypeDragDropBox}`}
                style={{border:`${(item.show||isStudentAnswerResponse)?0:1}px dashed black`}}
                id={`${index} ${i}`}
                value={item.value}
                key={i}
                
              >
                {(item.show||isStudentAnswerResponse) && (
                  <Draggable onStop={(e) => handleStop2(e, index, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                    <div style={
                  {
                    backgroundColor:`${(item.show||isStudentAnswerResponse)?'indigo':'initial'}`
                  }
                }>{<HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item?.dropVal} />}</div>
                  </Draggable>
                )}
              </div>
               </div>
              
              </div>
            )
          )}
        </div>
      ))}
      <div className={styles.questionName} style={{marginTop:"1rem"}}>Drag and Drop the answers.</div>
      <div className={styles.MatchObjectHorizontalTypeDragDropFlexBox2}>
        {dragState?.map((items, i) => (
          <div id={`${i}`} className={`draggablehfu ${styles.MatchObjectHorizontalTypeDragDropBox}`} bgColor={items.show} ref={(el)=>heightRef.current[i]=el}
          style={{border:`${items.show?0:1}px dashed black`}}
          
          >
            {items.show && (
              <Draggable onStop={(e) => handleStop1(e, i)} disabled={hasAnswerSubmitted||isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                <div style={
                  {
                    backgroundColor:`${items.show?'indigo':'initial'}`
                  }
                }><HtmlParserComponent value={items?.val} /></div>
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
gap:2rem;
flex-wrap:wrap;
 
`;

