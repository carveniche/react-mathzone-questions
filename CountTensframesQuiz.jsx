import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import { serializeResponse } from "./CommonJSFiles/gettingResponse";
import HtmlParserComponent from "./CommonJSFiles/HtmlParserComponent";
import { student_answer } from "./CommonJSFiles/ManupulateJsonData/oneDto2D";

import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import ContentCountTensframeQuiz from "./ContentCountTensframeQuiz";
import styles from "./OnlineQuiz.module.css";
import OnlineQuizSelectChoiceOption from "./OnlineQuizSelectChoiceOption";
import SolveButton from "./SolveButton";
import SpeakQuestionText from "./CommonFiles/PatternMatchers/SpeakQuestionText";
import CustomAlertBoxMathZone from "./CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "./CommonJsxComponent/ConditionOnProgressBar";
function CountTensFramesQuiz({
  state,
  totalRows,
  meter,
  teacher,
  studentResponseView,
}) {
  meter = Number(meter) || 0;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [answerHasSelected, setanswerHasSelected] = useState(false);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    readQuestionText,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer,
  } = useContext(ValidationContext);
  let setShowAnswer = setHasAnswerSubmitted;
  let showAnswer = hasAnswerSubmitted;
  const [redAlert, setRedAlert] = useState(false);
  const answerRef = useRef();
  const handleSubmitAnswer = () => {
    if (showAnswer) return;
    if (!imageLoaded) {
      setRedAlert(true);
      return;
    }

    if (!answerHasSelected) {
      setRedAlert(true);
      return;
    }
    setQuestionWithAnswer({ ...state, [student_answer]: answerRef?.current });
    setShowAnswer(true);
  };
  return (
    <div>
      {!teacher && !isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {!teacher && redAlert && !hasAnswerSubmitted && (
        <CustomAlertBoxMathZone
          msg={!imageLoaded ? "Image is loading..." : ""}
        />
      )}
      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div className="_w-full">
          <div className={`${styles.questionName}`} style={{ display: "flex" }}>
            {readQuestionText && (
              <SpeakQuestionText readText={state?.questionName} />
            )}
            <div>{HtmlParser(state?.questionName)}</div>
          </div>
          {state?.upload_file_name && (
            <div>
              <img src={state?.upload_file_name} alt="image not found" />
            </div>
          )}
          <div className={`${styles.questionContentText}`}>
            <HtmlParserComponent value={state?.questionContentText} />
          </div>
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent}>
            {Boolean(totalRows) && (
              <ContentCountTensframeQuiz
                totalRows={totalRows}
                totalColumn={state?.view_json?.cols}
                content={state?.questionContent}
                setImageLoaded={setImageLoaded}
                studentResponseView={studentResponseView}
              />
            )}

            <OnlineQuizSelectChoiceOption
              choices={state?.choices}
              correctAnswer={state?.answerCount}
              answerHasSelected={answerHasSelected}
              setanswerHasSelected={setanswerHasSelected}
              isAnswerSelected={showAnswer}
              setIsAnswerCorrect={setIsAnswerCorrect}
              teacher={teacher}
              answerRef={answerRef}
              studentAnswer={state[student_answer]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CountTensFramesQuiz;
