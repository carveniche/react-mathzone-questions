import React from "react";
import { useRef, useState,useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../../../OnlineQuiz.module.css";
import DisabledQuizSolution from "../DisabledQuizSolution";
import DisabledDropBoxes from "./DisabledDropBoxes";
export default function DisabledDragAndDrop({ state, totalRows, totalColumns }) {

  let rows = [];
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(true);
  const dropRef = useRef(rows);
 

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
    
          
        <DisabledDropBoxes
          content={state.questionContent}
          totalRows={Number(totalRows)}
          state={state}
          isAnswerSubmitted={isAnswerSubmitted}
          dropRef={dropRef}
          totalCols={Number(totalColumns)}
        />

     
      </div>
      </div>
        
      <div >
              <div>
              <div>
                <div><div>
                  Correct Solution
                </div>
                  <div style={{ color: 'black' }}>
                    <b>{state?.answer ? state?.answer : "No"}</b>
                  </div>
                  <div>

                  </div>
                </div>
              </div>
               <DisabledQuizSolution model={state?.solution?.model} />
              
              </div>
            </div>
    </div>
  );
}
