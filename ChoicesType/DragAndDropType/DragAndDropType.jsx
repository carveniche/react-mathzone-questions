import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../OnlineQuiz.module.css";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../.././CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";

import { useScrollBar } from "../../CommonJSFiles/useScrollBar";
import { validateCoordiante } from "../validateCoordinates";
import { dragdropPointCordinate } from "../../CommonJSFiles/dragdropPointCordinate";
export default function DragAndDropType({
  content,
  choices,
  inputRef,
  totalRows,
  choiceType,
}) {
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag, handleDragStart] = useScrollBar();
  const { isStudentAnswerResponse } = useContext(ValidationContext);
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
  inputRef.current = dropState;
  return (
    <>
      <table>
        <tbody>
          {dropState?.map((items, index) => (
            <tr className={styles.HorizontalPictureDragDropFlexBox} key={index}>
              {items?.map((item, i) =>
                item.isMissed === "false" ? (
                  <td
                    style={{ padding: choiceType ? 5 : 10 }}
                    key={i}
                    ref={(el) =>
                      (droppableContainerRef.current[index][i] = {
                        el,
                        isMissed: item.isMissed === "true",
                        show: item?.show,
                      })
                    }
                  >
                    <div className="fontColor">
                      <HtmlParserComponent value={item?.value} />
                    </div>
                  </td>
                ) : (
                  <td style={{ padding: choiceType ? 5 : 10 }} key={i}>
                    <div
                      className={`droppablehfu ${styles.HorizontalPictureDragDropBox}`}
                      id={`${index} ${i}`}
                      value={item.value}
                      key={i}
                      style={{
                        border: `${
                          item?.show || isStudentAnswerResponse ? 0 : 1
                        }px dashed black`,
                      }}
                      ref={(el) =>
                        (droppableContainerRef.current[index][i] = {
                          el,
                          isMissed: item.isMissed === "true",
                          show: item?.show,
                        })
                      }
                    >
                      {(isStudentAnswerResponse || item?.show) && (
                        <Draggable
                          onStop={(e) => handleStop2(e, index, i)}
                          disabled={
                            hasAnswerSubmitted || isStudentAnswerResponse
                          }
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
                            <HtmlParserComponent
                              value={
                                isStudentAnswerResponse
                                  ? item[student_answer]
                                  : item?.dropVal
                              }
                            />
                          </div>
                        </Draggable>
                      )}
                    </div>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.questionName} style={{ marginTop: "1rem" }}>
        Drag and Drop the answers.
      </div>
      <div className={styles.HorizontalPictureDragDropFlexBox2} key={dragKey}>
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            key={i}
            className={`draggablehfu ${styles.HorizontalPictureDragDropBox}`}
            style={{ border: `${items?.show ? 0 : 1}px solid indigo` }}
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
                  <HtmlParserComponent value={items?.val} />
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
