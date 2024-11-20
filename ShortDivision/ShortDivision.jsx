import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";

import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import oneDto2D, {
  student_answer,
} from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import {
  findSelectedValue,
  manupulateDataSelectChoice,
  manupulateQuestionContentHorizontal,
} from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import ContentShortDivsion from "./ContentShortDivsion";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";

const validationForSelectChoice = (inputRef, content) => {
  let arr = inputRef?.current;
  console.log(inputRef);
  let n = arr?.length || 0;

  let val = null;
  console.log(arr);
  for (let i = 0; i < n; i++) {
    if (arr[i].show) {
      val = arr[i].value;
      break;
    }
  }
  console.log(val, content);
  if (val === null) return 0;
  n = content?.length || 0;
  for (let i = 0; i < n; i++) {
    let m = content[i].length;
    for (let j = 0; j < m; j++) {
      if (content[i][j].isMissed === "true") {
        console.log(content[i][j].isMissed);
        if (content[i][j].value !== val) return 1;
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
      if (arr[i][j].isMissed == "true" || arr[i][j].re_isMissed == "true") {
        if (!arr[i][j].show) return 0; //not selected
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let m = arr[i]?.length || 0;
    for (let j = 0; j < m; j++) {
      if (arr[i][j].isMissed == "true") {
        if (arr[i][j].value != arr[i][j].dropVal) return 1; //not selected}
      }
      if (arr[i][j].re_isMissed == "true") {
        if (arr[i][j].re_value != arr[i][j].dropVal) return 1;
      }
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
      if (arr[i][j].isMissed === "true" || arr[i][j].re_isMissed === "true")
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
      if (arr[i][j].isMissed === "true") {
        if (
          String(arr[i][j]?.dropVal).trim()?.toLowerCase() !=
          String(arr[i][j]?.value).trim()?.toLowerCase()
        )
          return 1;
      }
      if (arr[i][j].re_isMissed === "true") {
        if (
          String(arr[i][j]?.dropVal).trim()?.toLowerCase() !=
          String(arr[i][j]?.re_value).trim()?.toLowerCase()
        )
          return 1;
      }
    }
  }
  return 2;
};
export default function ShortDivision({ state, totalRows, totalCols, meter }) {
  let createnew = state?.questionContent;
  console.log(createnew);
  // new Array()
  console.log(state, totalRows, totalCols, meter, "short");

  meter = Number(meter) || 0;
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  //let [rows, setRows] = useState([]);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    readQuestionText,
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

    if (state?.choiceType == "dragdrop") {
      let status = validationForDragAndDrop(inputRef);
      if (status === 0) {
        setRedAlert(true);
        return;
      } else if (status === 1) setIsAnswerCorrect(false);
      else {
        setIsAnswerCorrect(true);
      }
      let result = manupulateQuestionContentHorizontal(inputRef?.current);
      setQuestionWithAnswer({ ...state, questionContent: result });
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
      setQuestionWithAnswer({ ...state, questionContent: result });
    } else if (state?.choiceType == "selectchoice") {
      let val = validationForSelectChoice(inputRef, state?.questionContent);
      console.log({ val });
      if (val === 0) {
        setRedAlert(true);
        return;
      } else if (val === 1) {
        setIsAnswerCorrect(false);
      } else {
        setIsAnswerCorrect(true);
      }
      let value = findSelectedValue(inputRef.current, "value");
      let result = oneDto2D(state?.questionContent);
      result = manupulateDataSelectChoice(result, value);
      setQuestionWithAnswer({
        ...state,
        [student_answer]:
          inputRef.current?.filter((item) => item.show)[0]?.value || "",
      });
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
          {" "}
          {readQuestionText && (
            <SpeakQuestionText readText={state?.questionName} />
          )}
          {parse(state?.questionName)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div className={styles.borderTopBottomMargin}>
          <ConditionOnProgressBar meter={meter} />
        </div>

        <div className={styles.contentParent}>
          <ContentShortDivsion
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
