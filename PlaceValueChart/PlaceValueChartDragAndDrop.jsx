import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser";
import numberSystemConverter from "../../CommonJSFiles/numberSystemConverter";
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
      const val = elem?.getAttribute("id")?.split(" ").map(Number);
      if (!checkState[val].show) return val;
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
  targetIndex,
  sourceIndex
) => {
  targetState[targetIndex].dropVal = sourceState[sourceIndex].value;
  targetState[targetIndex].show = true;
  updateTargetState([...targetState]);
  sourceState[sourceIndex].show = false;
  updateSourceState([...sourceState]);
};
export default function PlaceValueChartDragAndDrop({
  state,
  totalRows,
  totalColumns,
  dropRef,
  isAnswerSubmitted,
  numberSystem,
}) {
  const [numbers, setNumbers] = useState([]);
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const currentIndex = useRef(-1);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [xyPosition, setXyPosition] = useState([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const [handleDrag,handleDragStart]=useScrollBar()
  totalColumns = Number(totalColumns) || 1;
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      state?.questionContent[i]?.map((item, j) => {
        item.row == i &&
          item.col == j &&
          rows.push({ ...item, show: false, dropVal: "" });
      });
      
    }
    let n = Number(totalColumns) || 0;
      let temp2 = numberSystemConverter(n,numberSystem,String(state?.chartType).trim()?.toLowerCase());
      

      setNumbers([...temp2]);
    let temp = [];
    state.choices.map((item) => temp.push({ value: item, show: true }));
    setDragState([...temp]);
    setDropState([...rows]);
  }, []);
  const handleStop2 = (e, i) => {
    
    dropState[i].show=false
    let value=dropState[i].dropVal
    dropState[i].dropVal=""
    for(let i=0;i<dragState.length;i++){
      if(!dragState[i].show){
        dragState[i].value=value
        dragState[i].show=true
        break
      }
    }
    setDropState([...dropState]);
    setDragState([...dragState])
  };

  const handleStop1 = (e, i) => {
  
    let [x,y]=dragdropPointCordinate(e)
    setIsDragActive(true);
    let temp = [...dragState];
    let position = [x, y];
    setXyPosition([...position]);
    setDragState([]);
    currentIndex.current = i;
    dragState[i].show = true;
    setDragState([...temp]);
  };
  useEffect(() => {
    if (xyPosition.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppablePlaceValue", xyPosition, dropState);
        if (val !== false) {
          updateState(
            dropState,
            dragState,
            setDropState,
            setDragState,
            val,
            currentIndex.current
          );
        }
        setXyPosition([]);
        currentIndex.current = -1;
        setIsDragActive(false);
        clearTimeout(id);
      }, 0);
    } else if (xyPosition.length > 0 && isDropActive) {
      let id = setTimeout(() => {
        let val = elementFinds("draggablePlvc", xyPosition, dragState);
        if (val !== false) {
          updateState(
            dragState,
            dropState,
            setDragState,
            setDropState,
            val,
            currentIndex.current
          );
        }
        setXyPosition([]);
        currentIndex.current = -1;
        setIsDropActive(false);
        clearTimeout(id);
      }, 0);
    }
  }, [currentIndex.current]);
  dropRef.current = dropState;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <div
          totalCols={Number(totalColumns)}
          className={styles.PlaceValueChartDragDropGrid}
          style={{
            gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
            overflow:"auto"
          }}
        >
          {numbers?.map((item, i) => (
            <div
              className={`${(i + 1) % totalColumns == 0 && styles.rightBorder}`}
            >
              <div>
                <b><HtmlParserComponent value={item}/></b>
              </div>
            </div>
          ))}
          {dropState?.map((items, index) =>
            items?.isMissed == "false" ? (
              <div
                key={index}
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
              >
                <div><HtmlParserComponent value={items?.value} /></div>
              </div>
            ) : (
              <div
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
              >
                <div
                  key={index}
                  className={`droppablePlaceValue ${styles.PlaceValueChartDragDropBox}`}
                  id={index}
                  bgColor={items?.show||isStudentAnswerResponse}
                  style={{
                    border: `${(items?.show||isStudentAnswerResponse) ? 0 : "1"}px dashed indigo`,
                  }}
                >
                  {(items?.show||isStudentAnswerResponse) && (
                    <Draggable
                      onStop={(e) => handleStop2(e, index)}
                      disabled={isAnswerSubmitted||isStudentAnswerResponse}
                      style={{cursor:'move'}}
                      onDrag={handleDrag} onStart={handleDragStart}
                    >
                      
                      <div   style={{cursor:'move'}}>{isStudentAnswerResponse?<HtmlParserComponent value={items[student_answer]}/>:<HtmlParserComponent value={items?.dropVal}/>}</div>
                    </Draggable>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className={styles.questionName} style={{marginTop:"1rem"}}>Drag and Drop the answers.</div>
        <div className={styles.PlaceValueChartDragDropFlexBox2}>
          {dragState?.map((item, i) => (
       
              <div
                className="draggablePlvc"
                style={{ border: `${item?.show ? 0 : 1}px solid indigo`,cursor:'move' }}
                id={i}
              
              >
                
                {item?.show && (
                 
                 <Draggable
                 onStop={(e) => handleStop1(e, i)}
                 disabled={isAnswerSubmitted||isStudentAnswerResponse}
                 style={{cursor:'move'}}
                 onDrag={handleDrag} onStart={handleDragStart}
               >  
                 <div
                    style={{ cursor: "move", background: "indigo" }}
                    id={i}

                  >
                    <HtmlParserComponent value={item?.value} />
                  </div>
                  </Draggable>
                )}
              </div>
          
          ))}
        </div>
      </div>
    </div>
  );
}

;


