import React, { useEffect } from "react"
import {useState,useRef} from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
export default function SelectMultipleSelect({choices,inputRef,answerHasSelected,resultView}){
    
    let [choicesState,setChoicesState]=useState([])
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
        if(answerHasSelected)
        return
        choicesState[i].show=!choicesState[i].show
        setChoicesState([...choicesState])
     
      
    }
    inputRef.current=choicesState
    return <FlexBox >
    {choicesState?.map((value,i)=>(value.choices||value?.choice_image)&&<div className={`${styles.flex}  ${value.show?styles.selectedChoiceType:styles.prevSelectionAnswerSelection} ${value?.correct===true&&resultView===true&&'correctChoicesMultiple'}`} style={{padding:`${value?.choice_image?0:1}rem 1rem`,position:'relative'}} key={i}onClick={()=>handleChoiceSelection(i) }>
        <div> <b>{String.fromCharCode(65 + i)}</b></div>
       <div  className={`${styles.flex} ${styles.flexDirectionColumn}` }>
        {value.choices&&<div key={i} >{HtmlParser(value.choices)}</div>}

        {value?.choice_image&&<div className="choiceImage"><img src={value?.choice_image} /></div>}

        </div>
        
        {resultView===true&&value?.student_choice===true&&<div className={styles.circleResponse}></div>}
    </div >)}
        </FlexBox >
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


 
}
> div > div{
    min-width:auto;
    min-height:auto;
    
    
  
}
> div > div:nth-child(2)
{
    flex: 1;
    display:flex;
  
    flex-wrap:wrap;
    word-break:break;
   

}
* .choiceImage{
    padding:0;
}
`
