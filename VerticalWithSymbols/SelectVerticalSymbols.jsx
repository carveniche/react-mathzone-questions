import React, { useContext, useRef } from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components"
import {useState} from "react"
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
export default function SelectVerticalSymbols({choices,choiceRef,hasAnswerSubmitted,studentAnswer})
{
    const selectOptionsChoiceRef = useRef([]);
    const [prevSelectionAnswerSelection,setPrevSelectionAnswerSelection]=useState(0)
    const {isStudentAnswerResponse}=useContext(ValidationContext)
    const handleSelect=(e,i)=>{
        if(hasAnswerSubmitted||isStudentAnswerResponse)
        {
            return
        }
        selectOptionsChoiceRef.current[
            prevSelectionAnswerSelection
          ].className = `${styles.flex} ${styles.choiceType} ${styles.prevSelectionAnswerSelection} ${styles.selectChoicesFont}`;
        selectOptionsChoiceRef.current[
            i
          ].className = `${styles.flex} ${styles.choiceType} ${styles.selectedChoiceType} ${styles.selectChoicesFont}`
       
          choiceRef.current=selectOptionsChoiceRef.current[i].children[1]
          
      
        setCurrentChoice(i)
        setPrevSelectionAnswerSelection(i)

    }
    const [currentChoice,setCurrentChoice]=useState(-1)
    return <div   className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}>
        {choices.map((item,i)=><div className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont} ${isStudentAnswerResponse&&(String(item)?.trim()===String(studentAnswer)?.trim())&&styles.selectedChoiceType}`} key={i} onClick={(e)=>handleSelect(e,i)} ref={(el) => (selectOptionsChoiceRef.current[i] = el)}>
            <div className="mathzone-circle-selectbox"><b>{String.fromCharCode(65+i)}</b></div>
            <div>{HtmlParser(item)}</div>
        </div  >)}
    </div>
}

const FlexBox=styled.div`
margin:1rem;
display:flex;
border:1px solid black;
width:400px;
height:80px;
align-items:Center;
background-color:${props=>props.backgroundColor?props.backgroundColor:"initial"};
gap:1rem;
> div{
    padding-left:1rem;
}
> div:nth-child(2){
    padding-left
}
`