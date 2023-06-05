import React, { useContext, useState } from "react";
import { useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import DropBoxes from "./DropBoxes";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CompareDragOperatorKeyingChoiceType from "./CompareDragOperatorChoiceType/CompareDragOperatorKeyingChoiceType/CompareDragOperatorKeyingChoiceType";
import CompareDragOperatorSelectChoice from "./CompareDragOperatorChoiceType/CompareDragOperatorSelectChoice/CompareDragOperatorSelectChoice";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { manupulateQuestionContent } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
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
        if (String(temp[j]?.dropValue).trim()?.toLowerCase() !== String(temp[j]?.value).trim()?.toLowerCase())
          return 1;
      }
    }
  }
  return 2;
};
const validationForSelectChoice = (choices) => {

  for (let items of choices) {
    if (items.show) {
      if(String(items.show)!==items.selected)
      return 1
      else return 2
    }
  }
  return 0
};
const changeAnswerStatus=(val,setIsAnswerCorrect,setHasAnswerSubmitted,setStudentAnswerQuestion,setRedAlert)=>{
  if(val===0)
  {
   setRedAlert(true)
    return

}
else if(val===1)
setIsAnswerCorrect(false)
else
setIsAnswerCorrect(true)
let jsonData=serializeResponse("studentAnswerResponse")
setStudentAnswerQuestion(jsonData)
setHasAnswerSubmitted(true)


}
export default function DragAndDrop({ state, totalRows, totalColumns,meter }) {
  meter=Number(meter)||0
  const inputRef=useRef()
  let rows = [];
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,isStudentAnswerResponse,setQuestionWithAnswer}=useContext(ValidationContext)
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  const dropRef = useRef(rows);
  const [redAlert,setRedAlert]=useState(false)
  const handleSubmitAnswer = () => {
    
    if (hasAnswerSubmitted) return;
    if (state?.choiceType == "dragdrop"||1) {
      for (let i = 0; i < Number(totalRows); i++) {
        for (let j = 0; j < Number(state.cols); j++)
          if (
            String(dropRef.current[i][j]?.getAttribute("name")).trim() !==
            "false"
          ) {
            if (!dropRef.current[i][j]?.textContent) {
              setRedAlert(true)
              return;
            }
          }
      }
      for (let i = 0; i < Number(totalRows); i++) {
        for (let j = 0; j < Number(state.cols); j++)
          if (
            String(dropRef.current[i][j]?.getAttribute("name")).trim() !==
            "false"
          ) {
            if (
              String(dropRef.current[i][j]?.textContent).trim()?.toLowerCase() !==
              String(dropRef.current[i][j]?.getAttribute("value")).trim()?.toLowerCase()
            ) {
              let result=manupulateQuestionContent(inputRef.current,"dropValue")
              state={...state,questionContent:result}
              setQuestionWithAnswer({...state})
              setHasAnswerSubmitted(true);
              setIsAnswerCorrect(false);
              return;
            }
          }
      }
      let result=manupulateQuestionContent(inputRef.current,"dropValue")
      state={...state,questionContent:result}
      setQuestionWithAnswer({...state})
      setIsAnswerCorrect(true);
      setHasAnswerSubmitted(true);
    } else if (state?.choiceType == "keying") {
      let status=validationForKeyingChoiceType(dropRef)
      console.log(status)
      changeAnswerStatus(status,setIsAnswerCorrect,setHasAnswerSubmitted,setStudentAnswerQuestion,setRedAlert)
    }  else if(state?.choiceType=="selectchoice")
    {
      let status=validationForSelectChoice(dropRef.current)
      changeAnswerStatus(status,setIsAnswerCorrect,setHasAnswerSubmitted,setStudentAnswerQuestion,setRedAlert)
   
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
        <div className={styles?.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
        <ConditionOnProgressBar meter={meter}/>
        </div>
        <div className={styles.contentParent}>
          {(state?.choiceType == "dragdrop"||1) ? (
            <DropBoxes
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
              inputRef={inputRef}
            />
          ) : state?.choiceType == "keying" ? (
            <CompareDragOperatorKeyingChoiceType
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) : state?.choiceType == "selectchoice" ? (
            <CompareDragOperatorSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) :(
            <h1>Unsupported file types ...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
