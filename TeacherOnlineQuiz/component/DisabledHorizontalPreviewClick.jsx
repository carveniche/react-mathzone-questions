import React from 'react';
import { useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import { ProgressBorder } from '../../../Modal2/modal2';
import styles from "../../OnlineQuiz.module.css";
import DisabledHorizontalPreviewContent from './DisabledHorizontalPreviewContent';
import DisabledOnlineQuizSelectChoiceOption from './DisabledOnlineQuizSelectChoiceOption';
function DisabledHorizontalPreviewClick({obj,meter}) {
  const [state, setState] = useState();
  meter=Number(meter)||0
  
  useEffect(() => {
    setState({...obj})
   
  }, []);
 
 
  return (
    <div
    >

      <div >
        <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div>
          
           
          
          {Boolean(state?.rows) && Boolean(state?.cols) && (
            <DisabledHorizontalPreviewContent
              totalRows={state?.rows}
              totalColumn={state?.cols}
              content={state?.questionContent}
            />
          )}
          {Boolean(state?.choiceType === "selectchoice") && (
            <DisabledOnlineQuizSelectChoiceOption
              choices={state?.choices}
            />
          )}
        </div>
        
      </div>
    </div>
  );
}
export default DisabledHorizontalPreviewClick;
