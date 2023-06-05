import React from "react";
import { ProgressBar } from "react-bootstrap";
import HtmlParser from "react-html-parser";
import { ProgressBorder } from "../../../../Modal2/modal2";
import MyAnswer from "../../../AnswerFolder/myAnswer";
import styles from "../../../OnlineQuiz.module.css";
import DisabledQuizSolution from "../DisabledQuizSolution";
import parse from "html-react-parser"
import DisabledSelectChoiceOptionMultiplePicture from "./DisabledSelectChoiceOptionMultiplePicture";

function DisabledOptionMultipleChoice({ state, totalRows,meter }) {
  meter=Number(meter)
    return <><div>
        <div>
        <div className={styles.questionName}>{parse(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>

        

        {Boolean(totalRows) && (
            <DisabledSelectChoiceOptionMultiplePicture
              totalRows={totalRows}
              choices={state?.questionContent}
              totalColumns={state.col}
            />
          )}
       
          </div>
          </div>
        
    </div>

    </>
  }
  export default DisabledOptionMultipleChoice;
