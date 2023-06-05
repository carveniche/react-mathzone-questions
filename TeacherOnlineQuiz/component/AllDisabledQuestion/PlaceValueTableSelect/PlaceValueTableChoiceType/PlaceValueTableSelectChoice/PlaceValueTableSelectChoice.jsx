import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { FlexBox, Grid } from "../../ContentPlaceValueTableSelect";

export default function ContentPlaceValueTableSelect({
  content,
  questionHead,
  totalCols,
  choices,
}) {
  let [choicesState, setChoicesState] = useState([]);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);

 
  return (
    <div>
      <Grid>
        <FlexBox totalCols={totalCols} backgroundColor="orange">
          {questionHead?.map((item, i) => (
            <div key={i}>{typeof item?.value=="string"?HtmlParser(item?.value):item?.value}</div>
          ))}
        </FlexBox>
        {content?.map((items, index) => (
          <FlexBox key={index} totalCols={totalCols}>
            {items.map((item, i) =>
              item?.isMissed !== "true" ? (
                <div key={i}>{typeof item.value=="string"?HtmlParser(item?.value):item?.value}</div>
              ) : (
                <div>
                  <input disabled={true} />
                </div>
              )
            )}
          </FlexBox>
        ))}
      </Grid>
      <FlexBox2>
        {choicesState?.map((value, i) => (
          <div
            className={`${styles.flex}  ${
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            style={{ padding: `${value?.choice_image ? 0.5 : 1}rem 1rem` }}
            key={i}
          >
            <div>
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div>{<div key={i}>{HtmlParser(value.value)}</div>}</div>
          </div>
        ))}
      </FlexBox2>
    </div>
  );
}




const FlexBox2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 90%;
  margin-top: 1.5rem;
  cursor: pointer;
  > div {
    min-width: Calc(50% - 0.5rem);
    max-width: Calc(50% - 0.5rem);

    flex: 1;
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
    border-radius: 12px;
    word-break: break;
    min-height: auto;
    height: 60px;

    gap: 2rem;

    border: 1px solid black;

    height: auto;
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
  * .choiceImage {
    padding: 0;
  }
`;
