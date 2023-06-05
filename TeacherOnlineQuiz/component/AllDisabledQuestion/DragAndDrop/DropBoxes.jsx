import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
let currentDrag = -1
let rDrop = -1
let cDrop = -1
export default function DropBoxes({
  content,
  totalRows,
  state,
  dropRef,
  isAnswerSubmitted,
  totalCols
}) {
  let [rows, setRows] = useState([])
  const dragRef = useRef([])
  const [dragState, setDragState] = useState([])
  useEffect(() => {
    let rows = []
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map((item, ind) => String(item.row) == String(i) && temp.push({ ...item, show: false, dropValue: '' }));
      rows.push(temp);
    }
    let arr = []
    state?.choices.map((item) => arr.push({ show: true, value: item.value }))
    setDragState(arr)
    setRows(rows)
  }, [])


  const handleStop = (e, index) => {


    currentDrag = index
    dragState[index] = { ...dragState[index], show: false }
    setDragState([...dragState])
    dragState[index] = { ...dragState[index], show: true }
    setDragState([...dragState])
  }
  const handleMouseEnter = (e, row, col) => {

    if (currentDrag > -1 && !rows[row][col]?.show) {
      rows[row][col] = { ...rows[row][col], show: true, dropValue: dragState[currentDrag]?.value }
      setRows([...rows])
      dragState[currentDrag] = { ...dragState[currentDrag], show: false }
      setDragState([...dragState])
      currentDrag = -1
    }
  }
  useEffect(() => {
    let id = setTimeout(() => {
      currentDrag = -1
    }, 0);
    return () => clearTimeout(id)
  }, [currentDrag])

  useEffect(() => {
    let id = setTimeout(() => {
      cDrop = -1
      rDrop = -1
    }, 0);
    return () => clearTimeout(id)
  }, [rDrop])

  const handleStop2 = (e, row, col) => {

    rDrop = row
    cDrop = col
    rows[row][col] = { ...rows[row][col], show: false }
    setRows([...rows])
    rows[row][col] = { ...rows[row][col], show: true }
    setRows([...rows])
  }

  const handleMouseEnter2 = (e, index) => {


    if (rDrop > -1 && cDrop > -1 && !dragState[index]?.show) {
      dragState[index] = { ...dragState[index], show: true, value: rows[rDrop][cDrop].dropValue }


      rows[rDrop][cDrop] = { ...rows[rDrop][cDrop], show: false, dropValue: '' }
      let arr = dragState.map((item) => item)
      setDragState([...arr])
      setRows([...rows])
      rDrop = -1
      cDrop = -1
    }
  }

  return (
    <div >
      <div>
        {/* drop field */}
        {rows?.map((items, i) => (
          <FlexBox2 key={i} totalCols={totalCols}>
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div
                  key={index}
                  ref={(el) => (dropRef.current[i][index] = el)}
                  name={item.isMissed}
                  
                >
                  {typeof item.value=="string"?HtmlParser(item?.value):item?.value}
                </div>
              ) : isAnswerSubmitted ?
                (
                  item?.show ? 
                  <Draggable onStop={(e) => handleStop2(e, i, index)}>
                    <div
                    ref={(el) => (dropRef.current[i][index] = el)}
                    style={{ background: "indigo",color:"white",cursor:'pointer' }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    id="missedBox"

                  >
                     {typeof item?.dropValue=="string"?HtmlParser(item?.dropValue):item?.dropValue}
                      
                        
                     
                  </div> 
                  </Draggable>:
                    <div
                      ref={(el) => (dropRef.current[i][index] = el)}
                      style={{ border: "1px dashed indigo" }}
                      value={item?.value}
                      name={item.isMissed}
                      onMouseOver={e => handleMouseEnter(e, i, index)}
                      key={index}
                      id="missedBox"
                    >
                    </div>
                ) :
                (
                  item?.show ? <div
                    ref={(el) => (dropRef.current[i][index] = el)}
                    style={{ background: "indigo",color:'white' }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    id="missedBox"

                  >
                    
                        {typeof item?.dropValue=="string"?HtmlParser(item?.dropValue):item?.dropValue}
                      
                    
                  </div> :
                    <div
                      ref={(el) => (dropRef.current[i][index] = el)}
                      style={{ border: "1px dashed indigo" }}
                      value={item?.value}
                      name={item.isMissed}
                      key={index}
                      id="missedBox"
                    >
                    </div>
                )
            )}
          </FlexBox2>
        ))}
        <FlexBox
          
        >
        {/* drag field */}
          {state.choices.map((items, i) => (
            isAnswerSubmitted ? dragState[i]?.show ?  <Draggable onStop={(e) => handleStop(e, i)}>
                <div ref={(el) => (dragRef.current[i] = el)} key={i} className={styles.bgIndigo} style={{cursor:'pointer'}}>
                  {typeof dragState[i]?.value=="string"?HtmlParser(dragState[i]?.value):dragState[i]?.value}
                </div>
              </Draggable>
              
            : <div ref={(el) => (dragRef.current[i] = el)} key={i} onMouseOver={(e) => handleMouseEnter2(e, i)} >
              
            </div> : dragState[i]?.show ? 
                <div ref={(el) => (dragRef.current[i] = el)} key={i} className={styles.bgIndigo} >
                  {typeof dragState[i]?.value=="string"?HtmlParser(dragState[i]?.value):dragState[i]?.value}
                </div>

              
             : <div ref={(el) => (dragRef.current[i] = el)} key={i} ></div>
          ))}
        </FlexBox>
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 1rem;
  flex-wrap:wrap;

  > div {
  min-width:120px;
  min-height:50px;
  width:auto;
  max-width:50%;
  height:auto;
  word-break: break-word;
  padding:10px;
    border-radius: 10px;
    flex-wrap:wrap;
  
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
   
  }
`;
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 0.6rem;
  flex-wrap:wrap;

  > div {
    min-width:64px;
    padding:10px;
    width:auto;
    min-height:50px;
    height:auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    border: ${(props) => props.border};
  }
  > #missedBox{
  min-width:120px;
    padding:10px;
    width:auto;
    min-height:50px;
    height:auto;
  }
`;
