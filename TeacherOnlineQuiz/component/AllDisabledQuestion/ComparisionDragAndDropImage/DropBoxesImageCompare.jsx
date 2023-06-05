import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import Draggable from "react-draggable";
export default function DropBoxesImageCompare({
  content,
  totalRows,
  state,
  isAnswerSubmitted,
  dropRef,
  totalCols,
}) {
  let [rows, setRows] = useState([]);
  const [dragState, setDragState] = useState([]);
  const dragRef = useRef([]);
  const dragIndex = useRef(-1);
  const dropIndex = useRef([-1, -1]);
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
    let id = setTimeout(() => {
      dragIndex.current = -1;
    }, 0);
    return () => clearTimeout(id);
  }, [dragIndex.current]);
  useEffect(() => {
    let id = setTimeout(() => {
      dropIndex.current = [-1, -1];
    }, 0);
    return () => clearTimeout(id);
  }, [dropIndex.current[0]]);
  //handling drag to drop1
  const handleStop1 = (e, index) => {
    console.log("draggin1");
    dragIndex.current = index;
    dragState[index] = { ...dragState[index], show: false };
    setDragState([...dragState]);
    dragState[index] = { ...dragState[index], show: true };
    setDragState([...dragState]);
  };

  const handleMouseOver1 = (e, row, col) => {
    if (dragIndex.current > -1 && !rows[row][col].show) {
      rows[row][col] = {
        ...rows[row][col],
        show: true,
        dropValue: dragState[dragIndex.current].value,
      };
      setRows([...rows]);
      dragState[dragIndex.current] = {
        ...dragState[dragIndex.current],
        show: false,
      };
      setDragState([...dragState]);
      dragIndex.current = -1;
    }
  };

  //handling drop to drag

  const handleStop2 = (e, row, col) => {
    console.log("draggin2");
    dropIndex.current = [row, col];
    rows[row][col] = { ...rows[row][col], show: false };
    setRows([...rows]);
    rows[row][col] = { ...rows[row][col], show: true };
    setRows([...rows]);
  };

  const handleMouseOver2 = (e, index) => {
    if (
      dropIndex.current[0] > -1 &&
      dropIndex.current[1] > -1 &&
      !dragState.show
    ) {
      // console.log('working')
      dragState[index] = {
        ...dragState[index],
        show: true,
        value: rows[dropIndex.current[0]][dropIndex.current[1]].dropValue,
      };
      setDragState([...dragState]);
      rows[dropIndex.current[0]][dropIndex.current[1]] = {
        ...rows[dropIndex.current[0]][dropIndex.current[1]],
        show: false,
        dropValue: "",
      };
      setRows([...rows]);
      dropIndex.current = [-1, -1];
    }
  };

  return (
    <div>
      <div>
        {/* Droppable Part */}
        {rows?.map((items, i) => (
          <FlexBox2 key={i} totalRows={totalCols}>
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div
                  key={index}
                  ref={(el) => (dropRef.current[i][index] = el)}
                  name={item.isMissed}
                >
                  {HtmlParser(item.value)}
                </div>
              ) : item?.show ? (
                <div
                  ref={(el) => (dropRef.current[i][index] = el)}
                  key={index}
                  style={{ width: "auto", height: "auto" }}
                  name={item.value}
                >
                  <Draggable
                    disabled={!isAnswerSubmitted}
                    onStop={(e) => handleStop2(e, i, index)}
                  >
                    <DragDropBoxes
                      id="drop"
                      color="white"
                      style={{
                        background: "indigo",
                        width: "120px",
                        height: "50px",
                        maxWidth: "140px",
                        cursor: "pointer",
                      }}
                    >
                      {typeof item.dropValue=="string"?HtmlParser(item?.dropValue):item?.dropValue}
                    </DragDropBoxes>
                  </Draggable>
                </div>
              ) : (
                <DragDropBoxes
                  key={index}
                  name={item.value}
                  id="drop"
                  style={{
                    border: "1px dashed indigo",
                    width: "120px",
                    height: "50px",
                    maxWidth: "140px",
                  }}
                  ref={(el) => (dropRef.current[i][index] = el)}
                  onMouseOver={(e) => handleMouseOver1(e, i, index)}
                ></DragDropBoxes>
              )
            )}
          </FlexBox2>
        ))}

        {/* Draggable Part */}
        <FlexBox
          backgroundColor="indigo"
          color="white"
          border="1px solid indigo"
          contentWidth="140px"
          contentHeight="50px"
        >
          {dragState?.map((items, i) =>
            items.show ? (
              <Draggable
                disabled={!isAnswerSubmitted}
                onStop={(e) => handleStop1(e, i)}
              >
                <DragDropBoxes
                  style={{ cursor: "pointer" }}
                  ref={(el) => (dragRef.current[i] = el)}
                  id="drag"
                  backgroundColor="indigo"
                  color="white"
                >
                  {typeof items.value=="string"?HtmlParser(items?.value):items?.value}
                </DragDropBoxes>
              </Draggable>
            ) : (
              <DragDropBoxes
                ref={(el) => (dragRef.current[i] = el)}
                id="drag"
                color="white"
                onMouseOver={(e) => handleMouseOver2(e, i)}
              ></DragDropBoxes>
            )
          )}
        </FlexBox>
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
  gap: 0.5rem;
  //justify-content:center;
  align-items: center;
`;

const DragDropBoxes = styled.div`
    min-width:120px;
   min-height:50px;
   height:auto;
    width:auto
   display:flex;
   flex-wrap:wrap;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
   background-color:${(props) => props.backgroundColor};
   color:${(props) => props.color};
   
    font-size:20px;
    font-weight:bold;
`;

const FlexBox2 = styled.div`
  display: flex;
  flex-direction: row;

  margin: 2rem 0.2rem;
  gap: 1rem;
  //justify-content:center;
  align-items: center;
  > div {
    width: Calc(
      (100% - ${(props) => props.totalRow}*2rem) / ${(props) => props.totalRows}
    );
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
