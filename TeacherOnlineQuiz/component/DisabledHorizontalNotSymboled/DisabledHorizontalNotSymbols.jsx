import React from "react";
import HtmlParser from "react-html-parser";
import styles from "../../../OnlineQuiz.module.css";
import ContentHorizontalNotSymbols from "../../../Horizontalnotsymbols/ContentHorizontalNotSymbols";
import DisabledSelectChoiceHorizontalNotSymbol from "./DisabledSelectChoiceHorizontalNotSymbol";
import { ProgressBorder } from "../../../../Modal2/modal2";

function DisabledHorizontalNotSymbols({ state, totalRows,meter }) {

  meter=Number(meter)
    return <div >
     
        <div>
        <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
      
        <div className={styles.questionName}>{typeof state?.questionContentText=="string"?HtmlParser(state?.questionContentText):state?.questionContentText}</div>

        {Boolean(totalRows) && (
            <ContentHorizontalNotSymbols
              totalRows={totalRows}
              content={state?.questionContent}
            />
          )}  
           <div>
              <DisabledSelectChoiceHorizontalNotSymbol choices={state.choices} />
              </div>

            </div>
           
            </div>   
    </div>
  }
  export default DisabledHorizontalNotSymbols;
