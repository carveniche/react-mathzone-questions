import React, { useState } from "react";
import { useContext } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import MultipleChoiceOptionSelectPicture from "./MultipleChoiceOptionSelectPicture";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { useRef } from "react";
import SolveButton from "../SolveButton";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { findSelectedValue } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";

// const validationForSelectMultipleSelect = (choices) => {

//     let n = choices?.length || 0;
//     for (let i = 0; i < n; i++) {
//       if (choices[i].show == true) {
//         if (String(choices[i].show).trim() == String(choices[i].selected).trim())
//           return 2;
//         else return 1;
//       }
//     }
//     return 0;
//   };

// const validationForSelectMultipleSelect = (choices) => {
//   let n = choices?.length || 0;
//   let result = 0;

//   for (let i = 0; i < n; i++) {
//     if (choices[i].show === true) {
//       if (String(choices[i].show).trim() === String(choices[i].selected).trim()) {
//         result = 2;
//       } else {
//         result = 1;
//       }
//     }
//   }

//   return result;
// };

const validationForSelectMultipleSelect = (choices) => {
  let n = choices?.length || 0;
  let result = 0;
  console.log("choices to validate", choices);

  let flagitem = true;

  for (let i = 0; i < n; i++) {
    if (String(choices[i].show).trim() !== String(choices[i].selected).trim()) {
      flagitem = false;
    }
  }

  if (flagitem) {
    result = 2;
  } else {
    result = 1;
  }

  return result;
};

function MultipleOptionSelectChoice({
  state,
  totalRows,
  meter,
  response = false,
}) {
  meter = Number(meter) || 0;

  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);

  const showAnswer = hasAnswerSubmitted;
  const setShowAnswer = setHasAnswerSubmitted;

  const inputRef = useRef();

  const [redAlert, setRedAlert] = useState(false);

  const handleSubmitAnswer = () => {
    if (showAnswer) return;

    let val = validationForSelectMultipleSelect(inputRef?.current);

    if (val == 0) {
      setRedAlert(true);
      return;
    } else if (val == 1) setIsAnswerCorrect(false);
    else if (val == 2) setIsAnswerCorrect(true);

    let value = findSelectedValuesall(inputRef?.current, "value");

    console.log("this is student answer", student_answer, value);
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

        <div
          id="studentAnswerResponse"
          className="mathzone-color-indigo word-space_pre-wrap"
        >
          <div className={styles.questionName}>
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
            {Boolean(totalRows) && (
              <MultipleChoiceOptionSelectPicture
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

export default MultipleOptionSelectChoice;
