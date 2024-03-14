import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "../OnlineQuiz.module.css";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../CommonFunction/useScrollBar";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function DropBoxes({
  content,
  totalRows,
  state,
  isAnswerSubmitted,
  totalCols,
  inputRef,
}) {
  const [dropState, setDropState] = useState([]);
  const dragRef = useRef([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
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
    droppableContainerRef.current = [...Array(rows.length)].map((item) =>
      Array(rows[0].length)
    );
    setDropState(rows);
  }, []);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
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
  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
    for (let item of dragState) {
      if (!item?.show) {
        item.show = true;
        item.val = value;
        break;
      }
    }
    dropState[row][col].show = false;
    setDropState([...dropState]);
    setDragState([...dragState]);
  };

  inputRef.current = [...dropState];
  return (
    <div id="1n">
      <div id="1n">
        {/* drop field */}
        {dropState?.map((items, i) => (
          <div
            className={styles.CompareDragOperatorDragDropFlexBox2}
            key={i}
            id="1n"
          >
            {items?.map((item, index) =>
              item.isMissed !== "true" ? (
                <div
                  key={index}
                  name={item.isMissed}
                  id={`${i}-${index}`}
                  className={"falseDropBox"}
                  ref={(el) =>
                    (droppableContainerRef.current[i][index] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                >
                  <HtmlParserComponent value={parse(item?.value, optionSelectStaticMathField)} />
                </div>
              ) : item?.show || isStudentAnswerResponse ? (
                <Draggable
                  onStop={(e) => handleStop2(e, i, index)}
                  disabled={!isAnswerSubmitted || isStudentAnswerResponse}
                  onDrag={handleDrag}
                  onStart={handleDragStart}
                  key={index}
                >
                  <div
                    style={{
                      background: "indigo",
                      color: "white",
                      cursor: "pointer",
                    }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    id={`${i}-${index}`}
                    className={`mainCompareDropBox ${styles.DropBoxes} ${styles.roundcard_empty}`}
                    ref={(el) =>
                      (droppableContainerRef.current[i][index] = {
                        el,
                        isMissed: item.isMissed === "true",
                        show: item?.show,
                      })
                    }
                  >
                  <HtmlParserComponent
  value={
    isStudentAnswerResponse
      ? parse(item[student_answer], optionSelectStaticMathField)
      : parse(item?.dropValue, optionSelectStaticMathField)
  }
/>
                  </div>
                </Draggable>
              ) : (
                <div
                  ref={(el) =>
                    (droppableContainerRef.current[i][index] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                  style={{ border: "1px dashed indigo" }}
                  value={item?.value}
                  name={item.isMissed}
                  key={index}
                  className={`${styles.missedBox} mainCompareDropBox ${styles.roundcard_empty}`}
                  id={`${i}-${index}`}
                ></div>
              )
            )}
          </div>
        ))}
        <div
          className={`${styles.CompareDragOperatorDragDropFlexBox} ${styles.roundcard_empty}`}
          key={dragKey}
        >
          {/* drag field */}
          {state.choices.map((items, i) =>
            isAnswerSubmitted ? (
              dragState[i]?.show ? (
                <Draggable
                  onStop={(e) => handleStop1(e, i)}
                  disabled={isStudentAnswerResponse}
                  onDrag={handleDrag}
                  onStart={handleDragStart}
                  key={i}
                >
                  <div
                    ref={(el) => (dragRef.current[i] = el)}
                    key={i}
                    className={styles.bgIndigo_roundcard}
                    style={{ cursor: "pointer" }}
                  >
                    <HtmlParserComponent value={parse(dragState[i]?.value, optionSelectStaticMathField)} />
                  </div>
                </Draggable>
              ) : (
                <div ref={(el) => (dragRef.current[i] = el)} key={i}></div>
              )
            ) : dragState[i]?.show ? (
              <div
                ref={(el) => (dragRef.current[i] = el)}
                key={i}
                className={styles.bgIndigo_roundcard}
              >
                <HtmlParserComponent value={parse(dragState[i]?.value, optionSelectStaticMathField)} />
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
