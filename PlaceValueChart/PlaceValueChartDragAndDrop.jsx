import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import numberSystemConverter from "../CommonJSFiles/numberSystemConverter";
import HtmlParserComponent from ".././CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";

import { dragdropPointCordinate } from "../CommonJSFiles/dragdropPointCordinate";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";
import { useScrollBar } from "../CommonJSFiles/useScrollBar";
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
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
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
    let temp2 = numberSystemConverter(
      n,
      numberSystem,
      String(state?.chartType).trim()?.toLowerCase()
    );

    setNumbers([...temp2]);
    let temp = [];
    state.choices.map((item) => temp.push({ value: item, show: true }));
    setDragState([...temp]);
    setDropState([...rows]);
  }, []);
  const handleStop2 = (e, i) => {
    dropState[i].show = false;
    let value = dropState[i].dropVal;
    dropState[i].dropVal = "";
    for (let i = 0; i < dragState.length; i++) {
      if (!dragState[i].show) {
        dragState[i].value = value;
        dragState[i].show = true;
        break;
      }
    }
    setDropState([...dropState]);
    setDragState([...dragState]);
  };

  const handleStop1 = (e, i) => {
    let [x, y] = dragdropPointCordinate(e);
    const [row, col] = validateCoordiante(droppableContainerRef.current, {
      x,
      y,
    });
    if (
      row > -1 &&
      col > -1 &&
      dropState[col].isMissed === "true" &&
      !dropState[col].show
    ) {
      dropState[col].dropVal = dragState[i]?.value || "";
      dragState[i].show = false;
      dropState[col].show = true;
      setDragState([...dragState]);
      setDropState([...dropState]);
    } else {
      setDragKey(Number(!dragKey));
    }
  };

  dropRef.current = dropState;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <div
          className={styles.PlaceValueChartDragDropGrid}
          style={{
            gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
            overflow: "auto",
          }}
        >
          {numbers?.map((item, i) => (
            <div
              className={`${(i + 1) % totalColumns == 0 && styles.rightBorder}`}
              key={i}
            >
              <div>
                <b>
                  <HtmlParserComponent value={item} />
                </b>
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
                <div
                  ref={(el) =>
                    (droppableContainerRef.current[index] = {
                      el,
                      isMissed: items.isMissed === "true",
                      show: items?.show,
                    })
                  }
                >
                  <HtmlParserComponent value={items?.value} />
                </div>
              </div>
            ) : (
              <div
                className={`${styles.borderBottom} ${
                  (index + 1) % totalColumns == 0 && styles.rightBorder
                }`}
                key={index}
              >
                <div
                  className={`droppablePlaceValue ${styles.PlaceValueChartDragDropBox}`}
                  id={index}
                  style={{
                    border: `${
                      items?.show || isStudentAnswerResponse ? 0 : "1"
                    }px dashed indigo`,
                  }}
                  ref={(el) =>
                    (droppableContainerRef.current[index] = {
                      el,
                      isMissed: items.isMissed === "true",
                      show: items?.show,
                    })
                  }
                >
                  {(items?.show || isStudentAnswerResponse) && (
                    <Draggable
                      onStop={(e) => handleStop2(e, index)}
                      disabled={isAnswerSubmitted || isStudentAnswerResponse}
                      onDrag={handleDrag}
                      onStart={handleDragStart}
                      key={index}
                    >
                      <div
                        style={{ cursor: "move" }}
                        ref={(el) =>
                          (droppableContainerRef.current[index] = {
                            el,
                            isMissed: items.isMissed === "true",
                            show: items?.show,
                          })
                        }
                      >
                        {isStudentAnswerResponse ? (
                          <HtmlParserComponent value={items[student_answer]} />
                        ) : (
                          <HtmlParserComponent value={items?.dropVal} />
                        )}
                      </div>
                    </Draggable>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className={styles.questionName} style={{ marginTop: "1rem" }}>
          Drag and Drop the answers.
        </div>
        <div className={styles.PlaceValueChartDragDropFlexBox2} key={dragKey}>
          {dragState?.map((item, i) => (
            <div
              className="draggablePlvc"
              style={{
                border: `${item?.show ? 0 : 1}px solid indigo`,
                cursor: "move",
              }}
              key={i}
              id={i}
            >
              {item?.show && (
                <Draggable
                  onStop={(e) => handleStop1(e, i)}
                  disabled={isAnswerSubmitted || isStudentAnswerResponse}
                  onDrag={handleDrag}
                  onStart={handleDragStart}
                  key={i}
                >
                  <div style={{ cursor: "move", background: "indigo" }} id={i}>
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
