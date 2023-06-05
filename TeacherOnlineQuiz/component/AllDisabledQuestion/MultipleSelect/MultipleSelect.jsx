import React, { useContext, useEffect } from "react";
import HtmlParser from "react-html-parser";
import {useRef} from "react";
import styles from "../OnlineQuiz.module.css";
import SelectMultipleSelect from "./SelectMultipleSelect";
import { ProgressBorder } from "../../../../../Modal2/modal2";
export default function MultipleSelect({ state,meter,resultView }) {
    
   meter=Number(meter)||0
    const inputRef = useRef();
    const hasAnswerSubmitted=true
     return <div>
        <div className={`${styles.questionName} ${styles.MultipleChoicequestionName}`}>{HtmlParser(state?.question_text)}</div>
        <div><img src={state?.upload_file_name} /></div>
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div  >         
            <SelectMultipleSelect
              choices={state?.choice_data}
              answerHasSelected={hasAnswerSubmitted}
              inputRef={inputRef}
              resultView={resultView}

            />
          
       
          
          </div>
                  
    </div>
  }
  