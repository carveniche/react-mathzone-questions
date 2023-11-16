import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../HorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../../replaceDomeNode/ReplaceDomNode";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
export default function ContentHorizontalFillUpsEquationType({
  content,
  choices,
  inputRef,
  totalRows,
}) {
  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
  useEffect(() => {
    let arr = [];

    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
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
    droppableContainerRef.current = [...Array(arr.length)].map((item) =>
      Array(arr[0].length)
    );
    setDropState([...arr]);
    setDragState([...temp]);
  }, []);

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

  const handleStop2 = (e, row, col) => {
    dropState[row][col].show = false;
    let value = dropState[row][col].dropVal;
    for (let item of dragState) {
      if (!item.show) {
        item.show = true;
        item.val = value;
        break;
      }
    }

    dropState[row][col].dropVal = "";
    setDropState([...dropState]);
    setDragState([...dragState]);
  };
  inputRef.current = [...dropState];
  return (
    <>
      {dropState?.map((items, index) => (
        <div
          className={`${styles.HorizontalPictureDragDropFlexBox} `}
          key={index}
          style={{ marginBottom: "1rem" }}
        >
          {items?.map((item, i) =>
            item.isMissed !== "true" ? (
              <div
                className="fontColor"
                style={{ fontSize: 16, fontWeight: "bold", gap: "1rem" }}
                ref={(el) =>
                  (droppableContainerRef.current[index][i] = {
                    el,
                    isMissed: item.isMissed === "true",
                    show: item?.show,
                  })
                }
                key={i}
              >
                {parse(item.value, optionSelectStaticMathField)}
              </div>
            ) : (
              <div
                className={`droppablehfu ${styles.HorizontalPictureDragDropBox}`}
                id={`${index} ${i}`}
                value={item.value}
                key={i}
                style={{
                  border: `${
                    item.show || isStudentAnswerResponse ? 0 : 1
                  }px dashed black`,
                  minHeight: "60px",
                }}
                ref={(el) =>
                  (droppableContainerRef.current[index][i] = {
                    el,
                    isMissed: item.isMissed === "true",
                    show: item?.show,
                  })
                }
              >
                {(item?.show || isStudentAnswerResponse) && (
                  <Draggable
                    onStop={(e) => handleStop2(e, index, i)}
                    disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                    onDrag={handleDrag}
                    onStart={handleDragStart}
                  >
                    <div
                      style={{
                        backgroundColor: `${
                          item?.show || isStudentAnswerResponse
                            ? "indigo"
                            : "initial"
                        }`,
                      }}
                    >
                      {parse(
                        isStudentAnswerResponse
                          ? item[student_answer]
                          : item?.dropVal,
                        optionSelectStaticMathField
                      )}
                    </div>
                  </Draggable>
                )}
              </div>
            )
          )}
        </div>
      ))}
      <div className={styles.questionName} style={{ marginTop: "1rem" }}>
        Drag And Drop
      </div>
      <div className={styles.HorizontalPictureDragDropFlexBox2} key={dragKey}>
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.HorizontalPictureDragDropBox}`}
            style={{
              border: `${items?.show ? 0 : 1}px solid black`,
              minHeight: "60px",
            }}
            key={i}
          >
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                onDrag={handleDrag}
                onStart={handleDragStart}
              >
                <div
                  style={{
                    backgroundColor: `${items?.show ? "indigo" : "initial"}`,
                  }}
                >
                  {parse(items.val, optionSelectStaticMathField)}
                </div>
              </Draggable>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fontColor {
    color: indigo;
    font-size: 25px;
    font-weight: 600;
  }
`;
