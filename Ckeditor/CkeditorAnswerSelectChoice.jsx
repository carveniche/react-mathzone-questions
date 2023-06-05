import React, { useEffect } from "react"
import {useState,useRef} from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
export default function CkeditorAnswerSelectChoice({choices}){
    
    let [choicesState,setChoicesState]=useState([])

    useEffect(()=>{
        let arr=[]
        choices?.map((item)=>{
            let obj={...item,show:false}
            arr.push({...obj})
        })
        setChoicesState([...arr])
    },[])
  
   let index=1
    return <div className={styles.MultipleChoiceFlexBox} >
    {choicesState?.map((value,i)=>(value.choices||value?.choice_image)&&<div className={`${styles.flex}  ${i===index?styles.selectedChoiceType:styles.prevSelectionAnswerSelection}`} style={{padding:`${value?.choice_image?0.5:1}rem 1rem`}} key={i}>
        <div> <b>{String.fromCharCode(65 + i)}</b></div>
       <div  className={`${styles.flex} ${styles.flexDirectionColumn}` }>
        {value.choices&&<div key={i} >{HtmlParser(value.choices)}</div>}
        {value?.choice_image&&<div className="choiceImage"><img src={value?.choice_image} /></div>}
        </div>
    </div >)}
        </div >
}
