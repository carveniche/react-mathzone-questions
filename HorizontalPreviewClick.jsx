import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import { serializeResponse } from "../CommonJSFiles/gettingResponse";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import { ProgressBorder } from "../Modal2/modal2";
import styles from "./OnlineQuiz.module.css";
import OnlineQuizQuestionContent from "./OnlineQuizQuestionContent";
import OnlineQuizSelectChoiceOption from "./OnlineQuizSelectChoiceOption";
import SolveButton from "./SolveButton";
import SpeakQuestionText from "./CommonFiles/PatternMatchers/SpeakQuestionText";
function HorizontalPreviewClick({ obj, meter }) {
  meter = Number(meter) || 0;
  const [state, setState] = useState();
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    readQuestionText,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  const showAnswer = hasAnswerSubmitted;
  const setShowAnswer = setHasAnswerSubmitted;
  const [answerHasSelected, setHasAnswerSelected] = useState(false);
  const input2Ref = useRef("");

  const [redAlert, setRedAlert] = useState(false);
  const handleSubmitAnswer = () => {
    if (!answerHasSelected) {
      setRedAlert(true);
      return;
    }
    let jsonData = serializeResponse("studentAnswerResponse");
    setQuestionWithAnswer({ ...obj, [student_answer]: input2Ref?.current });
    setStudentAnswerQuestion(jsonData);
    setShowAnswer(true);
  };
  console.log("obj?.questionName", obj?.questionName);

  var questionText = obj?.questionName
    .replaceAll("<span>", "")
    .replaceAll("</span>", "");
  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          hasAnswerSubmitted={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div>
          <div className={styles.questionName} style={{ display: "flex" }}>
            {readQuestionText && <SpeakQuestionText readText={questionText} />}
            <div>{HtmlParser(obj?.questionName)}</div>
          </div>
          {obj?.upload_file_name && (
            <div>
              <img src={obj?.upload_file_name} alt="image not found" />
            </div>
          )}
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent}>
            {Boolean(obj?.rows) && Boolean(obj?.cols) && (
              <OnlineQuizQuestionContent
                totalRows={obj?.rows}
                totalColumn={obj?.cols}
                content={obj?.questionContent}
              />
            )}

            <OnlineQuizSelectChoiceOption
              choices={obj?.choices}
              correctAnswer={obj?.answer}
              isAnswerSelected={showAnswer}
              setIsAnswerCorrect={setIsAnswerCorrect}
              setanswerHasSelected={setHasAnswerSelected}
              answerRef={input2Ref}
              studentAnswer={obj[student_answer]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HorizontalPreviewClick;
