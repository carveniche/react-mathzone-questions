import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import parse from "html-react-parser";
import styled from "styled-components";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ParserComponent from "../../../../CommonJSFiles/ParserComponent";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
export default function HorizontalDragAndDropType({
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
  inputRef.current = dropState;
  const heightRef = useRef([]);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  useEffect(() => {
    if (currentHeight == 0) {
      let divHeight = [];
      let divWidth = [];
      let n = heightRef?.current?.length || 0;
      for (let i = 0; i < n; i++) {
        divHeight.push(heightRef?.current[i]?.offsetHeight);
        divWidth.push(heightRef?.current[i]?.offsetWidth);
      }
      let maxHeight = Math.max(...divHeight);
      let maxWidth = Math.max(...divWidth);
      setCurrentWidth(maxWidth);
      setCurrentHeight(maxHeight);
    }
  }, [currentHeight]);
  return (
    <>
      {dropState?.map((items, index) => (
        <div
          key={index}
          className={styles.MatchObjectHorizontalTypeDragDropFlexBox}
          style={{
            gap: items.length === 2 ? '5rem' : '2rem', 
          }}
        >
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div
                className={styles.MatchObjectHorizontalTypeDragDropFlexBox3}
                style={{
                  width: items.length === 2 
                    ? `fit-content` 
                    : `calc((100% - ${(items.length - 1) * 2}rem) / ${items.length})`,
                }}
              >
                <div>{parse(item?.imgvalue, optionSelectStaticMathField)}</div>
                <div
                  ref={(el) =>
                    (droppableContainerRef.current[index][i] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                >
                  <b>
                    <ParserComponent value={item?.numvalue} />
                  </b>
                </div>
              </div>
            ) : (
              <div
                className={styles.MatchObjectHorizontalTypeDragDropFlexBox3}
                style={{
                  width: items.length === 2 
                    ? `fit-content` 
                    : `calc((100% - ${(items.length - 1) * 2}rem) / ${items.length})`,
                }}
              >
                <div>{parse(item.imgvalue, optionSelectStaticMathField)}</div>
                <div>
                  <div
                    bgColor={item.show}
                    className={`droppablehfu ${styles.MatchObjectHorizontalTypeDragDropBox}`}
                    style={{
                      border: `${
                        item.show || isStudentAnswerResponse ? 0 : 1
                      }px dashed black`,
                    }}
                    id={`${index} ${i}`}
                    value={item.value}
                    key={i}
                    ref={(el) =>
                      (droppableContainerRef.current[index][i] = {
                        el,
                        isMissed: item.isMissed === "true",
                        show: item?.show,
                      })
                    }
                  >
                    {(item.show || isStudentAnswerResponse) && (
                      <Draggable
                        onStop={(e) => handleStop2(e, index, i)}
                        disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                        onDrag={handleDrag}
                        onStart={handleDragStart}
                      >
                        <div
                          style={{
                            backgroundColor: `${
                              item.show || isStudentAnswerResponse
                                ? "indigo"
                                : "initial"
                            }`,
                          }}
                        >
                          {
                            <ParserComponent
                              value={
                                isStudentAnswerResponse
                                  ? item[student_answer]
                                  : item?.dropVal
                              }
                            />
                          }
                        </div>
                      </Draggable>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ))}
      <div
        className={styles.MatchObjectHorizontalTypeDragDropFlexBox2}
        key={dragKey}
      >
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.MatchObjectHorizontalTypeDragDropBox}`}
            bgColor={items.show}
            ref={(el) => (heightRef.current[i] = el)}
            style={{ border: `${items.show ? 0 : 1}px dashed black` }}
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
                    backgroundColor: `${items.show ? "indigo" : "initial"}`,
                  }}
                >
                  <ParserComponent value={items?.val} />
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
  gap: 2rem;
  flex-wrap: wrap;
`;
