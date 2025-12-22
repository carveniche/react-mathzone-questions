import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import Draggable from "react-draggable";
import styles from "../OnlineQuiz.module.css";
import HtmlParserComponent from ".././CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";

import { validateCoordiante } from "../ChoicesType/validateCoordinates";
import { dragdropPointCordinate } from "../CommonJSFiles/dragdropPointCordinate";
import { useScrollBar } from "../CommonJSFiles/useScrollBar";
export default function DropBoxesImageCompare({
  content,
  totalRows,
  state,
  isAnswerSubmitted,
  totalCols,
  inputRef,
}) {
  const [dropState, setDropState] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const [dragState, setDragState] = useState([]);
  const dragRef = useRef([]);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
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
    droppableContainerRef.current = [...Array(row.length)].map((item) =>
      Array(row[0].length)
    );
    setDropState([...row]);
    let temp = [];
    state?.choices?.map((item) => temp.push({ value: item, show: true }));
    setDragState([...temp]);
  }, []);
  //handling drag to drop1
  const handleStop1 = (e, i) => {
    let [x, y] = dragdropPointCordinate(e);
    const [row, col] = validateCoordiante(droppableContainerRef.current, {
      x,
      y,
    });
    if (
      row > -1 &&
      col > -1 &&
      dropState[row][col].isMissed === "true" &&
      !dropState[row][col].show
    ) {
      dropState[row][col].dropValue = dragState[i]?.value || "";
      dragState[i].show = false;
      dropState[row][col].show = true;
      setDragState([...dragState]);
      setDropState([...dropState]);
    } else {
      setDragKey(Number(!dragKey));
    }
  };

  //handling drop to drag

  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col].dropValue;
    dropState[row][col] = { ...dropState[row][col], show: false };
    for (let item of dragState) {
      if (!item.show) {
        item.value = value;
        item.show = true;
        break;
      }
    }
    setDragState([...dragState]);
    setDropState([...dropState]);
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
  inputRef.current = [...dropState];
  return (
    <div>
      <div>
        {/* Droppable Part */}
        {dropState?.map((items, i) => (
          <div key={i} className="comparisonOfImages">
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div
                  key={index}
                  ref={(el) =>
                    (droppableContainerRef.current[i][index] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                  name={item.isMissed}
                  style={InlineCss.InsideDiv}
                >
                  {HtmlParser(item.value)}
                </div>
              ) : item?.show || isStudentAnswerResponse ? (
                <div
                  ref={(el) =>
                    (droppableContainerRef.current[i][index] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                  key={index}
                  style={{
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                  name={item.value}
                >
                  <Draggable
                    disabled={!isAnswerSubmitted || isStudentAnswerResponse}
                    onStop={(e) => handleStop2(e, i, index)}
                    onDrag={handleDrag}
                    onStart={handleDragStart}
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
                        color: "white",
                      }}
                      className={styles.CompareOfImagesDragDropDragDropBoxes}
                    >
                      <HtmlParserComponent
                        value={
                          isStudentAnswerResponse
                            ? item[student_answer]
                            : item?.dropValue
                        }
                      />
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
                  ref={(el) =>
                    (droppableContainerRef.current[i][index] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                  className={`${styles.CompareOfImagesDragDropDragDropBoxes} mainCompareDropBox`}
                ></div>
              )
            )}
          </div>
        ))}

        {/* Draggable Part */}
        <div className={styles.CompareOfImagesDragDropFlexBox} key={dragKey}>
          {dragState?.map((items, i) =>
            items.show ? (
              <Draggable
                disabled={!isAnswerSubmitted || isStudentAnswerResponse}
                onStop={(e) => handleStop1(e, i)}
                onDrag={handleDrag}
                onStart={handleDragStart}
                key={i}
              >
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: `indigo`,
                    color: "white",
                  }}
                  ref={(el) => (dragRef.current[i] = el)}
                  id="drag"
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
                  backgroundColor: `initial`,
                  color: "white",
                  border: "1px solid black",
                }}
                key={i}
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
