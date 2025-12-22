import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../.././CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../CommonJSFiles/useScrollBar";
import { dragdropPointCordinate } from "../../../CommonJSFiles/dragdropPointCordinate";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
export default function VerticalDragDrop({
  content,
  totalRows,
  totalCols,
  inputRef,
  choices,
}) {
  let [dragState, setDragState] = useState([]);
  const [dropState, setDropState] = useState([]);
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { val: item, show: true };
      arr.push({ ...obj });
    });
    setDragState([...arr]);
    let temp = [...content];
    temp = temp.map((item) => {
      let arr = item?.map((items) => {
        let obj = { ...items, dropVal: "", show: false };
        return { ...obj };
      });
      return arr;
    });
    droppableContainerRef.current = [...Array(arr.length)].map((item) =>
      Array(arr[0].length)
    );

    setDropState([...temp]);
  }, []);
  inputRef.current = dragState;
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
      dropState[row][col].dropVal = dragState[i]?.val || "";
      dragState[i].show = false;
      dropState[row][col].show = true;
      setDragState([...dragState]);
      setDropState([...dropState]);
    } else {
      setDragKey(Number(!dragKey));
    }
  };
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
    dropState[row][col].show = false;
    for (let i = 0; i < dragState.length; i++) {
      if (!dragState[i].show) {
        dragState[i].show = true;
        dragState[i].val = value;
        break;
      }
    }
    setDragState([...dragState]);
    setDropState([...dropState]);
  };

  inputRef.current = [...dropState];
  return (
    <div>
      <div style={{ marginTop: "2px" }}>
        {dropState?.map((items, index) => (
          <div
            className={styles.VerticalDragDropFlexBox}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              borderBottom: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 80}px`,
              maxWidth: "fit-content",
            }}
            key={index}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div
                  key={i}
                  value={item.value}
                  ref={(el) =>
                    (droppableContainerRef.current[index][i] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                >
                  <HtmlParserComponent value={item?.value} />
                </div>
              ) : isStudentAnswerResponse || item?.show ? (
                <Draggable
                  onStop={(e) => {
                    if (isStudentAnswerResponse) return;
                    handleStop2(e, index, i);
                  }}
                  key={i}
                  disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                  onDrag={handleDrag}
                  onStart={handleDragStart}
                >
                  <div
                    style={{
                      backgroundColor: "indigo",
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "50%",
                    }}
                    ref={(el) =>
                      (droppableContainerRef.current[index][i] = {
                        el,
                        isMissed: item.isMissed === "true",
                        show: item?.show,
                      })
                    }
                  >
                    <HtmlParserComponent
                      value={
                        isStudentAnswerResponse
                          ? item[student_answer]
                          : item?.dropVal
                      }
                    />
                  </div>
                </Draggable>
              ) : (
                <div
                  className={`${styles.verticalDropVal} verticalDropVal`}
                  style={{ border: "1px dashed black" }}
                  id={`${index} ${i}`}
                  ref={(el) =>
                    (droppableContainerRef.current[index][i] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                  key={i}
                ></div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.questionName} style={{ marginTop: "1rem" }}>
        Drag and Drop the answers.
      </div>
      <div
        className={styles.VerticalDragDropFlexBox2}
        id="verticalDragVal"
        style={{ flexWrap: "wrap" }}
        key={dragKey}
      >
        {dragState?.map((value, i) =>
          value?.show ? (
            <Draggable
              onStop={(e) => {
                if (isStudentAnswerResponse) return;
                handleStop1(e, i);
              }}
              disabled={hasAnswerSubmitted || isStudentAnswerResponse}
              onDrag={handleDrag}
              onStart={handleDragStart}
              key={i}
            >
              <div style={{ backgroundColor: "indigo", cursor: "pointer" }}>
                <HtmlParserComponent value={value.val} />
              </div>
            </Draggable>
          ) : (
            <div id={`${i}`} style={{ border: "1px solid indigo" }} key={i}>
              {1}
            </div>
          )
        )}
      </div>
    </div>
  );
}
