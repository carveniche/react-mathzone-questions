import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
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
      
      const [val1,val2] = elem?.getAttribute("data-value")?.split(" ").map(Number);
      console.log(val1)
      if(!isNaN(val1)&&!isNaN(val2))
      if (!checkState[val1][val2]?.show) return [val1,val2];
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
  console.log(sourceState)
 setTimeout(()=>{
 
  targetState[targetIndex[0]][targetIndex[1]].dropValue = sourceState[sourceIndex]?.value;

  targetState[targetIndex[0]][targetIndex[1]].show = true;

  updateTargetState([...targetState]);
  sourceState[sourceIndex].show = false;
  sourceState[sourceIndex].value=""
  updateSourceState([...sourceState]);
 },0)
};
export default function DropBoxesImageCompare({
  content,
  totalRows,
  state,
  isAnswerSubmitted,
  dropRef,
  totalCols,
  inputRef
}) {
  let [rows, setRows] = useState([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  const [dragState, setDragState] = useState([]);
  const dragRef = useRef([]);
  const dragIndex = useRef(-1);
  const dropIndex = useRef([-1, -1]);
  const [dragActive, setDragActive] = useState(false);
  const [xyPosition, setXyposition] = useState([]);
  const [handleDrag,handleDragStart]=useScrollBar()
  const currentDrag = useRef(-1);
  useEffect(() => {
    let row = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map((items) =>
        items.map(
          (item) =>
            String(item.row) == String(i) &&
            temp.push({ ...item, show: false, dropValue: "" })
        )
      );
      row.push(temp);
    }
    setRows([...row]);
    let temp = [];
    state?.choices?.map((item) => temp.push({ value: item, show: true }));
    setDragState([...temp]);
  }, []);

  useEffect(() => {

    if (xyPosition.length > 0) {
   
      if( dragActive&&currentDrag.current>-1){
      let id = setTimeout(() => {
        let val = elementFinds("mainCompareDropBox", xyPosition, rows);

   if(val!==false){
    updateState(rows,dragState,setRows,setDragState,val,currentDrag?.current)
   }
        setXyposition([]);
        currentDrag.current = -1;
        setDragActive(false);
        clearTimeout(id);
      }, 0);}
      
        
    } 
   
  }, [currentDrag.current,xyPosition.length]);
  //handling drag to drop1
  const handleStop1 = (e, index) => {
   let i=index
    let [x,y]=dragdropPointCordinate(e)
    setDragActive(true);
    
    let temp = [...dragState];
    let position = [x, y];
    
    setXyposition([...position]);
    
    setDragState([]);
    currentDrag.current = index;
   
    temp[index].show = true;
    console.log('dkdkk')
    console.log('temp')
    setDragState([...temp]);
   
  };



  //handling drop to drag

  const handleStop2 = (e, row, col) => {
    let value=rows[row][col].dropValue
    rows[row][col] = { ...rows[row][col], show: false };
    for(let item of dragState){
      if(!item.show)
      {
        item.value=value
        item.show=true
        break;
      }
    }
    setDragState([...dragState])
    setRows([...rows]);
   
 
  };
  const InlineCss = {
    FlexBox2: {
      display: "flex",
      flexDirection: "row",
      margin: "2rem 0.2rem",
      gap: "4rem",
      alignItems: "center",
    },
    InsideDiv: {
      width: `Calc((100% - ${totalCols}*2rem) / ${totalCols})`,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    Input: {
      height: "50px",
      width: "100px",
      wordBreak: "break-all",
      textAlign: "center",
    },
  };
  inputRef.current=[...rows]
  return (
    <div>
      <div>
        {/* Droppable Part */}
        {rows?.map((items, i) => (
          <div key={i} totalRows={totalCols} className="comparisonOfImages">
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div
                  key={index}
                  ref={(el) => (dropRef.current[i][index] = el)}
                  name={item.isMissed}
                  style={InlineCss.InsideDiv}
                >
                  {HtmlParser(item.value)}
                </div>
              ) : (item?.show||isStudentAnswerResponse) ? (
                <div
                  ref={(el) => (dropRef.current[i][index] = el)}
                  key={index}
                  style={{ width: "auto", height: "auto",display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center" }}
                  name={item.value}
                
                >
                  <Draggable
                    disabled={!isAnswerSubmitted||isStudentAnswerResponse}
                    onStop={(e) => handleStop2(e, i, index)}
                    onDrag={handleDrag} onStart={handleDragStart}
                  >
                    <div
                      id="drop"
                      color="white"
                      style={{
                        background: "indigo",
                        width: "120px",
                        height: "50px",
                        maxWidth: "140px",
                        cursor: "pointer",
                        color:"white"
                      }}
                      className={styles.CompareOfImagesDragDropDragDropBoxes}
                    >
                      <HtmlParserComponent value={isStudentAnswerResponse?item[student_answer]:item?.dropValue}/>
                    </div>
                  </Draggable>
                </div>
              ) : (
                <div
                  key={index}
                  name={item.value}
                  id="drop"
                  style={{
                    border: "1px dashed indigo",
                    width: "120px",
                    height: "50px",
                    maxWidth: "140px",
                  }}
                  data-value={`${i} ${index}`}
                  ref={(el) => (dropRef.current[i][index] = el)}
               
                  className={`${styles.CompareOfImagesDragDropDragDropBoxes} mainCompareDropBox`}
                ></div>
              )
            )}
          </div>
        ))}

        {/* Draggable Part */}
        <div
          backgroundColor="indigo"
          color="white"
          border="1px solid indigo"
          contentWidth="140px"
          contentHeight="50px"
          className={styles.CompareOfImagesDragDropFlexBox}
        >
          {dragState?.map((items, i) =>
            items.show ? (
              <Draggable
                disabled={!isAnswerSubmitted||isStudentAnswerResponse}
                onStop={(e) => handleStop1(e, i)}
                onDrag={handleDrag} onStart={handleDragStart}
              >
                <div
                  style={{ cursor: "pointer", backgroundColor:`indigo`,
                  color:'white' }}
                  ref={(el) => (dragRef.current[i] = el)}
                  id="drag"
                  backgroundColor="indigo"
                  color="white"
                  className={styles.CompareOfImagesDragDropDragDropBoxes}
                >
                  <HtmlParserComponent value={items?.value} />
                </div>
              </Draggable>
            ) : (
              <div
                ref={(el) => (dragRef.current[i] = el)}
                id="drag"
                color="white"
                className={styles.CompareOfImagesDragDropDragDropBoxes}
                style={{
                    backgroundColor:`initial`,
                    color:'white',
                    border:"1px solid black"
                }}
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
