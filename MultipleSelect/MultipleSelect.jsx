import React, { useContext, useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import { useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SelectMultipleSelect from "./SelectMultipleSelect";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
export default function MultipleSelect({ state, meter,choiceId }) {
  meter = Number(meter) || 0;
  const inputRef = useRef();
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,isStudentAnswerResponse
  } = useContext(ValidationContext);
  const [redAlert,setRedAlert]=useState(false)
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) {
      return;
    }
    let arr = inputRef.current;
    let n = arr?.length || 0;
    let status = 0;
    for (let i = 0; i < n; i++) {
      if (arr[i].show) {
        status = 1;
        break;
      }
    }
    if (status == 0) {
      setRedAlert(true)
      return;
    }
    let choicesIdContainer=[]
    for(let item of arr){
      if(item?.show)
      choicesIdContainer.push(item?.choice_id)
    }
    for(let i=0;i<n;i++)
    for (let i = 0; i < n; i++) {
      if (arr[i].show != arr[i].correct) {
        setChoicesId([...choicesIdContainer])
        setIsAnswerCorrect(false);
        setHasAnswerSubmitted(true);
        return;
      }
    }
    setChoicesId([...choicesIdContainer])
    setIsAnswerCorrect(true);
    setHasAnswerSubmitted(true);
  };

  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={hasAnswerSubmitted}
      />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div
          className={`mathzoneQuestionName mathzoneMultipleChoicequestionName`}
        >
          {HtmlParser(state?.question_text)}
        </div>
        <div>
          <img src={state?.upload_file_name} />
        </div>
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div>
          <SelectMultipleSelect
            choices={state?.choice_data}
            answerHasSelected={hasAnswerSubmitted}
            inputRef={inputRef}
            choiceId={choiceId}
          />
        </div>
      </div>
    </div>
  );
}
