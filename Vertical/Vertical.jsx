import React, { useContext } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentVertical from "./ContentVertical";
import { useState, useRef, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import VerticalSelect from "./VerticalChoiceType/VerticalSelectChoice/VerticalSelectChoice";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import VerticalDragDrop from "./VerticalChoiceType/VerticalDragDrop/VerticalDragDrop";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { validationForDragAndDrop } from "../HorizontalFillUps/HorizontalFillUps";
import { findSelectedValue, manupulateDataSelectChoice, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";

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
const validationForDragDrop = (data) => {
  for (let rows of data) {
    for (let item of rows) {
      if (item?.isMissed === "true") {
        if (!String(item?.dropVal).trim()) return 0;
        else if (String(item?.dropVal).trim() !== String(item?.value).trim())
          return 1;
      }
    }
  }
  return 2;
};
export default function Vertical({ state, totalRows, totalCols, meter }) {
  meter = Number(meter) || 0;
  let totalEmptyBox = 0;
  state?.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse
  } = useContext(ValidationContext);

  const inputRef = useRef(new Array(totalEmptyBox));
  const [redAlert, setRedAlert] = useState(false);
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (state?.choiceType == "keying") {
      
      let status = validationForDragAndDrop(inputRef, "");
      changeAnswerStatus(
        status,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      )
      if(status!==0){
        let result=manupulateQuestionContentHorizontal(inputRef.current)
        state={...state,questionContent:result}
        setQuestionWithAnswer({...state})


      }
    } else if (state?.choiceType == "selectchoice") {
      let status = validationForSelectChoice(
        inputRef.current,
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
        let value=findSelectedValue(inputRef?.current,"val")
        
        setQuestionWithAnswer({...state,[student_answer]:value})
      }
    } else if (state?.choiceType == "dragdrop") {
      let status = validationForDragDrop(inputRef?.current);

      changeAnswerStatus(
        status,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if(status!==0){
        let result=manupulateQuestionContentHorizontal(inputRef.current)
        state={...state,questionContent:result}
        setQuestionWithAnswer({...state})


      }
    }
  };

  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={hasAnswerSubmitted}
      />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div className={styles.marginTopborder3}>
          {!isStudentAnswerResponse&&<ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>}
        </div>
        <div className={styles.contentParent}>
          {state?.choiceType === "keying" ? (
            <ContentVertical
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
            />
          ) : state?.choiceType === "selectchoice" ? (
            <VerticalSelect
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              choices={state?.choices}
              studentAnswer={state[student_answer]}
            />
          ) : state?.choiceType === "dragdrop" ? (
            <VerticalDragDrop
              content={state.questionContent}
              totalRows={Number(totalRows)}
              totalCols={Number(totalCols)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              choices={state?.choices}
            />
          ) : (
            <h1>Unsupported file types...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
