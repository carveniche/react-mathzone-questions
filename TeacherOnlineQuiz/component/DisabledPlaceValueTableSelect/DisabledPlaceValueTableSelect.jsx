import React from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"
import DisabledQuizSolution from "../DisabledQuizSolution"
import styles from "../../../OnlineQuiz.module.css"
import DisabledContentPlaceValueTableSelect from "./DisabledContentPlaceValueTableSelect"
export default function DisabledPlaceValueTableSelect({state,totalRows}){
     
    let totalEmptyBox=0
   state.questionContent?.map((items)=>items.map((item)=>item.isMissed!=="false"&&totalEmptyBox++))
    return <div>
      <div>
        <div className={styles.questionName}>     
            {HtmlParser(state.questionName)}
        </div>
        <div>
          <div className={styles.border3}>
            <div></div>
          </div>
        </div>
        <div className={styles.contentParent}>    
        <DisabledContentPlaceValueTableSelect content={state.questionContent} questionHead={state.questiontbHead} totalCols={Number(state?.cols)}/>
       
        </div>
       </div>
       <div>
              <div className={styles.parentSolutionMargin}>
              <div >
                <div><div>
                <b>Correct Solution</b>
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
}