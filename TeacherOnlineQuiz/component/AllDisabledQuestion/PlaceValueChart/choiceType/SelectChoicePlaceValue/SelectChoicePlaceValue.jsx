import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import numberSystemConverter from "../../../../../../../CommonJSFiles/numberSystemConverter";
export default function SelectChoicePlaceValue({
  isAnswerSubmitted,
  content,
  dropRef,
  totalRows,
  totalColumns,
  choices,
  numberSystem,
  state
}) {
  totalColumns = Number(totalColumns) || 1;
  const [numbers, setNumbers] = useState([]);
  const [rows, setRows] = useState([]);
  const prev = useRef(0);
  const [choicesState, setChoicesState] = useState([]);
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      content[i]?.map((item, j) => {
        item.row == i && item.col == j && rows.push({ ...item });
      });
    }
    let temp = [];

    choices?.map((item) => {
      let obj = { value: item, show: false };
      temp.push({ ...obj });
    });
    let n = Number(totalColumns) || 0;
    let temp2 = numberSystemConverter(n,numberSystem,String(state?.chartType).trim()?.toLowerCase());
     setNumbers([...temp2]);
    setRows([...rows]);
    setChoicesState([...temp]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (isAnswerSubmitted) return;

    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  dropRef.current = choicesState;
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <Grid totalCols={Number(totalColumns)}>
          {numbers?.map((item, i) => (
            <div className={`${(i + 1) % totalColumns == 0 && "rightBorder"}`}>
              <div>
                <b>{typeof item == "string" ? HtmlParser(item) : item}</b>
              </div>
            </div>
          ))}
          {rows?.map((items, index) =>
            items?.isMissed == "false" ? (
              <div
                key={index}
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <div>
                  {typeof items.value == "string"
                    ? HtmlParser(items?.value)
                    : items?.value}
                </div>
              </div>
            ) : (
              <div
                className={`borderBottom ${
                  (index + 1) % totalColumns == 0 && "rightBorder"
                }`}
              >
                <Box id={index} bgColor={false}></Box>
              </div>
            )
          )}
        </Grid>
        <div
          className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
        >
          {choicesState?.map((value, i) => (
            <div
              className={`${styles.flex} ${styles.choiceType} ${
                styles.selectChoicesFont
              } ${
                value.show
                  ? styles.selectedChoiceType
                  : styles.prevSelectionAnswerSelection
              }`}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div>
                {" "}
                <b>{String.fromCharCode(65 + i)}</b>
              </div>
              <div key={i}>{HtmlParser(value?.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Grid = styled.div`
  display: Grid;
  width: 100%;
  min-width: 100px;
  margin: 2rem 0;
  max-width: 100%;
  height: auto;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
  border: 1px solid black;
  overflow: auto;

  > div {
    display: relative;
    display: flex;

    justify-content: center;
    align-items: center;
    word-break: break;
    padding: 1rem 0.4rem;
    border-right: 1px solid black;
    height: auto;
  }
  > .borderBottom {
    border-top: 1px solid black;
  }
  > .rightBorder {
    border-right: 0px solid black;
  }
  > div > div {
    word-break: break;
    height: auto;
  }
`;
const Input = styled.input`
  height: 50px;
  text-align: center;
  width: 80px;
`;
const Box = styled.div`
position:relative;
cursor:pointer;

  min-width:50px;
  min-height:50px;
  width:auto;
height:auto
border-radius:20px;
border:${(props) => (props.bgColor ? 0 : "1")}px solid indigo;
flex-wrap:wrap;
word-break: break-word;
display:flex;
justify-content:center;
align-items:center;
color:white;
max-width:inherit;
> div{
  min-width:100%;
  min-height:50px;
display:flex;
flex-wrap:wrap;
word-break: break-word;
justify-content:center;
align-items:center;
background:indigo;
max-width:95%;
height:auto;
}`;
