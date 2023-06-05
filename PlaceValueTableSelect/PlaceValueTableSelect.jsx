import React, { useContext, useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentPlaceValueTableSelect from "./ContentPlaceValueTableSelect";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import PlaceValueTableDragDrop from "./PlaceValueTableChoiceType/PlaceValueTableDragDrop/PlaceValueTableDragDrop";
import { ProgressBorder } from "../../Modal2/modal2";
import PlaceValueTableSelectChoice from "./PlaceValueTableChoiceType/PlaceValueTableSelectChoice/PlaceValueTableSelectChoice";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { findSelectedValue, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
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
const ValidationForDragDrop = (content) => {
  for (let rows of content) {
    for (let items of rows) {
      if (items.isMissed == "true") {
        if (!items.show) return 0;
      }
    }
  }
  for (let rows of content) {
    for (let items of rows) {
      if (items.isMissed == "true") {
        if (String(items.dropVal).trim() != String(items.value).trim())
          return 1;
      }
    }
  }
  return 2;
};
const ValidationForSelectChoice = (choices) => {
  let val = null;
  for (let items of choices) {
    if (items?.show) {
      if (items?.show) {
        if (items?.option == "true") return 2;
        else return 1;
      }
    }
  }
  return 0;
};
export default function PlaceValueTableSelect({ state, totalRows, meter }) {
  meter = Number(meter) || 0;
  let totalEmptyBox = 0;
  state.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  const inputRef = useRef(new Array(totalEmptyBox));
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer, isStudentAnswerResponse
  } = useContext(ValidationContext);
  const input2Ref=useRef()
  const handleSubmitAnswer = () => {
    if(hasAnswerSubmitted)return
    if (state?.choiceType == "keying") {
      
      for (let i = 0; i < inputRef.current?.length; i++)
        if (!String(inputRef.current[i].children[0].value).trim()) {
          setRedAlert(true);
          return;
        }
      for (let i = 0; i < inputRef.current?.length; i++)
        if (
          !CompareTwoValue(
            inputRef.current[i]?.children[0]?.value,
            inputRef.current[i]?.getAttribute("value")
          )
        ) {
          setHasAnswerSubmitted(true);
         setQuestionWithAnswer({...state,questionContent:input2Ref.current})
          return;
        }
      setQuestionWithAnswer({...state,questionContent:input2Ref.current})
      setIsAnswerCorrect(true);
      setHasAnswerSubmitted(true);
      return;
    } else if (state?.choiceType == "dragdrop") {
      let val = ValidationForDragDrop(inputRef?.current);
      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if(val!==0){
        let result=manupulateQuestionContentHorizontal(inputRef?.current,"dropVal")
        setQuestionWithAnswer({...state,questionContent:result})
      }
    } else if (state?.choiceType == "selectchoice") {
      let val = ValidationForSelectChoice(
        inputRef?.current
      );
      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
     if(val!==0){
      let value=findSelectedValue(inputRef?.current,"value")
      setQuestionWithAnswer({...state,[student_answer]:value})
     }
    }
  };
  const [redAlert, setRedAlert] = useState(false);
  return (
    <div>
     { !isStudentAnswerResponse&& <SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={hasAnswerSubmitted}
      />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
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
          {state?.choiceType == "keying" ? (
            <ContentPlaceValueTableSelect
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              input2Ref={input2Ref}
            />
          ) : state?.choiceType == "dragdrop" ? (
            <PlaceValueTableDragDrop
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
            />
          ) : state?.choiceType == "selectchoice" ? (
            <PlaceValueTableSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
              studentAnswer={state[student_answer]||""}
            />
          ) : (
            <h1>Coming soon</h1>
          )}
        </div>
      </div>
    </div>
  );
}
