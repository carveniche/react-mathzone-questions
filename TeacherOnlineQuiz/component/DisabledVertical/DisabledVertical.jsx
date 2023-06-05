import React from "react";
import HtmlParser from "react-html-parser";
import { useState, useEffect } from "react";
import styles from "../../../OnlineQuiz.module.css";
import DisabledQuizSolution from "../DisabledQuizSolution";
import DisabledContentVertical from "./DisabledContentVertical";
export default function DisabledVertical({ state, totalRows, totalCols }) {
  let totalEmptyBox = 0;
  state?.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  let [choices, setChoices] = useState([]);
  useEffect(() => {
    setChoices(state?.choices?.reverse());
  }, []);
  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
        </div>
        <div>
          <div className={styles.border}>
            <div></div>
          </div>
        </div>
        <div className={styles.contentParent}>
          <DisabledContentVertical
            content={state.questionContent}
            totalRows={Number(totalRows)}
            totalCols={Number(totalCols)}
          />
        </div>
      </div>
      <div>
        <div>
          <div className={styles.parentSolutionMargin}>
            <div>
              <div>
                <b>Correct Solution</b>
              </div>
              <div style={{ color: "black" }}>
                <b>{choices ? choices?.map((item) => item) : "No"}</b>
              </div>
              <div></div>
            </div>
          </div>
          <DisabledQuizSolution model={state?.solution?.model} />
        </div>
      </div>
    </div>
  );
}
