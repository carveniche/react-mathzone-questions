import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SelectChoiceCommon from "../CommonFiles/SelectChoiceCommon";
let obj = `<div id="studentAnswerResponse"><div class="OnlineQuiz_questionName__Xd-AR">Use the model to subtract&nbsp;<div>800 - 300&nbsp;</div></div><div><div class="sc-gsnTZi jgXmDM"><div></div></div></div><div><div class="sc-breuTD ifQRBy"><div class="sc-breuTD ifQRBy"><div class="sc-ksZaOG kWQTOQ"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"><img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png"></div></div></div><div class="sc-evZas jFURDb"><div class="OnlineQuiz_prevSelectionAnswerSelection__3bfOR "><div>A</div><div>50</div></div><div class="  OnlineQuiz_selectedChoiceType__U5H8o "><div>B</div><div>500</div></div><div><div>C</div><div>40</div></div><div><div>D</div><div>400</div></div></div></div></div>`;
export default function BlockBaseImageChoiceSelection({
  choices,
  correctAnswer,
  hasAnswerSubmitted,
  setIsAnswerCorrect,
  setHasOptionSelected,
  valueRef,
  studentAnswer,
}) {


    const {isStudentAnswerResponse,setCurrectAnswer,setStudentAnswerChoice}=useContext(ValidationContext)
  let [choiceState, setChoicesState] = useState([]);
    const prevRef = useRef(0);
  
    useEffect(() => {
  
      //const correctMissedAnswer=  getSelectChoiceMissedValue(content)
      //setCurrectAnswer(correctMissedAnswer);
      setCurrectAnswer(correctAnswer);
      let arr = [];
      choices?.map((item) => {
        let obj = { value: item, show: false };
        arr.push({ ...obj });
      });
      setChoicesState([...arr]);
  
    }, []);
  
    const handleChoiceSelection = (i) => {
      if (hasAnswerSubmitted||isStudentAnswerResponse) return;
      choiceState[prevRef.current].show = false;
      choiceState[i].show = true;
      prevRef.current = i;
      setChoicesState([...choiceState]);
      setStudentAnswerChoice(choiceState[i]?.value);
      setHasOptionSelected(true);
      valueRef.current = choiceState[i]?.value;
      if( choiceState[i]?.value === correctAnswer) {
        setIsAnswerCorrect(true);
      } 
    };


  return (
    <>
    
        <SelectChoiceCommon
          type={"htmlparse"}
          choices={choiceState}
          studentAnswer={studentAnswer}
          handleChoiceSelection={handleChoiceSelection}
        />


    
    </>
  );
}
