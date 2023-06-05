import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser";
import { FlexBox, Grid } from "../../ContentPlaceValueTableSelect";
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
    let x = e.clientX;
    let y = e.clientY;
    let temp = [...dragState];
    let position = [x, y];
    setXyPosition([...position]);
    setDragState([]);
    currentDrag.current = i;
    setDragState([...temp]);
  };
  const handleStop2 = (e, row, col) => {
    let x = e.clientX;
    let y = e.clientY;
    let position = [x, y];

    currentDrop.current = [row, col];
    setXyPosition([...position]);
    dropState[row][col].show = false;
    setDropState([...dropState]);
    setIsDropActive(true);
    dropState[row][col].show = true;
    setDropState([...dropState]);
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
  inputRef.current=dropState
useEffect(()=>{
  
  if (xyPosition.length>0 && isDropActive) {
    let id = setTimeout(() => {
      let val=elementFinds2("draggablepvt", xyPosition,dragState)
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

  return (
    <>
      <Grid>
        <FlexBox totalCols={totalCols} backgroundColor="orange">
          {questionHead?.map((item, i) => (
            <div key={i}>{HtmlParser(typeof item?.value==="string"?item?.value:'')}</div>
          ))}
        </FlexBox>
        {dropState?.map((items, index) => (
          <FlexBox key={index} totalCols={totalCols}>
            {items.map((item, i) =>
              item?.isMissed !== "true" ? (
                <div key={i}>{HtmlParser(typeof item?.value==="string"?item?.value:'')}</div>
              ) : (
                <div key={i} value={item.value}>
                  <Box
                    id={`${index} ${i}`}
                    className="droppablepvt"
                    bgColor={item.show}
                  >
                    {item.show && (
                      <Draggable
                        onStop={(e) => handleStop2(e, index, i)}
                        disabled={hasAnswerSubmitted}
                      >
                        <div >{HtmlParser(typeof item?.dropVal==="string"?item.dropVal:'')}</div>
                      </Draggable>
                    )}
                  </Box>
                </div>
              )
            )}
          </FlexBox>
        ))}
      </Grid>
      <FlexBox2>
        {dragState?.map((items, i) => (
          <Box id={`${i}`} className="draggablepvt" bgColor={items.show}>
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted}
              >
                <div>{typeof items?.val?.value==="string"?HtmlParser(items?.val?.value):items?.val?.value}</div>
              </Draggable>
            )}
          </Box>
        ))}
      </FlexBox2>
    </>
  );
}



const FlexBox2 = styled.div`
  display: flex;
  margin-top: 2rem;
  //justify-content:center;
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
color:black;
  border: ${(props) => (props.bgColor ? "0" : "1")}px dashed black;
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
    width:inherit;
    height:inherit
  }
`;
