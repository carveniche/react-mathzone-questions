import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { dragdropPointCordinate } from "../CommonJSFiles/dragdropPointCordinate";
import HtmlParserComponent from ".././CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";
import { useScrollBar } from "../CommonJSFiles/useScrollBar";

export default function LongDivisionDragAndDropType({
  content,
  choices,
  inputRef,
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

    arr = Object.assign([], content);
    arr = arr.map((item) => {
      return item?.map((items) => {
        return { ...items, show: false };
      });
    });

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

  return (
    <>
      <div>
        <table
          style={{ borderCollapse: "collapse" }}
          className={styles.longDivisonTable}
        >
          <tbody>
            {dropState?.map((items, index) => (
              <tr key={index}>
                {items?.map((item, i) =>
                  item.isMissed !== "true" ? (
                    <td
                      key={i}
                      ref={(el) =>
                        (droppableContainerRef.current[index][i] = {
                          el,
                          isMissed: item.isMissed === "true",
                          show: item?.show,
                        })
                      }
                    >
                      <div data-value={`rowssssssssss-${i}`}>
                        <b>
                          <HtmlParserComponent value={item?.value} />
                        </b>
                      </div>
                      {index % 2 == 1 && (
                        <>
                          <TopBorder
                            width={i == 0 ? "8px" : "100%"}
                          ></TopBorder>
                        </>
                      )}
                      {index == dropState.length - 1 && (
                        <BottomBorder
                          width={i == 0 ? "8px" : "100%"}
                        ></BottomBorder>
                      )}
                      {index == 1 && i == 0 && (
                        <>
                          <RightPranthesis>)</RightPranthesis>
                        </>
                      )}
                    </td>
                  ) : (
                    <td key={i}>
                      <div
                        className={`droppablehfu ${styles.LongDivisonDragDropBox}`}
                        style={{
                          border: `${
                            item.show || isStudentAnswerResponse ? 0 : 1
                          }px dashed indigo`,
                          minWidth: 40,
                          minHeight: 40,
                        }}
                        id={`${index} ${i}`}
                        value={item.value}
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
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
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
                                <HtmlParserComponent
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
                      {index % 2 == 1 && (
                        <>
                          <TopBorder
                            width={i == 0 ? "8px" : "100%"}
                          ></TopBorder>
                        </>
                      )}
                      {index == dropState.length - 1 && (
                        <BottomBorder
                          width={i == 0 ? "8px" : "100%"}
                        ></BottomBorder>
                      )}
                      {index == 1 && i == 0 && (
                        <>
                          <RightPranthesis>)</RightPranthesis>
                        </>
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={styles.LongDivisonDragDropFlexBox2}
        key={`drag_key${dragKey}`}
      >
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.LongDivisonDragDropBox}`}
            ref={(el) => (heightRef.current[i] = el)}
            style={{
              border: `${items.show ? 0 : 1}px dashed black`,
              minWidth: 40,
              minHeight: 40,
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
                    backgroundColor: `${items.show ? "indigo" : "initial"}`,
                    minWidth: 40,
                    minHeight: 40,
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

export const RightPranthesis = styled.div`
 position: absolute;
  top: 4px;
  transform: scale(1.4, 2.65);
  right: -1px;
  color: indigo;
`;
export const TopBorder = styled.div`
  position: absolute;
  width: ${(props) => props.width ?? "100px"};
  top: -3px;
  height: 3px;
  right: 0;
  background: indigo;
`;
export const BottomBorder = styled.div`
  position: absolute;
  width: ${(props) => props.width ?? "100px"};
  bottom: -3px;
  height: 3px;
  right: 0;
  background: indigo;
`;
