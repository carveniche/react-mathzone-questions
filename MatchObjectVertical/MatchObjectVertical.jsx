import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import ContentMatchObjectVertical from "./ContentMatchObjectVertical";
import { ProgressBorder } from "../../Modal2/modal2";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import CompareTwoValue from "../compareTwoValue";
import { manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";

import {
  addLazyLoading,
  removeUnwantedTags,
} from "../../CommonJSFiles/gettingResponse";
const validationForSelectChoice = (inputRef, content) => {
  let arr = inputRef?.current;
  let n = arr?.length || 0;

  let val = null;
  for (let i = 0; i < n; i++) {
    if (arr[i].show) {
      val = arr[i].value;
      break;
    }
  }
  if (val === null) return 0;
  n = content?.length || 0;
  for (let i = 0; i < n; i++) {
    if (content[i]?.isMissed == "true") {
      if (content[i]?.numvalue != val) {
        return 1;
      }
    }
  }
  return 2;
};
const validationForDragAndDrop = (inputRef) => {
  let n = inputRef?.current?.length || 0;
  let arr = inputRef.current;
  for (let i = 0; i < n; i++) {
    let m = arr[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (arr[i][j].isMissed == "true") {
        if (!arr[i][j].show) return 0; //not selected
      }
    }
  }
  for (let i = 0; i < n; i++) {
    let m = arr[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (arr[i][j].isMissed == "true")
        if (arr[i][j].numvalue != arr[i][j].dropVal) return 1; //not selected}
    }
  }
  return 2;
};
const validationForMultiSelect = (choices) => {
  let n = choices?.length || 0;
  let flag = true;
  for (let i = 0; i < n; i++) {
    if (choices[i].show) {
      flag = false;
      break;
    }
  }
  if (flag) {
    return 0;
  }
  for (let i = 0; i < n; i++) {
    if (choices[i].show != choices[i].correct) {
      return 1;
    }
  }
  return 2;
};
const validationForKeying = (inputRef) => {
  let arr = inputRef?.current;
  let n = arr?.length || 0;
  for (let i = 0; i < n; i++) {
    let m = arr[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (arr[i][j].isMissed === "true")
        if (
          !arr[i][j].show ||
          arr[i][j].dropVal == "" ||
          arr[i][j].dropVal == undefined
        )
          return 0;
    }
  }
  for (let i = 0; i < n; i++) {
    let m = arr[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (arr[i][j].isMissed === "true")
        if (!CompareTwoValue(arr[i][j]?.dropVal, arr[i][j]?.numvalue)) return 1;
    }
  }
  return 2;
};
export default function MatchObjectVertical({
  state,
  totalRows,
  totalCols,
  meter,
}) {
  meter = Number(meter) || 0;
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  //let [rows, setRows] = useState([]);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);

  const inputRef = useRef(new Array(totalEmptyBox));
  useEffect(() => {
    let totalEmptyBox = 0;

    state?.questionContent?.map(
      (item) => item.isMissed === "true" && totalEmptyBox++
    );
    setTotalEmptyBox(totalEmptyBox);
    //setRows(rows);
  }, []);
  const [redAlert, setRedAlert] = useState(false);
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;

    if (
      state?.choiceType == "dragdrop" ||
      state?.choiceType == "selectchoice"
    ) {
      let status = validationForDragAndDrop(inputRef, setIsAnswerCorrect);
      if (status === 0) {
        setRedAlert(true);
        return;
      } else if (status === 1) setIsAnswerCorrect(false);
      else {
        setIsAnswerCorrect(true);
      }
      let result = manupulateQuestionContentHorizontal(inputRef?.current);
      state = { ...state, questionContent: result };
      setQuestionWithAnswer({ ...state });
    } else if (state?.choiceType == "keying") {
      let status = validationForKeying(inputRef);
      if (status === 0) {
        setRedAlert(true);
        return;
      } else if (status === 1) setIsAnswerCorrect(false);
      else {
        setIsAnswerCorrect(true);
      }
      let result = manupulateQuestionContentHorizontal(inputRef?.current);
      state = { ...state, questionContent: result };
      setQuestionWithAnswer({ ...state });
    } else if (state?.choiceType == "selectchoice") {
      let val = validationForSelectChoice(inputRef, state?.questionContent);
      if (val === 0) {
        setRedAlert(true);
        return;
      } else if (val === 1) {
        setIsAnswerCorrect(false);
      } else {
        setIsAnswerCorrect(true);
      }
    } else if (state?.choiceType == "multi select") {
      let val = validationForMultiSelect(inputRef?.current);
      if (val === 0) {
        setRedAlert(true);
        return;
      } else if (val === 1) {
        setIsAnswerCorrect(false);
      } else {
        setIsAnswerCorrect(true);
      }
    }

    let jsonData = serializeResponse("studentAnswerResponse");
    setStudentAnswerQuestion(jsonData);
    setHasAnswerSubmitted(true);
  };

  var questionTextFormatted = removeUnwantedTags(state?.questionName);
  questionTextFormatted = addLazyLoading(questionTextFormatted);
  console.log("questionTextFormatted", { questionTextFormatted });
  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {parse(questionTextFormatted)}
          {/* {parse(state?.questionName)} */}
        </div>
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div className={`${styles.borderTopBottomMargin}`}>
          {!isStudentAnswerResponse && (
            <ProgressBorder meter={meter + 1}>
              <div></div>
            </ProgressBorder>
          )}
        </div>
        <div className={styles.contentParent}>
          <ContentMatchObjectVertical
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            hasAnswerSubmitted={hasAnswerSubmitted}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
          />
        </div>
      </div>
    </div>
  );
}
