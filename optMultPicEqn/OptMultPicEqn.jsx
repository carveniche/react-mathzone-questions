import React, { useContext, useEffect } from "react";
import {useState,useRef} from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import OptMultPicChoiceSelectEqn from "./OptMultPicChoiceSelectEqn";
import parse from "html-react-parser"
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import  { findSelectedValue,  } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
const validationForSelectMultipleSelect=(choices)=>{
let n=choices?.length||0
for(let i=0;i<n;i++)
{
  if(choices[i].show==true)
  {
    if(String(choices[i].show).trim()==String(choices[i].selected).trim())
    return 2
    else 
    return 1
  }
}
return 0
}
function OptMultPicEqn({ state, totalRows,meter,response=false }) {
  meter=Number(meter)||0
  
  const [redAlert,setRedAlert]=useState(false)
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,setQuestionWithAnswer,isStudentAnswerResponse}=useContext(ValidationContext)
    const showAnswer=hasAnswerSubmitted
    const setShowAnswer=setHasAnswerSubmitted
    const inputRef=useRef()
    const handleSubmitAnswer = () => {
     if(showAnswer)
     return
      let val=validationForSelectMultipleSelect(inputRef?.current)
      if(val==0)
      {
        setRedAlert(true)
        return
      }
      else if(val==1)
      setIsAnswerCorrect(false)
      else if(val==2)
      setIsAnswerCorrect(true)
      let value=findSelectedValue(inputRef.current,"value")
      
      setQuestionWithAnswer({...state,[student_answer]:value})
      setShowAnswer(true);
    };
   
    
    return <>
    
    
    <div>
        
       {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} answerHasSelected={showAnswer}/>}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
        <div id="studentAnswerResponse"> 
        <div  className={`${styles.questionName} ${styles.mathquill_mathzone_questionname}`}>{parse(state?.questionName,optionSelectStaticMathField)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
         <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div class={styles.contentParent} >
        {Boolean(totalRows) && (
            <OptMultPicChoiceSelectEqn
              totalRows={totalRows}
              choices={state?.questionContent}
              totalColumns={state.col} 
              isAnswerSelected={showAnswer}
              inputRef={inputRef}
              studentAnswer={state[student_answer]}
            />
          )}
       
          </div>
          </div>
            
    </div>
   
    </>
  }
  export default OptMultPicEqn;
