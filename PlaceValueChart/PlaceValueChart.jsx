import React, { useContext, useEffect } from "react";
import PlaceValueChartDragAndDrop from "./PlaceValueChartDragAndDrop";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import SolveButton from "../SolveButton";
import KeyingchoiceTypePlaceValueChart from "./choiceType/Keying/KeyingchoiceTypePlaceValueChart";
import SelectChoicePlaceValue from "./choiceType/SelectChoicePlaceValue/SelectChoicePlaceValue";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import oneDto2D,{student_answer} from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { findSelectedValue, manupulateDataSelectChoice, manupulateJsonData, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";

const validationForDragAndDrop = (selectChoice) => {
  let n = selectChoice.length || 0;
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (!selectChoice[i].show) return 0;
    }
  }
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (selectChoice[i].dropVal != selectChoice[i].value) return 1;
    }
  }
  return 2;
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
  let jsonData=serializeResponse("studentAnswerResponse")
  setStudentAnswerQuestion(jsonData)
  setAnswerSubmitStatus(true);

};
const validationForKeying = (selectChoice) => {
  let n = selectChoice.length || 0;
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (
        String(selectChoice[i].dropVal).trim() == "" ||
        selectChoice[i].dropVal == undefined
      )
        return 0;
    }
  }
  for (let i = 0; i < n; i++) {
    if (selectChoice[i].isMissed == "true") {
      if (
       !CompareTwoValue( selectChoice[i]?.dropVal,selectChoice[i]?.value)
      )
        return 1;
    }
  }
  return 2;
};

const validationForSelectChoice = (choices, content) => {
  let n = choices?.length || 0;
  let val = null;
  for (let i = 0; i < n; i++) {
    if (choices[i].show) {
      val = choices[i].value;
      break;
    }
  }
  if (val === null) return 0;
  n = content?.length || 0;
  for (let i = 0; i < n; i++) {
    let m = content[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (content[i][j].isMissed == "true") {
        if (String(content[i][j].value)?.trim()?.toLowerCase() == String(val)?.trim()?.toLowerCase()) return 2;
        return 1
      }
    }
  }
  return 2;
};

export default function PlaceValueChart({
  state,
  totalRows,
  totalColumns,
  meter,
}) {
  meter = Number(meter) || 0;
  let rows = [];
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer
  } = useContext(ValidationContext);
  
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  const dropRef = useRef(rows);

  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) {
      return;
    }
    if (state?.choiceType == "dragdrop") {
      let val = validationForDragAndDrop(dropRef?.current);
      answerUpdationStatus(setIsAnswerCorrect, setHasAnswerSubmitted, val,setStudentAnswerQuestion,setRedAlert);
      if(val!==0)
      {
        let result=oneDto2D(dropRef.current)
        result=manupulateQuestionContentHorizontal(result)
        state=manupulateJsonData(state,{"numberSystem":"numberSystem"})
        state={...state,questionContent:result}
        setQuestionWithAnswer({...state})
        
      }
    } else if (state?.choiceType == "keying") {
      let val = validationForKeying(dropRef?.current);
      answerUpdationStatus(setIsAnswerCorrect, setHasAnswerSubmitted, val,setStudentAnswerQuestion,setRedAlert);
      if(val!==0){
        let result=oneDto2D(dropRef.current)
        result=manupulateQuestionContentHorizontal(result)
        state=manupulateJsonData(state,{"numberSystem":"numberSystem"})
        state={...state,questionContent:result}
        setQuestionWithAnswer({...state})
      }
    } else if (state?.choiceType == "selectchoice") {
      let val = validationForSelectChoice(
        dropRef?.current,
        state?.questionContent
      );
      answerUpdationStatus(setIsAnswerCorrect, setHasAnswerSubmitted, val,setStudentAnswerQuestion,setRedAlert);
      if(val!==0){
      let value=findSelectedValue(dropRef.current)
      state=manupulateJsonData(state,{"numberSystem":"numberSystem"})
      state={...state,[student_answer]:value}
      setQuestionWithAnswer({...state})
    }
    } else {
      console.log("unsupported file...");
      return;
    }
  };
  const [redAlert,setRedAlert]=useState(false)
  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={hasAnswerSubmitted}
      />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
         {!isStudentAnswerResponse&& <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>}
        </div>
        <div>
          <div className={styles.contentParent}>
            {state?.choiceType == "dragdrop" && (
              <PlaceValueChartDragAndDrop
                state={state}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                numberSystem={state?.numberSystem}
                
              />
            )}
            {state?.choiceType == "keying" && (
              <KeyingchoiceTypePlaceValueChart
                content={state?.questionContent}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                numberSystem={state?.numberSystem}
                state={state}
              />
            )}

            {state?.choiceType == "selectchoice" && (
              <SelectChoicePlaceValue
                content={state?.questionContent}
                totalRows={Number(totalRows)}
                totalColumns={Number(totalColumns)}
                dropRef={dropRef}
                isAnswerSubmitted={hasAnswerSubmitted}
                choices={state?.choices}
                numberSystem={state?.numberSystem}
                state={state}
                studentAnswer={state[student_answer]}
              
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
