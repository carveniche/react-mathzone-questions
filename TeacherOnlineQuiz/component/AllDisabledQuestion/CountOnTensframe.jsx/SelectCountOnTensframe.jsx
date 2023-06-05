import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";

import styles from "../OnlineQuiz.module.css";
export default function SelectCountOnTensframe({ choices,inputRef }) {
  
  let [choicesState,setChoicesState]=useState([])
  const prev = useRef(0);
  const hasAnswerSubmitted=true
  const handleChoiceSelection=(i)=>{
   
    if(hasAnswerSubmitted)
    return
   
    choicesState[prev.current].show=false
    choicesState[i].show=true
    setChoicesState([...choicesState])
    prev.current=i
}
useEffect(()=>{
  let arr=[]
  choices?.map((item)=>{
      let obj={value:item,show:false}
      arr.push({...obj})
  })
  setChoicesState([...arr])
},[])
  inputRef.current=choicesState
  return (
    <div>
      <FlexBox >
    {choicesState?.map((value,i)=><div className={`${value.show?styles.selectedChoiceType:styles.prevSelectionAnswerSelection}`}  key={i} onClick={()=>handleChoiceSelection(i) }>
        <div> <b>{String.fromCharCode(65 + i)}</b></div>
     
        <div key={i} >{HtmlParser(value.value)}</div>
        
    </div >)}
        </FlexBox >
    </div>)
}


const FlexBox=styled.div`
display:flex;
flex-wrap:wrap;
gap:0.5rem;
width:90%;
margin-Top: 1.5rem;
cursor: pointer;
> div{
    min-width:Calc(50% - 0.5rem);
    max-width:Calc(50% - 0.5rem);
   
    flex:1;
    display:flex;
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
align-items: center;
padding-left:18px;
color: #233584;
border-radius: 12px;
word-break:break;
min-height: auto;
height: 60px;

gap: 2rem;

border: 1px solid black;

height:auto;
min-height:60px;

 
}

`