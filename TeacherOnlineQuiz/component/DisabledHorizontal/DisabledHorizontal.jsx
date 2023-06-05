import React from "react"
import HtmlParser from "react-html-parser"
import styles from "../../../OnlineQuiz.module.css"
import DisabledQuizSolution from "../DisabledQuizSolution"
import DisabledContentHorizontal from "./DisabledContentHorizontal"
export default function DisabledHorizontal({ state, totalRows, totalCols }) {
  let totalEmptyBox = 0
  state?.questionContent?.map((items) => items.map((item) => item.isMissed !== "false" && totalEmptyBox++))
  
  return <div>
    <div >
      <div className={styles.questionName}>
        {HtmlParser(state?.questionName)}
      </div>
      <div>
        <div className={styles.border}>
          <div></div>
        </div>
      </div>
      <div className={styles.contentParent}>



        <DisabledContentHorizontal content={state?.questionContent} />

      </div>
    </div>
    <div>
      <div>
        <div>
          <div><div>
            Correct Solution
          </div>
            <div style={{ color: 'black' }}>
              <b>{state?.choices ? state?.choices : "No"}</b>
            </div>
            <div>

            </div>
          </div>
        </div>

        <DisabledQuizSolution model={state?.solution?.model} />

      </div>
    </div>
  </div>
}