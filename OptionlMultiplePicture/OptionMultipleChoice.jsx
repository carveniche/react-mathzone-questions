import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import SelectChoiceOptionMultiplePicture from "./SelectChoiceOptionMultiplePicture";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { findSelectedValue } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import parse from "html-react-parser";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
const validationForSelectMultipleSelect = (choices) => {
  let n = choices?.length || 0;
  for (let i = 0; i < n; i++) {
    if (choices[i].show == true) {
      if (String(choices[i].show).trim() == String(choices[i].selected).trim())
        return 2;
      else return 1;
    }
  }
  return 0;
};
function OptionMultipleChoice({ state, totalRows, meter, response = false }) {
  console.log({ state, totalRows, meter });
  meter = Number(meter) || 0;
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
  const [redAlert, setRedAlert] = useState(false);
  const handleSubmitAnswer = () => {
    if (showAnswer) return;
    let val = validationForSelectMultipleSelect(inputRef?.current);

    if (val == 0) {
      setRedAlert(true);
      return;
    } else if (val == 1) setIsAnswerCorrect(false);
    else if (val == 2) setIsAnswerCorrect(true);
    let value = findSelectedValue(inputRef?.current, "value");

    setQuestionWithAnswer({ ...state, [student_answer]: value });
    setShowAnswer(true);
  };

  return (
    <>
      {
        // state?.from == "logical_puzzles" ?
        state?.questionImage ? (
          <div className={styles.questionImage}>
            <p>Question Image</p>
            <img src={state.questionImage} />
          </div>
        ) : (
          ""
        )
        // <p>{JSON.stringify(state?.questionImage)}</p>
      }
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
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent}>
            {Boolean(totalRows) && (
              <SelectChoiceOptionMultiplePicture
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
export default OptionMultipleChoice;
