import React, { useContext, useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentVerticalSymbols from "./ContentVerticalSymbols";
import SelectVerticalSymbols from "./SelectVerticalSymbols";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { serializeResponse } from ".././CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
import ConditionOnProgressBar from "../CommonJsxComponent/ConditionOnProgressBar";
export default function VerticalWithSymbols({
  state,
  totalRows,
  totalCols,
  meter,
}) {
  meter = Number(meter) || 0;
  const [redAlert, setRedAlert] = useState(false);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer,
    readQuestionText,
    setCurrectAnswer
  } = useContext(ValidationContext);

  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (!choiceRef.current) {
      setRedAlert(true);
      return;
    }
    if (String(choiceRef.current).trim() === String(state?.answer))
      setIsAnswerCorrect(true);
    else setIsAnswerCorrect(false);
    setHasAnswerSubmitted(true);
    setQuestionWithAnswer({
      ...state,
      [student_answer]: choiceRef.current,
    });
  };

  const choiceRef = useRef(null);

  useEffect(() => {
    setCurrectAnswer(state?.answer)
  },[])

  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div>
          <div className={styles.questionName} style={{ display: "flex" }}>
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
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent}>
            <ContentVerticalSymbols
              content={state?.questionContent}
              contentText={state.ContentQuestionTextImage}
            />
            
            <SelectVerticalSymbols
              choices={state?.choices}
              choiceRef={choiceRef}
              hasAnswerSubmitted={hasAnswerSubmitted}
              studentAnswer={state[student_answer]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
