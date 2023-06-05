import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import {useRef} from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import SelectMultipleChoice from "./SelectMultipleChoice";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
export default function MultipleChoice({ state,meter,choiceId }) {
    
   meter=Number(meter)||0
    const inputRef = useRef();
    const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,isStudentAnswerResponse}=useContext(ValidationContext)
  let showAnswer=hasAnswerSubmitted
  let setShowAnswer=setHasAnswerSubmitted
  const [redAlert,setRedAlert]=useState(false)
    const handleSubmitAnswer = () => {
      if (showAnswer) {
        
        return;
      }
      let arr=inputRef.current;
      let n=arr?.length||0
      for(let i=0;i<n;i++)
      {
          if(arr[i].show)
          {
            if(arr[i]?.show==arr[i]?.correct)
            {
                setIsAnswerCorrect(true)
               
                
            }
            else{
                setIsAnswerCorrect(false)
            }
            setChoicesId(arr[i]?.choice_id)
            let jsonData=serializeResponse("studentAnswerResponse")
            setStudentAnswerQuestion(jsonData)
            setShowAnswer(true);
            return
          }
      }
   setRedAlert(true)
    };
  

   
    return <div>
        
        {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
        <div id="studentAnswerResponse">
        <div className={`mathzoneQuestionName mathzoneMultipleChoicequestionName`} style={{whiteSpace:'initial'}}>{parse(state?.question_text)}</div>
        {String(state?.upload_file_name).trim()&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
         <ConditionOnProgressBar meter={meter}/>
        </div>
        <div  >         
            <SelectMultipleChoice
              choices={state?.choice_data}
              answerHasSelected={showAnswer}
              inputRef={inputRef}
              choiceId={choiceId}
            />
          
       
          </div>
          </div>
                  
    </div>
  }
  