import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
export default function VerticalDragAndDropType({
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
  const droppableContainerRef = useRef([]);
  const [dragKey, setDragKey] = useState(0);
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
    dropState[row][col].show = false;
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
    for (let i = 0; i < dragState.length; i++) {
      if (!dragState[i].show) {
        dragState[i].val = value;
        dragState[i].show = true;
        break;
      }
    }
    setDropState([...dropState]);
    setDragState([...dragState]);
  };

  inputRef.current = dropState;
  return (
    <>
      {dropState.length && (
        <DropBoxRenderer
          dropState={dropState}
          droppableContainerRef={droppableContainerRef}
          handleStop2={handleStop2}
          isStudentAnswerResponse={isStudentAnswerResponse}
          handleDragStart={handleDragStart}
          handleDrag={handleDrag}
          hasAnswerSubmitted={hasAnswerSubmitted}
        />
      )}
      <div
        className={styles.MatchObjectVerticalDragDropBoxFlexBox2}
        key={dragKey}
      >
        {dragState?.map((items, i) => (
          <div
            key={i}
            id={`${i}`}
            className={`draggablehfu ${styles.MatchObjectVerticalDragDropBox}`}
            style={{
              border: `${items?.show ? 0 : 1}px solid black`,
            }}
          >
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                onDrag={handleDrag}
                onStart={handleDragStart}
              >
                <div>
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

const DropBoxRenderer = ({
  handleStop2,
  dropState,
  droppableContainerRef,
  isStudentAnswerResponse,
  handleDrag,
  handleDragStart,
  hasAnswerSubmitted,
}) => {
  return (
    <>
      <table>
        {dropState?.map((items, index) => (
          <React.Fragment key={index}>
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <tr>
                  <td style={{ padding: 5 }}>
                    <div
                      className="fontSize"
                      ref={(el) =>
                        (droppableContainerRef.current[index][i] = {
                          el,
                          isMissed: item.isMissed === "true",
                          show: item?.show,
                        })
                      }
                    >
                      <HtmlParserComponent value={item?.numvalue} />
                    </div>
                  </td>
                  <td style={{ padding: 5 }}>
                    {" "}
                    <div className="fontSize">{HtmlParser(item?.imgvalue)}</div>
                  </td>
                </tr>
              ) : (
                <tr key={i}>
                  <td style={{ padding: 5 }}>
                    <div className="fontSize">{HtmlParser(item.imgvalue)}</div>
                  </td>
                  <td style={{ padding: 5 }}>
                    <div
                      className={`droppablehfu ${styles.MatchObjectVerticalDragDropBox}`}
                      id={`${index} ${i}`}
                      value={item.value}
                      key={i}
                      style={{
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
                          disabled={
                            hasAnswerSubmitted || isStudentAnswerResponse
                          }
                          onDrag={handleDrag}
                          onStart={handleDragStart}
                        >
                          <div>
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
                </tr>
              )
            )}
          </React.Fragment>
        ))}
      </table>
    </>
  );
};
export const FlexBox = styled.div`
  display: flex;

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
