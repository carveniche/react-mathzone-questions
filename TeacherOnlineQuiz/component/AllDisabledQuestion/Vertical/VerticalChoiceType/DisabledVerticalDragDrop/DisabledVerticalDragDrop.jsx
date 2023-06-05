import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import styles from "../../../../../../OnlineQuiz.module.css";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser";



export default function DisabledVerticalDragDrop({
  content,
  totalRows,
  totalCols,
 
  totalEmptyBox,
  inputRef,
  choices,
}) {
  
  let [choiceState, setChoicesState] = useState([]);
  const [dropState, setDropState] = useState([]);
  
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { val: item, show: true };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
    let temp = [...content];
    temp = temp.map((item) => {
      let arr = item?.map((items) => {
        let obj = { ...items, dropVal: "", show: false };
        return { ...obj };
      });
      return arr;
    });
    setDropState([...temp]);
  }, []);

  return (
    <div>
      <div style={{ marginTop: "4rem" }}>
        {dropState?.map((items, index) => (
          <div
            className={styles.VerticalDragDropFlexBox}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 80}px`,
            }}
            key={index}
            border={index === totalRows - 1 && "2px"}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                  {typeof item.value=="string"?HtmlParser(item?.value):item?.value}
                </div>
              ) : item?.show ? (
                <Draggable  disabled={true}>
                  <div
                    style={{
                      backgroundColor: "indigo",
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "50%",
                    }}
                  >
                    {typeof item?.dropVal=="string"?HtmlParser(item?.dropVal):item?.dropVal}
                  </div>
                </Draggable>
              ) : (
                <div
                  className={`${styles.verticalDropVal} verticalDropVal`}
                  style={{ border: "1px dashed black" }}
                  id={`${index} ${i}`}
                ></div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={styles.VerticalDragDropFlexBox2} id="verticalDragVal">
        {choiceState?.map((value, i) =>
          value?.show ? (
            <Draggable  disabled={true}>
              <div style={{ backgroundColor: "indigo", cursor: "pointer" }}>
                {typeof value.val=="string"?HtmlParser(value?.val):value?.val}
              </div>
            </Draggable>
          ) : (
            <div id={`${i}`}></div>
          )
        )}
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;

  align-items: center;
  border-top: ${(props) => (props.border ? props.border : 0)} solid black;
  width: ${(props) => props.totalWidth * 35}px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    font-size: 25px;
    font-weight: 600;
    color: indigo;
  }
`;
const Input = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
`;
const StylesInline = {
  Input: {
    width: "30px",
    height: "30px",
    textAlign: "center",
  },
};
const FlexBox2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 80%;
  margin-top: 2rem;
  cursor: pointer;
  > div {
    width: auto;

    display: flex;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    align-items: center;
    padding-left: 18px;
    color: #233584;
    border-radius: 5px;
    word-break: break;
    min-height: auto;
    height: 60px;

    gap: 2rem;

    border: 1px solid black;

    height: auto;

    padding: 1rem;
  }
  > div > div {
    min-width: auto;
    min-height: auto;
  }
  > div > div:nth-child(2) {
    flex: 1;
    display: flex;

    flex-wrap: wrap;
    word-break: break;
  }
`;
