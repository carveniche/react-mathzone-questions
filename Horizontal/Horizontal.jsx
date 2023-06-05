import React, { useContext, useEffect } from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"
import ContentHorizontal from "./ContentHorizontal"
import {useRef} from "react"
import styles from "../OnlineQuiz.module.css"
import SolveButton from "../SolveButton"
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage"
export default function Horizontal({state,totalRows,totalCols})
{
   
    let totalEmptyBox=0
     state?.questionContent?.map((items)=>items.map((item)=>item.isMissed!=="false"&&totalEmptyBox++))
     const inputRef=useRef(new Array(totalEmptyBox))
     const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect}=useContext(ValidationContext)
     const handleSubmitAnswer=()=>{
    
        if(hasAnswerSubmitted)
        return
       for(let i=0;i<inputRef.current?.length;i++)
       if(!String(inputRef.current[i].children[0].value).trim())
       {
           alert('please fill all the boxes')
           return
       }
        for(let i=0;i<inputRef.current?.length;i++)
        if(String(inputRef.current[i].children[0].value).trim()!==String(inputRef.current[i].getAttribute("value")))
        {
            setHasAnswerSubmitted(true)
            return
        }
       setIsAnswerCorrect(true)
       setHasAnswerSubmitted(true)
    }
    
    return <div>
             <SolveButton onClick={handleSubmitAnswer} answerHasSelected={hasAnswerSubmitted}/>
<div >
       <div className={styles.questionName}>
           {HtmlParser(state?.questionName)}
       </div>
       <div>
          <div className={styles.border3}>
            <div></div>
          </div>
        </div>
        <div className={styles.contentParent}>
       <ContentHorizontal content={state?.questionContent} totalEmptyBox={totalEmptyBox} inputRef={inputRef} hasAnswerSubmitted={hasAnswerSubmitted}/>
     
    </div>
    </div>
    </div>
}