import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { student_answer } from "../../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { dragdropPointCordinate } from "../../../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../../../CommonFunction/useScrollBar";
import { validateCoordiante } from "../../../ChoicesType/validateCoordinates";
const elementFinds = (target, xyAxis, dropState) => {
  if (xyAxis[0] == undefined) return false;
  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);
  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const [row, col] = elem?.getAttribute("id")?.split(" ").map(Number);
      if (!dropState[row][col].show) return elem?.getAttribute("id");
    }
    elem = elem.parentNode;
  }

  return false;
};
const elementFinds2 = (target, xyAxis, dragState) => {
  let elem = document?.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const index = Number(elem?.getAttribute("id"));

      if (!dragState[index].show) return index;
    }
    elem = elem.parentNode;
  }

  return false;
};
const updateState = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  index,
  row,
  col
) => {
  targetState[row][col].dropVal = sourceState[index].val;
  targetState[row][col].show = true;
  // console.log(targetState[row][col])

  updateTargetState([...targetState]);
  sourceState[index] = { ...sourceState[index], show: false };

  updateSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  row,
  col,
  index
) => {
  // targetState.push(sourceState[row][col]?.val);
  targetState[index].val = sourceState[row][col].dropVal;
  targetState[index].show = true;
  sourceState[row][col].dropVal = "";
  sourceState[row][col].show = false;
  updateTargetState([...targetState]);
  updateSourceState([...sourceState]);
};
export default function ChoiceDNDMatchObjVertEqn({
  content,
  choices,
  inputRef,
  totalRows,
}) {
  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const currentDrag = useRef(-1);
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
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
  useEffect(() => {
    if (xyPosition.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppablehfu", xyPosition, dropState);
        if (val !== false) {
          const [row, col] = val.split(" ").map(Number);
          updateState(
            dropState,
            dragState,
            setDropState,
            setDragState,
            currentDrag.current,
            row,
            col
          );
        }
        clearTimeout(id);
        setXyPosition([]);
        setIsDragActive(false);
        currentDrag.current = -1;
      }, 0);
    }
  }, [xyPosition.length]);

  useEffect(() => {
    if (xyPosition.length > 0 && isDropActive) {
      let id = setTimeout(() => {
        let val = elementFinds2("draggablehfu", xyPosition, dragState);
        if (val !== false) {
          console.log(val, "vlaue");
          updateState2(
            dragState,
            dropState,
            setDragState,
            setDropState,
            currentDrop.current[0],
            currentDrop.current[1],
            val
          );
        }
        clearTimeout(id);
        currentDrop.current = [-1, -1];
        setXyPosition([]);
        setIsDropActive(false);
      }, 0);
    }
  }, [isDropActive, xyPosition.length]);

  const handleStop2 = (e, row, col) => {
    dropState[row][col].show = false;
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
    for (let i = 0; i < dragState.length; i++) {
      if (!dragState[i].show) {
        dragState[i].show = true;
        dragState[i].val = value;
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
            id={`${i}`}
            className={`draggablehfu ${styles.MatchObjectVerticalDragDropBox}`}
            style={{
              border: `${true ? 0 : 1}px dashed black`,
            }}
            key={i}
          >
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                onStart={handleDragStart}
                onDrag={handleDrag}
              >
                <div>{parse(items.val, optionSelectStaticMathField)}</div>
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
      {dropState?.map((items, index) => (
        <div key={index}>
          {items?.map((item, i) =>
            item.isMissed !== "true" ? (
              <div
                className={styles.MatchObjectVerticalDragDropFlexBox3}
                style={{ fontSize: 16, fontWeight: "bold" }}
                key={i}
              >
                <div
                  className="fontSize"
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                    gap: "1rem",
                  }}
                  ref={(el) =>
                    (droppableContainerRef.current[index][i] = {
                      el,
                      isMissed: item.isMissed === "true",
                      show: item?.show,
                    })
                  }
                >
                  {parse(item?.numvalue, optionSelectStaticMathField)}
                </div>
                <div
                  className="fontSize"
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                    gap: "1rem",
                  }}
                >
                  {parse(item?.imgvalue, optionSelectStaticMathField)}
                </div>
              </div>
            ) : (
              <div
                className={styles.MatchObjectVerticalDragDropFlexBox3}
                key={i}
              >
                <div
                  className="fontSize"
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                    gap: "1rem",
                  }}
                >
                  {parse(item.imgvalue, optionSelectStaticMathField)}
                </div>
                <div>
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
                        disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                        onStart={handleDragStart}
                        onDrag={handleDrag}
                      >
                        <div>
                          {parse(
                            isStudentAnswerResponse
                              ? item[student_answer]
                              : item.dropVal,
                            optionSelectStaticMathField
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
