import React, { useContext, useEffect } from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"
import BlockBaseImageChoiceSelection from "./BlockBaseImageChoiceSelection"
import BlockBaseQuestionContent from "./BlockBaseQuestionContent";
import styles from "../OnlineQuiz.module.css";
import {useState,useRef} from "react"
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";

export default function BlockBaseImage({state,totalRows,meter}){
    meter=Number(meter)||0
    totalRows=Number(totalRows)
    const [redAlert,setRedAlert]=useState(false)
    let rows=[]
    for(let i=0;i<totalRows;i++)
    {
        let temp=[]
        state.questionContent.map((items)=>items.map((item)=>item.row==i&&temp.push(item.value)))
        rows.push(temp)
    }
    const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,setQuestionWithAnswer,isStudentAnswerResponse}=useContext(ValidationContext)
    const valueRef=useRef()
    const [hasOptionSelected,setHasOptionSelected]=useState(false)
    const handleSubmitAnswer=()=>{
        if(!hasOptionSelected){
            setRedAlert(true)
            return
        }
       
        setQuestionWithAnswer({...state,[student_answer]:valueRef?.current})
        setHasAnswerSubmitted(true)
        let jsonData=serializeResponse("studentAnswerResponse")
        setStudentAnswerQuestion(jsonData)
    }

    return <div>
       
        {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} answerHasSelected={hasAnswerSubmitted}/>}
        {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
       <div id="studentAnswerResponse">
        <div className={styles.questionName}>{HtmlParser(state.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
         <ConditionOnProgressBar meter={meter}/>
        </div>
        <div className={styles.contentParent} >
        <BlockBaseQuestionContent questionContent={rows}/>
        <BlockBaseImageChoiceSelection choices={state.choices} correctAnswer={state.answer} setIsAnswerCorrect={setIsAnswerCorrect} hasAnswerSubmitted={hasAnswerSubmitted} setHasOptionSelected={setHasOptionSelected} valueRef={valueRef} studentAnswer={state[student_answer]}/>
        </div>
        </div>
    </div>
}
