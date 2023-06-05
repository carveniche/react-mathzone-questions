import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../DisabledHorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";

export default function DisabledDragDropHorizontalFillUpsEquationType({
  content,
  choices,
  inputRef,
  totalEmptyBox,
  totalRows,
}) {
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);

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
    setDragState([...temp]);
  }, []);

  return (
    <>
      {dropState?.map((items, index) => (
        <div className={styles.HorizontalPictureDragDropFlexBox} key={index} style={{margin:"1rem 0"}}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div className="fontColor" style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>
                {parse(item.value, optionSelectStaticMathField)}
              </div>
            ) : (
              <div
                className={`droppablehfu ${styles.HorizontalPictureDragDropBox}`}
                id={`${index} ${i}`}
                value={item.value}
                key={i}
                style={{
                  border: `${item.show ? 0 : 1}px dashed black`,
                }}
              >
                {item?.show && (
                  <Draggable disabled={true}>
                    <div
                      style={{
                        backgroundColor: `${item?.show ? "indigo" : "initial"}`,
                      }}
                    >
                      {parse(item.dropVal, optionSelectStaticMathField)}
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
      <div className={styles.HorizontalPictureDragDropFlexBox2}>
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.HorizontalPictureDragDropBox}`}
            style={{ border: "none" }}
          >
            {items.show && (
              <Draggable disabled={true}>
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
const Box = styled.div`
  min-height: 50px;
  height: auto;
  width: auto;
  text-align: center;
  min-width: ${(props) => (!props.bgColor ? 80 : 80)}px;

  border: ${(props) => (props.bgColor ? "0" : "1")}px dashed black;
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
  margin-top: 1rem;
  //justify-content:center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
