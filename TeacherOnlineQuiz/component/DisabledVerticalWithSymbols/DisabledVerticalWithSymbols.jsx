import React from "react";
import HtmlParser from "react-html-parser";
import { ProgressBorder } from "../../../../Modal2/modal2";
import styles from "../../../OnlineQuiz.module.css";
import ContentVerticalSymbols from "../../../VerticalWithSymbols/ContentVerticalSymbols";
import DisabledQuizSolution from "../DisabledQuizSolution";
import DisabledSelectVerticalSymbols from "./DisabledSelectVerticalSymbols";
export default function DisabledVerticalWithSymbols({
  state,
  totalRows,
  totalCols,
  meter
}) {
  meter=Number(meter)||0
  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <ContentVerticalSymbols
            content={state?.questionContent}
            contentText={state.ContentQuestionTextImage}
          />
          <DisabledSelectVerticalSymbols 
            choices={state?.choices}
          />
        </div>
      </div>
    </div>
  );
}
