import React, { useContext } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentVertical from "./ContentVertical";
import { useState, useRef, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import VerticalSelect from "./VerticalChoiceType/VerticalSelectChoice/VerticalSelectChoice";
import { ProgressBorder } from "../../../../../Modal2/modal2";
import DisabledVerticalDragDrop from "./VerticalChoiceType/DisabledVerticalDragDrop/DisabledVerticalDragDrop";

const validationForSelectChoice = (choices, questionContent) => {
  let val = null;
  let n = choices?.length;
  for (let items of choices) {
    if (items.show) {
      val = items.val;
      break;
    }
  }
  if (val === null) return 0;
  let arr = questionContent;
  console.log(val);
  for (let rows of arr) {
    for (let items of rows) {
      if (items.isMissed === "true") {
        if (String(items.value).trim() === String(val).trim()) {
          return 2;
        } else return 1;
      }
    }
  }
};
const changeAnswerStatus = (val, setIsAnswerCorrect, setHasAnswerSubmitted) => {
  if (val === 0) {
    alert("please choose the answer");
    return;
  } else if (val === 1) setIsAnswerCorrect(false);
  else setIsAnswerCorrect(true);
  setHasAnswerSubmitted(true);
};
export default function Vertical({ state, totalRows, totalCols, meter }) {
  meter = Number(meter) || 0;
  let totalEmptyBox = 0;
  state?.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  const hasAnswerSubmitted = true;

  const inputRef = useRef(new Array(totalEmptyBox));

  return (
    <div>
      <div id="preview">
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div className={styles.marginTopborder3}>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          {state?.choiceType === "keying" ? (
            <ContentVertical
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
            />
          ) : state?.choiceType === "selectchoice" ? (
            <VerticalSelect
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              choices={state?.choices}
            />
          ) : state?.choiceType === "dragdrop" ? (
            <DisabledVerticalDragDrop
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              choices={state?.choices}
            />
          ) : (
            <h1>Unsupported file types...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
