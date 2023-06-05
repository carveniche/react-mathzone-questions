import React, { useContext } from "react"
import styles from "./custom.module.css";
import { useState } from "react";
import styles2 from "../OnlineQuiz.module.css"
import styled from "styled-components"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ProgressBorder } from "../../../../../Modal2/modal2";
// let data = {
//   operation: "addition",
//   type: "hundreds_chart",
//   rows: 1,
//   cols: 70,
//   questionName: "Find the missing number.",
//   questionContent: [{ row: 1, col: 62, value: "62", isMissed: "true" }],
//   solution: { model: [{ val: "The missing number is 62." }], sidebyside: [] },
//   choices: ["65", "56", "62", "61"],
//   choiceType: "selectchoice",
//   choiceCount: 4,
//   answer: "56",
// };
function DisabledTeacherHundredChart({data,meter}) {
  meter=Number(meter)||0
  const [prevState,setPrevState]=useState(-1)
  const hasAnswerSubmitted=true
  const handleClick = (id,i) => {
      if(hasAnswerSubmitted)
      return
    
  };
  let arr = [];
  for (let i = 0; i < data.cols / 20; i++) {
    let temp = Array(20)
      .fill(0)
      .map((e, j) => j + 1 + 20* i);

    arr.push(
      <div className={styles.flex}>
        {temp.map((e, j) => {
          if (e === Number(data.answer)) {
            return <div className={styles.brown1}>{"??"}</div>;
          } else {
            return <div className={styles.brown}>{e}</div>;
          }
        })}
      </div>
    );
  }
  return (
      <div>
         
    <div className={styles.outer}>
    <div className={styles2.questionName}>{HtmlParser(data?.questionName)}</div>
    {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
    <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
    <div>
      <div className={styles.bottom}>{arr}</div>

    <FlexBox>
      {data.choices.map((k, i) => (
        <div className={prevState==i ? styles.answer1 : styles.answer}  onClick={() => {
            handleClick(k,i);
          }}>
          <div
            className={styles.circle}
            
          >
            {String.fromCharCode(65 + i)}
          </div>
          <div className={styles.ans}>{Number(k)}</div>
        </div>
      ))}
     </FlexBox>
    </div>
    </div>
    </div>
  );
}

export default DisabledTeacherHundredChart;
const FlexBox=styled.div`
display:flex;
gap:1rem;
flex-wrap:wrap;
> div{
    width:calc(50% - 1rem);
}

`