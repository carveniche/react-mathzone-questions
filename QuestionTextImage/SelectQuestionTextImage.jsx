import React, { useContext, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import { useState, useRef } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import parse from "html-react-parser";
import SelectChoiceCommon from "../CommonFiles/SelectChoiceCommon";
const isDirectParse = (str) => {
  let flag = str.includes("mq-selectable");
  return !flag ? parse(str) : parse(str, optionSelectStaticMathField);
};
export default function SelectQuestionTextImage({
  choices,
  hasAnswerSubmitted,
  setChoosenAnswer,
  studentAnswer,
  answrerRef,
}) {
  const [prevSelect, setPrevSelect] = useState(0);
  const choicesBoxRef = useRef([]);
  const { setIsAnswerCorrect, isStudentAnswerResponse,setCurrectAnswer } =
    useContext(ValidationContext);
  let [choiceState, setChoicesState] = useState([]);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { value: item.image, show: false ,option:item?.option};
      if(item?.option === "true") {
        setCurrectAnswer(item.image);
      }
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);

  }, []);


  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) {
      return;
    }
    console.log(i, choiceState  ,"i");
    choiceState[prevSelect].show = false;
    choiceState[i].show = true;
    setChoicesState([...choiceState]);
    answrerRef.current = choices[i]?.value;
    setPrevSelect(i);
    setChoosenAnswer(true);
    if(choices[i]?.option === "true") {
      setIsAnswerCorrect(true);
     
    }else{
      setIsAnswerCorrect(false)
    }

  };

  return (
    <>

      <SelectChoiceCommon
        choices={choiceState}
        studentAnswer={studentAnswer}
        handleChoiceSelection={handleChoiceSelection}
      />

    </>
  );
}
