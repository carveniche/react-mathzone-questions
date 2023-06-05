import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser";
import numberSystemConverter from "../../../../../CommonJSFiles/numberSystemConverter";
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
    let x = e.clientX;
    let y = e.clientY;
    setIsDropActive(true);
    let temp = [...dropState];
    let position = [x, y];
    setXyPosition([...position]);
    setDropState([]);
    currentIndex.current = i;
    setDropState([...temp]);
  };

  const handleStop1 = (e, i) => {
    let x = e.clientX;
    let y = e.clientY;
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
        <Grid totalCols={Number(totalColumns)}>
          {numbers?.map((item, i) => (
            <div className={`${(i + 1) % totalColumns == 0 && "rightBorder"}`}>
              <div>
                <b>{typeof item == "string" ? HtmlParser(item) : item}</b>
              </div>
            </div>
          ))}
          {dropState?.map((items, index) =>
            items?.isMissed == "false" ? (
              <div
                key={index}
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <div>{typeof items.value=="string"?HtmlParser(items?.value):items?.value}</div>
              </div>
            ) : (
              <div
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <Box
                  key={index}
                  className="droppablePlaceValue"
                  id={index}
                  bgColor={items?.show}
                >
                  {items?.show && (
                    <Draggable
                      onStop={(e) => handleStop2(e, index)}
                      disabled={isAnswerSubmitted}
                    >
                      <div>{typeof items.dropVal=="string"?HtmlParser(items?.dropVal):items?.dropVal}</div>
                    </Draggable>
                  )}
                </Box>
              </div>
            )
          )}
        </Grid>
        <div style={{ marginTop: "1rem" }} className={styles.solutionText}>
          Drag and Drop Answer
        </div>
        <FlexBox2>
          {dragState?.map((item, i) => (
            <Draggable
              onStop={(e) => handleStop1(e, i)}
              disabled={isAnswerSubmitted}
            >
              <div
                className="draggablePlvc"
                style={{ border: `${item?.show ? 0 : 0}px solid indigo` }}
                id={i}
              >
                {item?.show && (
                  <div
                    style={{ cursor: "pointer", background: "indigo" }}
                    id={i}
                  >
                    {typeof item?.value=="string"?HtmlParser(item?.value):item?.value}
                  </div>
                )}
              </div>
            </Draggable>
          ))}
        </FlexBox2>
      </div>
    </div>
  );
}

const FlexBox2 = styled.div`
display:flex;
margin:1rem 0;
gap:0.5rem;
position:relative;

flex-wrap:wrap;
> div{
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    font-weight:bold;
    min-width:50px;
    min-height:50px;
    width:auto;
    height:auto
    border-radius:20px;
    flex-wrap:wrap;
    word-break: break-word;
    

}
> div > div{
  min-width:100%;
  min-height:100%;
  display:flex;
  flex-wrap:wrap;
  word-break: break-word;
  justify-content:center;
  align-items:center;

}

`;

const Grid = styled.div`
  display: Grid;
  width: 100%;
  min-width: 100px;
  margin: 2rem 0;
  max-width: 100%;
  height: auto;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
  border: 1px solid black;

  > div {
    display: relative;
    display: flex;

    justify-content: center;
    align-items: center;
    word-break: break;
    padding: 1rem 0.4rem;
    border-right: 1px solid black;
    height: auto;
  }
  > .borderBottom {
    border-top: 1px solid black;
  }
  > .rightBorder {
    border-right: 0px solid black;
  }
  > div > div {
    word-break: break;
    height: auto;
  }
`;

const Box = styled.div`
      position:relative;
      cursor:pointer;
     
        min-width:50px;
        min-height:50px;
        width:auto;
      height:auto
      border-radius:20px;
      border:${(props) => (props.bgColor ? 0 : "1")}px dashed indigo;
      flex-wrap:wrap;
      word-break: break-word;
      display:flex;
      justify-content:center;
      align-items:center;
      color:white;
      max-width:inherit;
      > div{
        min-width:100%;
        min-height:50px;
  display:flex;
  flex-wrap:wrap;
  word-break: break-word;
  justify-content:center;
  align-items:center;
  background:indigo;
  max-width:95%;
  height:auto;
  
  
      }
        `;
