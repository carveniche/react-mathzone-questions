import React, { useContext, useEffect } from "react"
import {useState,useRef} from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
export default function SelectMultipleSelect({choices,inputRef,answerHasSelected,choiceId}){
    
    let [choicesState,setChoicesState]=useState([])
    const {isStudentAnswerResponse}=useContext(ValidationContext)
    choiceId=choiceId?.map((item)=>item.toString())
    let prev=useRef(0)
    useEffect(()=>{
        let arr=[]
        choices?.map((item)=>{
            let obj={...item,show:false}
            arr.push({...obj})
        })
        setChoicesState([...arr])
    },[])
    const handleChoiceSelection=(i)=>{
        if(answerHasSelected||isStudentAnswerResponse)
        return
        choicesState[i].show=!choicesState[i].show
        setChoicesState([...choicesState])
     
      
    }
  
    inputRef.current=choicesState
    return <div className={styles.multiSelectFlexBox}>
    {choicesState?.map((value,i)=>(value.choices||value?.choice_image)&&<div className={`${styles.flex}  ${(isStudentAnswerResponse&&choiceId?.includes(String(value?.choice_id)?.trim()
))?styles.selectedChoiceType:value.show?styles.selectedChoiceType:styles.prevSelectionAnswerSelection}`} style={{padding:`${value?.choice_image?0:1}rem 1rem`}} key={i}onClick={()=>handleChoiceSelection(i) }>
        <div className="mathzone-circle-selectbox"> <b>{String.fromCharCode(65 + i)}</b></div>
       <div  className={`${styles.flex} ${styles.flexDirectionColumn}` }>
        {value.choices&&<div key={i} >{HtmlParser(value.choices)}</div>}
        {value?.choice_image&&<div className="choiceImage"><img src={value?.choice_image} /></div>}
        </div>
    </div >)}
        </div >
}

