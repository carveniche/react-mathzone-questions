import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "../OnlineQuiz.module.css";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../CommonFunction/useScrollBar";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
const elementFinds = (target, xyAxis, checkState) => {
  if (xyAxis[0] == undefined) return false;

  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
     
      const [val1,val2] = elem?.getAttribute("id")?.split("-").map(Number);
      if(!isNaN(val1)&&!isNaN(val2))
      if (!checkState[val1][val2]?.show) return [val1,val2];
    }
    elem = elem.parentNode;
  }

  return false;
};
const elementFinds2= (target, xyAxis, checkState) => {
  if (xyAxis[0] == undefined) return false;

  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
     
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
  targetState[targetIndex[0]][targetIndex[1]].dropValue = sourceState[sourceIndex]?.value;

  targetState[targetIndex[0]][targetIndex[1]].show = true;

  updateTargetState([...targetState]);
  sourceState[sourceIndex].show = false;
  sourceState[sourceIndex].value=""
  updateSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,

  sourceIndex
) => {
 
  if(sourceIndex!=="")
  {
    
    let [row,col]=sourceIndex?.split('-')?.map(Number)
   
    if(isNaN(row)||isNaN(col))
    return
    for(let i=0;i<targetState.length;i++)
    {
    if(!targetState[i]?.show)
    {
     
      targetState[i].value=sourceState[row][col]?.dropValue
      targetState[i].show=true
      sourceState[row][col].dropValue=""
      sourceState[row][col].show=false
      return
    }
    }
 
  updateTargetState([...targetState])
  updateSourceState([...sourceState])
  }

};

export default function DropBoxes({
  content,
  totalRows,
  state,
  dropRef,
  isAnswerSubmitted,
  totalCols,
  inputRef
}) {
  let [rows, setRows] = useState([]);
  const dragRef = useRef([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag,handleDragStart]=useScrollBar()
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map(
        (item, ind) =>
          String(item.row) == String(i) &&
          temp.push({ ...item, show: false, dropValue: "" })
      );
      rows.push(temp);
    }
    let arr = [];
    state?.choices.map((item) => arr.push({ show: true, value: item.value }));
    setDragState(arr);
    setRows(rows);
  }, []);

  const currentIndex = useRef(-1);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [xyPosition, setXyPosition] = useState([]);
  const dropCurrentIndex=[]
  const handleStop1 = (e, i) => {
    let [x,y]=dragdropPointCordinate(e)
    setIsDragActive(true);
    let temp = [...dragState];
    let position = [x, y];
    setXyPosition([...position]);
    setDragState([]);
    currentIndex.current = i;
    temp[i].show = true;
    setDragState([...temp]);
  };

const[dropIndex,setDropIndex]=useState("")
  const handleStop2 = (e, row, col) => {
   
    let [x,y]=dragdropPointCordinate(e)

    setIsDropActive(true);
    let temp = [...rows];
    let position = [x, y];
    setXyPosition([...position]);
    setRows([]);
    temp[row][col].show = true;
    setRows([...temp]);
    setDropIndex(`${row}-${col}`)

  };
 useEffect(() => {

    if (xyPosition.length > 0) {
   
      if( isDragActive&&currentIndex.current>-1){
      let id = setTimeout(() => {
        let val = elementFinds("mainCompareDropBox", xyPosition, rows);
   if(val!==false){
    updateState(rows,dragState,setRows,setDragState,val,currentIndex?.current)
   }
        setXyPosition([]);
        currentIndex.current = -1;
        setIsDragActive(false);
        clearTimeout(id);
      }, 0);}
      
        
    } 
   
  }, [currentIndex.current,xyPosition.length]);
  
  useEffect(() => {
   
      if (xyPosition.length > 0) {
       
        if(isDropActive&&dropIndex!=""){
        
        let id = setTimeout(() => {
          let val = elementFinds2("mainCompareDropBox", xyPosition, rows);
         
     if(val===true){
    
   updateState2(dragState,rows,setDragState,setRows,dropIndex)
     }
     clearTimeout(id)
          setXyPosition([]);
          setIsDropActive(false)
          setDropIndex("")
        }, 0);}
        
         
      } 
     
       
   
  
  
    }, [dropIndex,xyPosition.length]);
  
inputRef.current=[...rows]
  return (
    <div id="1n">
      <div id="1n">
        {/* drop field */}
        {rows?.map((items, i) => (
          <div
            className={styles.CompareDragOperatorDragDropFlexBox2}
            key={i}
            totalCols={totalCols}
            id="1n"
          >
            {items?.map((item, index) =>
              item.isMissed !== "true" ? (
                <div
                  key={index}
                  ref={(el) => (dropRef.current[i][index] = el)}
                  name={item.isMissed}
                  id={`${i}-${index}`}
                  className={"falseDropBox"}
                >
                  <HtmlParserComponent value={item?.value} />
                </div>
              ) : (item?.show||isStudentAnswerResponse )? (
                  <Draggable onStop={(e) => handleStop2(e, i, index)} disabled={!isAnswerSubmitted||isStudentAnswerResponse}  onDrag={handleDrag} onStart={handleDragStart}>
                    <div
                      ref={(el) => (dropRef.current[i][index] = el)}
                      style={{
                        background: "indigo",
                        color: "white",
                        cursor: "pointer",
                      }}
                      value={item?.value}
                      name={item.isMissed}
                      key={index}
                      id={`${i}-${index}`}
                  
                      className={`mainCompareDropBox ${styles.DropBoxes}`}
                    >
                      <HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item?.dropValue} />
                    </div>
                  </Draggable>
                ) : (
                  <div
                    ref={(el) => (dropRef.current[i][index] = el)}
                    style={{ border: "1px dashed indigo" }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    className={`${styles.missedBox} mainCompareDropBox`}
                    id={`${i}-${index}`}

                  ></div>
                )
              
            )}
          </div>
        ))}
        <div className={styles.CompareDragOperatorDragDropFlexBox}>
          {/* drag field */}
          {state.choices.map((items, i) =>
            isAnswerSubmitted ? (
              dragState[i]?.show ? (
                <Draggable onStop={(e) => handleStop1(e, i)} disabled={isStudentAnswerResponse} onDrag={handleDrag} onStart={handleDragStart}>
                  <div
                    ref={(el) => (dragRef.current[i] = el)}
                    key={i}
                    className={styles.bgIndigo}
                    style={{ cursor: "pointer" }}
                    onTouchEnd={(e)=>handleStop1(e,i)}
                  >
                    {<HtmlParserComponent value={dragState[i]?.value} />}
                  </div>
                </Draggable>
              ) : (
                <div
                  ref={(el) => (dragRef.current[i] = el)}
                  key={i}
                
                ></div>
              )
            ) : dragState[i]?.show ? (
              <div
                ref={(el) => (dragRef.current[i] = el)}
                key={i}
                className={styles.bgIndigo}
              >
               <HtmlParserComponent value={dragState[i]?.value} />
              </div>
            ) : (
              <div ref={(el) => (dragRef.current[i] = el)} key={i}></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

