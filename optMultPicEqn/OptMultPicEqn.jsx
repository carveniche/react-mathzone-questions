import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import OptMultPicChoiceSelectEqn from "./OptMultPicChoiceSelectEqn";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { findSelectedValue } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";

const validationForSelectMultipleSelect = (choices, multipicselect) => {
  let n = choices?.length || 0;
  if (multipicselect) {
    let result = 0;
    console.log("choices to validate", choices);
    let flagitem = true;
    for (let i = 0; i < n; i++) {
      if (
        String(choices[i].show).trim() !== String(choices[i].selected).trim()
      ) {
        flagitem = false;
      }
    }
    if (flagitem) {
      result = 2;
    } else {
      result = 1;
    }
    return result;
  } else {
    for (let i = 0; i < n; i++) {
      if (choices[i].show == true) {
        if (
          String(choices[i].show).trim() == String(choices[i].selected).trim()
        )
          return 2;
        else return 1;
      }
    }
    return 0;
  }
};
function OptMultPicEqn({
  state,
  totalRows,
  meter,
  response = false,
  multipicselect,
}) {
  meter = Number(meter) || 0;

  const [redAlert, setRedAlert] = useState(false);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    readQuestionText,
  } = useContext(ValidationContext);
  const showAnswer = hasAnswerSubmitted;
  const setShowAnswer = setHasAnswerSubmitted;
  const inputRef = useRef();
  const handleSubmitAnswer = () => {
    if (showAnswer) return;
    let val = validationForSelectMultipleSelect(
      inputRef?.current,
      multipicselect
    );
    if (val == 0) {
      setRedAlert(true);
      return;
    } else if (val == 1) setIsAnswerCorrect(false);
    else if (val == 2) setIsAnswerCorrect(true);

    let value;

    if (multipicselect) {
      value = findSelectedValuesall(inputRef.current, "value");
    } else {
      value = findSelectedValue(inputRef.current, "value");
    }
    console.log("value", value);

    setQuestionWithAnswer({ ...state, [student_answer]: value });
    setShowAnswer(true);
  };

  const findSelectedValuesall = (choices, keys = "value") => {
    const selectedValues = [];

    for (let item of choices) {
      if (item?.show === true) {
        selectedValues.push(item[keys]);
      }
    }

    return selectedValues;
  };
  return (
    <>
      <div>
        {!isStudentAnswerResponse && (
          <SolveButton
            onClick={handleSubmitAnswer}
            answerHasSelected={showAnswer}
          />
        )}
        {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
        <div id="studentAnswerResponse">
          <div
            className={`${styles.questionName} ${styles.mathquill_mathzone_questionname}`}
          >
            {readQuestionText && (
              <SpeakQuestionText readText={state?.questionName} />
            )}
            {parse(state?.questionName, optionSelectStaticMathField)}
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
            {Boolean(totalRows) && (
              <OptMultPicChoiceSelectEqn
                multipicselect={multipicselect}
                totalRows={totalRows}
                choices={state?.questionContent}
                totalColumns={state.col}
                isAnswerSelected={showAnswer}
                inputRef={inputRef}
                studentAnswer={state[student_answer]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default OptMultPicEqn;
