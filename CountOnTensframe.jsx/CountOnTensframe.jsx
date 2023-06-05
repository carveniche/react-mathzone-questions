import React, { useContext, useRef, useState } from "react";
import ContentCountOnTensframe from "./ContentCountOnTensframe";
import styles from "../OnlineQuiz.module.css";
import SelectCountOnTensframe from "./SelectCountOnTensframe";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SolveButton from "../SolveButton";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { findSelectedValue } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";

const validationForSelectChoice = (choices, answer) => {
  let n = choices?.length || 0;
  let val = null;

  for (let i = 0; i < n; i++) {
    if (choices[i]?.show) {
      val = choices[i]?.value;
      if (String(answer).trim() == String(val).trim()) return 2;
      else return 1;
    }
  }

  return 0;
};

const answerUpdationStatus = (
  setAnswerCorrectStatus,
  setAnswerSubmitStatus,
  val,
  setStudentAnswerQuestion,
  setRedAlert
) => {
  if (val === 0) {
    setRedAlert(true)
    return;
  } else if (val === 1) setAnswerCorrectStatus(false);
  else if (val === 2) setAnswerCorrectStatus(true);
  setAnswerSubmitStatus(true);
  let jsonData = serializeResponse("studentAnswerResponse");
  setStudentAnswerQuestion(jsonData);
};
export default function CountOnTensframe({ obj, meter }) {
  meter = Number(meter) || 0;
  const [redAlert,setRedAlert]=useState(false)
  const inputRef = useRef();
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,setQuestionWithAnswer,isStudentAnswerResponse,
  } = useContext(ValidationContext);
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (obj?.choiceType == "selectchoice") {
      let val = validationForSelectChoice(inputRef?.current, obj?.answerCount);

      answerUpdationStatus(
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        val,
        setStudentAnswerQuestion,
        setRedAlert
      );
    if(val!==0){
      let values=findSelectedValue(inputRef?.current,"value")
      setQuestionWithAnswer({...obj,[student_answer]:values})
    }
    } else {
      console.log("unsupported file...");
      return;
    }
  };
  return (
    <div>
     {!isStudentAnswerResponse&& <SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={hasAnswerSubmitted}
      />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}><HtmlParserComponent value={obj?.questionName}/></div>
        {obj?.upload_file_name && (
          <div>
            <img src={obj?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter}/>
        </div>
        <div>
          <ContentCountOnTensframe
            content={obj?.questionContent}
            totalRows={obj?.answerCount}
          />
          <SelectCountOnTensframe choices={obj?.choices} inputRef={inputRef} studentAnswer={obj[student_answer]}/>
        </div>
      </div>
    </div>
  );
}
