import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { dragdropPointCordinate } from "../../../CommonJSFiles/dragdropPointCordinate";
import { useScrollBar } from "../../../CommonJSFiles/useScrollBar";
import HtmlParserComponent from "../../.././CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
export default function RandomArrangmentDragAndDropType({
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
        let imageArray = [];
        let count = Number(item?.count) || 0;
        for (let i = 0; i < count; i++) {
          imageArray?.push(item?.img);
        }
        let obj = {
          ...item,
          show: false,
          dropVal: "",
          imageArray: [...imageArray],
        };
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
    dropState[row][col].show = false;
    setDropState([...dropState]);
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
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
  const heightRef = useRef([]);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [_, setCurrentWidth] = useState(0);
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
          className={styles.RandomArrangmentDragDropKeyingFlexBox}
        >
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div
                className={styles.RandomArrangmentDragDropDragDropFlexBox3}
                key={i}
              >
                <div
                  className={styles.RandomArrangmentDragDropDragDropBoxImageBox}
                >
                  {item.imageArray?.map((img, i) => (
                    <div key={i}> {HtmlParser(img)}</div>
                  ))}
                </div>
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
                    <HtmlParserComponent value={item?.count} />
                  </b>
                </div>
              </div>
            ) : (
              <div
                className={styles.RandomArrangmentDragDropDragDropFlexBox3}
                key={i}
              >
                <div
                  className={styles.RandomArrangmentDragDropDragDropBoxImageBox}
                >
                  {item.imageArray?.map((img, i) => (
                    <div key={i}>{HtmlParser(img)}</div>
                  ))}
                </div>
                <div>
                  <div
                    className="droppablehfu"
                    id={`${index} ${i}`}
                    value={item.count}
                    key={i}
                    style={{
                      minHeight: "50px",
                      height: "auto",
                      width: "auto",
                      textAlign: "center",
                      minWidth: "96px",
                      border: `${
                        item.show || isStudentAnswerResponse ? 0 : 1
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
                            minWidth: "inherit",
                            minHeight: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            cursor: "pointer",
                            padding: "1rem",
                          }}
                        >
                          {isStudentAnswerResponse ? (
                            <HtmlParserComponent value={item[student_answer]} />
                          ) : (
                            <HtmlParserComponent value={item?.dropVal} />
                          )}
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
        className={styles.RandomArrangmentDragDropDragDropFlexBox2}
        key={dragKey}
      >
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className="draggablehfu"
            key={i}
            ref={(el) => (heightRef.current[i] = el)}
            style={{
              minHeight: "50px",
              height: "auto",
              width: "auto",
              textAlign: "center",
              minWidth: "96px",
              border: `${items.show ? 0 : 1}px solid black`,
            }}
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
                    minWidth: "inherit",
                    minHeight: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    cursor: "pointer",
                    padding: "1rem",
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
  width: 70%;
  gap: 4rem;

  > div {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
  }
`;
const Box = styled.div`
  min-height: 50px;
  height: auto;
  width: auto;
  text-align: center;
  min-width: ${(props) => (!props.bgColor ? 96 : 80)}px;

  border: ${(props) => (props.bgColor ? "0" : "1")}px solid black;
  > div {
    background-color: ${(props) => (props.bgColor ? "indigo" : "initial")};
    min-width: inherit;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    padding: 1rem;
  }
`;

const FlexBox2 = styled.div`
  display: flex;
  margin-top: 2rem;
  //justify-content:center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FlexBox3 = styled.div`
  width: auto;

  margin: 1rem 0;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
  > div {
    width: auto;
    justify-content: center;
  }
  > div {
    display: flex;
  }
`;
const ImageBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const InlineCss = {
  css: {
    // background-color: ${(props) => (props.bgColor ? "indigo" : "initial")};
    minWidth: "inherit",
    minHeight: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
    padding: "1rem",
  },
};
