import React, { useContext } from "react";
import ContentQuestionTextImage from "./ContentQuestionTextImage";
import SelectQuestionTextImage from "./SelectQuestionTextImage";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import SelectQuestionTextImageMushroom from "./SelectQuestionTextImageMushroom";
export default function QuestionTextImage({ state, meter }) {
  meter = Number(meter) || 0;
  const [choosenAnswer, setChoosenAnswer] = useState(false);
  const [redAlert, setRedAlert] = useState(false);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    isStudentAnswerResponse,
    setQuestionWithAnswer,
  } = useContext(ValidationContext);
  const answerRef = useRef("");
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (!choosenAnswer) {
      setRedAlert(true);
      return;
    }
    setQuestionWithAnswer({ ...state, [student_answer]: answerRef.current });
    setHasAnswerSubmitted(true);
  };
  console.log(state.choices,"check choices")
  const isImageUrl = (url) => {
    console.log(url)
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  };
  const choicesContainImage = state.choices.some((choice) =>
    isImageUrl(choice.image)
  );

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
          <ContentQuestionTextImage
            content={state?.questionContent}
            contentText={state.ContentQuestionTextImage}
          />
          {choicesContainImage ? (
            <SelectQuestionTextImage
              choices={state?.choices}
              hasAnswerSubmitted={hasAnswerSubmitted}
              setChoosenAnswer={setChoosenAnswer}
              studentAnswer={state[student_answer]}
              answrerRef={answerRef}
            />
          ) : (
            <SelectQuestionTextImageMushroom
              choices={state?.choices}
              hasAnswerSubmitted={hasAnswerSubmitted}
              setChoosenAnswer={setChoosenAnswer}
              studentAnswer={state[student_answer]}
              answrerRef={answerRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}
