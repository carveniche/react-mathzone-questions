import React from "react";
import HtmlParser from "react-html-parser";
import { ProgressBorder } from "../../../../Modal2/modal2";
import styles from "../../../OnlineQuiz.module.css";
import ContentQuestionTextImage from "../../../QuestionTextImage/ContentQuestionTextImage";
import DisabledQuizSolution from "../DisabledQuizSolution";
import DisabledSelectQuestionTextImage from "./DisabledSelectQuestionTextImage";
export default function DisabledQuestionTextImage({ state, meter }) {
  meter = Number(meter) || 0;
  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <ContentQuestionTextImage
            content={state?.questionContent}
            contentText={state.ContentQuestionTextImage}
          />
          <DisabledSelectQuestionTextImage choices={state?.choices} />
        </div>
      </div>
    </div>
  );
}
