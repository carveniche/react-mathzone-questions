import React from "react";
import { useEffect, useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import OnlineQuizSolutionModel from "../../../OnlineQuizSolutionModel";
import DisabledContentHorizontalFillUps from "./DisabledContentHorizontalFillUps";

export default function DisabledHorizontalFillUps({ state, totalRows, totalCols }) {
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  let [rows, setRows] = useState([]);
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);
  useEffect(() => {
    let rows = [];
    let totalEmptyBox = 0;

    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      state?.questionContent.map((item) => item.row == i && temp.push(item));
      rows.push(temp);
    }
    state?.questionContent?.map(
      (item) => item.isMissed === "true" && totalEmptyBox++
    );
    setTotalEmptyBox(totalEmptyBox);
    setRows(rows);
  }, []);
  
  return (
    <div>
      <div>
        <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
        <div>
          <div className={styles.border}>
            <div></div>
          </div>
        </div>
        <div className={styles.contentParent}>
          <DisabledContentHorizontalFillUps
            content={rows}
          />

        </div>
      </div>
      <div>
        <div>
          <div>
            <div><div>
              Correct Solution
            </div>
              <div style={{ color: 'black' }}>
                <b>{"No"}</b>
              </div>
              <div>

              </div>
            </div>
          </div>

          <OnlineQuizSolutionModel model={state?.solution?.model} />

        </div>
      </div>
    </div>
  );
}
