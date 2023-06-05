import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import parse from "html-react-parser";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import { findSelectedValue, manupulateDataSelectChoice, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CompareTwoValue from "../compareTwoValue";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import CompareOfImageKeyingChoiceType from "./ChoicesTypeCompareOfImage/CompareOfImageKeyingChoiceType/CompareOfImageKeyingChoiceType";
import CompareOfImageSelectChoice from "./ChoicesTypeCompareOfImage/CompareOfImageKeyingSelectChoice/CompareOfImageSelectChoice";
import DropBoxesImageCompare from "./DropBoxesImageCompare";
const validationForKeyingChoiceType = (choices) => {
  let arr = choices?.current;
  let n = arr?.length || 0;
  for (let i = 0; i < n; i++) {
    let temp = arr[i];
    let m = temp?.length || 0;
    for (let j = 0; j < m; j++) {
      if (temp[j].isMissed == "true") {
        if (temp[j]?.show === false || temp[j]?.dropValue == "") return 0;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    let temp = arr[i];
    let m = temp?.length || 0;
    for (let j = 0; j < m; j++) {
      if (temp[j].isMissed == "true") {
        if (
          !CompareTwoValue(String(temp[j]?.dropValue).trim()?.toLowerCase() ,
          String(temp[j]?.value).trim()?.toLowerCase())
        )
          return 1;
      }
    }
  }
  return 2;
};
const validationForSelectChoice = (choices, questionContent) => {
  let val = null;
  let n = choices?.length;
  for (let items of choices) {
    if (items.show) {
      val = items.val;
      break;
    }
  }
  if (val === null) return 0;
  let arr = questionContent;
  for (let rows of arr) {
    for (let items of rows) {
      if (items.isMissed === "true") {
        if (String(items.value).trim() === String(val).trim()) {
          return 2;
        } else return 1;
      }
    }
  }
};
const changeAnswerStatus = (
  val,
  setIsAnswerCorrect,
  setHasAnswerSubmitted,
  setStudentAnswerQuestion,
  setRedAlert
) => {
  if (val === 0) {
    setRedAlert(true);
    return;
  } else if (val === 1) setIsAnswerCorrect(false);
  else setIsAnswerCorrect(true);
  let jsonData = serializeResponse("studentAnswerResponse");
  setStudentAnswerQuestion(jsonData);
  setHasAnswerSubmitted(true);
};
export default function DragAndDropImageCompare({
  state,
  totalRows,
  totalColumns,
  meter,
}) {
  meter = Number(meter) || 0;
  let rows = [];
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
const inputRef=useRef()
  const dropRef = useRef(rows);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,isStudentAnswerResponse,setQuestionWithAnswer 
  } = useContext(ValidationContext);
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (state?.choiceType == "dragdrop") {
      let n=inputRef?.current?.length||0
      let twoDarray=inputRef.current||[]
      for (let i = 0; i < n; i++) {
        let m=twoDarray[i]?.length||0;
        for (let j = 0; j < m; j++){
          
          if (
            String(twoDarray[i][j]?.isMissed).trim() ===
            "true"
          ) {
          
            if (!String(twoDarray[i][j]?.dropValue).trim()) {
            
              setRedAlert(true);
              return;
            }
          }
        }
      }
      for (let i = 0; i < n; i++) {
        let m=twoDarray[i]?.length||0;
        for (let j = 0; j <m; j++)
          if (
            String(twoDarray[i][j]?.isMissed).trim() ===
            "true"
          ) {
            if (
             !CompareTwoValue(twoDarray[i][j]?.dropValue,twoDarray[i][j]?.value)
            ) {
              let result=manupulateQuestionContentHorizontal(inputRef.current,"dropValue")
              state={...state,questionContent:result }
              setQuestionWithAnswer(state)
              setHasAnswerSubmitted(true);
              setIsAnswerCorrect(false);
              return;
            }
          }
      }
      let result=manupulateQuestionContentHorizontal(inputRef.current,"dropValue")
      state={...state,questionContent:result }
      setQuestionWithAnswer(state)
      setIsAnswerCorrect(true);
      setHasAnswerSubmitted(true);
      return;
    } else if (state?.choiceType == "keying") {
      console.log('keying')
      let status = validationForKeyingChoiceType(dropRef);
      changeAnswerStatus(
        status,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if(status!==0){
        let result=manupulateQuestionContentHorizontal(dropRef?.current,"dropValue")
        state={...state,questionContent:result}
        setQuestionWithAnswer({...state})
      }
    } else if (state?.choiceType == "selectchoice") {
      
      let status = validationForSelectChoice(
        dropRef.current,
        state?.questionContent
      );
      changeAnswerStatus(
        status,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if(status!==0){
        let value=findSelectedValue(dropRef?.current,"val")
        state={...state,[student_answer]:value}
        setQuestionWithAnswer({...state})
      }
    }
  };
  const [redAlert, setRedAlert] = useState(false);
  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={!hasAnswerSubmitted}
      />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles?.questionName}>
          {parse(state?.questionName)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
         <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent}>
          {state?.choiceType == "dragdrop" ? (
            <DropBoxesImageCompare
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
              inputRef={inputRef}
            />
          ) : state?.choiceType == "keying" ? (
            <CompareOfImageKeyingChoiceType
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) : state?.choiceType == "selectchoice" ? (
            <CompareOfImageSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
              studentAnswer={state[student_answer]}
            />
          ) : (
            <h1>unsupported files types</h1>
          )}
        </div>
      </div>
    </div>
  );
}
