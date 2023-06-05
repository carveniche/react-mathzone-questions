import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import styles from "../../../../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";

export default function DsbChoiceDNDMatchObjVertEqn({
  content,
  choices,
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
        <div key={index}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div
                className={styles.MatchObjectVerticalDragDropFlexBox3}
                style={{ fontSize: 16, fontWeight: "bold" }}
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
              <div className={styles.MatchObjectVerticalDragDropFlexBox3}>
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
                      border: `${item.show ? 0 : 1}px dashed black`,
                    }}
                  >
                    {item.show && (
                      <Draggable disabled={true}>
                        <div>
                          {parse(item.dropVal, optionSelectStaticMathField)}
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
      <div className={styles.MatchObjectVerticalDragDropBoxFlexBox2}>
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.MatchObjectVerticalDragDropBox}`}
            style={{
              border: `${true ? 0 : 1}px dashed black`,
            }}
          >
            {items.show && (
              <Draggable disabled={true}>
                <div>{parse(items.val, optionSelectStaticMathField)}</div>
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
  flex-wrap: wrap;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Box = styled.div`
  min-height: 60px;
  height: auto;
  width: auto;
  text-align: center;
  min-width: ${(props) => (!props.bgColor ? 140 : 140)}px;

  border: ${(props) => (props.bgColor ? "0" : "1")}px dashed black;
  > div {
    background-color: indigo;
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
  width: 80%;
  margin: 1rem 0;
  display: flex;
  gap: 4rem;
  align-items: center;

  > div {
    max-width: calc(50% - 2rem);
    min-width: 90px;
    width: auto;
  }
  > div {
    display: flex;
    justify-content: left;
  }
  > .fontSize {
    font-weight: 600;
  }
`;
