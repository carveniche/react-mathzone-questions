import React, { useContext, useEffect } from "react";
import HtmlParser from "react-html-parser";
import {useRef} from "react";
import styles from "../OnlineQuiz.module.css";
import SelectMultipleChoice from "./SelectMultipleChoice";
import { ProgressBorder } from "../../../../../Modal2/modal2";



export default function MultipleChoice({ state,meter,resultView }) {
    
   meter=Number(meter)||0
    const inputRef = useRef();
   
  let showAnswer=true

  
  

   
    return <div>
        
      
        
        <div className={`${styles.questionName} ${styles.MultipleChoicequestionName}`} style={{whiteSpace:'initial'}}>{HtmlParser(state?.question_text)}</div>
        {state?.upload_file_name && <div><img src={state?.upload_file_name} alt="Image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div  >         
            <SelectMultipleChoice
              choices={state?.choice_data}
              answerHasSelected={showAnswer}
              inputRef={inputRef}
              resultView={resultView}

            />
          
       
          
          </div>
                  
    </div>
  }
  