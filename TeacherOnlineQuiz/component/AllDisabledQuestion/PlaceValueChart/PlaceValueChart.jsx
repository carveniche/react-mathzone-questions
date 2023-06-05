import React, { useContext, useEffect } from "react";
import PlaceValueChartDragAndDrop from "./PlaceValueChartDragAndDrop";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import KeyingchoiceTypePlaceValueChart from "./choiceType/Keying/KeyingchoiceTypePlaceValueChart";
import SelectChoicePlaceValue from "./choiceType/SelectChoicePlaceValue/SelectChoicePlaceValue";
import { ProgressBorder } from "../../../../../Modal2/modal2";
const validationForDragAndDrop = (selectChoice) => {
  let n = selectChoice.length || 0;
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (!selectChoice[i].show) return 0;
    }
  }
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (selectChoice[i].dropVal != selectChoice[i].value) return 1;
    }
  }
  return 2;
};
const answerUpdationStatus = (
  setAnswerCorrectStatus,
  setAnswerSubmitStatus,
  val
) => {
  if (val === 0) {
    alert("please select all the answer...");
    return;
  } else if (val === 1) setAnswerCorrectStatus(false);
  else if (val === 2) setAnswerCorrectStatus(true);
  setAnswerSubmitStatus(true);
};
const validationForKeying = (selectChoice) => {
  let n = selectChoice.length || 0;
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (
        String(selectChoice[i].dropVal).trim() == "" ||
        selectChoice[i].dropVal == undefined
      )
        return 0;
    }
  }
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (
        String(selectChoice[i].dropVal).trim() !=
        String(selectChoice[i].value).trim()
      )
        return 1;
    }
  }
  return 2;
};

const validationForSelectChoice = (choices, content) => {
  let n = choices?.length || 0;
  let val = null;
  console.log(choices);
  for (let i = 0; i < n; i++) {
    if (choices[i].show) {
      val = choices[i].value;
      break;
    }
  }
  console.log(n === null, n);
  if (val === null) return 0;
  n = content?.length || 0;
  for (let i = 0; i < n; i++) {
    let m = content[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (content[i][j].isMissed == "true") {
        if (content[i][j].value != val) return 1;
      }
    }
  }
  return 2;
};
export default function PlaceValueChart({ state, totalRows, totalColumns,meter }) {
  meter=Number(meter)||0
  let rows = [];
  const hasAnswerSubmitted =true


  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  const dropRef = useRef(rows);
  return (
    <div>
    
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div>
          <div className={styles.contentParent}>
            {state?.choiceType == "dragdrop" && (
              <PlaceValueChartDragAndDrop
                state={state}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                numberSystem={state?.numberSystem}
              />
            )}
            {state?.choiceType == "keying" && (
              <KeyingchoiceTypePlaceValueChart
                content={state?.questionContent}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                numberSystem={state?.numberSystem}
                state={state}
              />
            )}

            {state?.choiceType == "selectchoice" && (
              <SelectChoicePlaceValue
                content={state?.questionContent}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                choices={state?.choices}
                numberSystem={state?.numberSystem}
                state={state}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
