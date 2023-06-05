import React from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../../../OnlineQuiz.module.css";
import DisabledDropBoxesImageCompare from "./DisabledDropBoxesImageCompare";
import DisabledQuizSolution from "../DisabledQuizSolution";
export default function DisabledDragAndDropImageCompare({ state, totalRows, totalColumns }) { 
  let rows = [];
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  return (
    <div>
      <div>
      <div className={styles.questionName}>{HtmlParser(state.questionName)}</div>
      <div>
          <div className={styles.border}>
            <div></div>
          </div>
        </div>
      <div className={styles.contentParent}>
        <DisabledDropBoxesImageCompare
          content={state.questionContent}
          totalRows={Number(totalRows)}
          state={state}
          totalCols={Number(totalColumns)}
        />     
    </div>
    </div>
    <div>
              <div>
              <div>
                <div><div>
              <b>  Correct Solution</b>
                </div>
                  <div style={{ color: 'black' }}>
                    <b>{state?.answer ? state?.answer : "No"}</b>
                  </div>
                  <div>

                  </div>
                </div>
              </div>
              
               <DisabledQuizSolution   model={state?.solution?.model} />
              
              </div>
            </div>
    </div>
  );
}
