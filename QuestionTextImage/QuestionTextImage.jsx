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
import {
  addLazyLoading,
  removeUnwantedTags,
} from "../../CommonJSFiles/gettingResponse";
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

  var questionTextFormatted = removeUnwantedTags(state?.questionName);
  questionTextFormatted = addLazyLoading(questionTextFormatted);

  var questionContentFormatted = removeUnwantedTags(state?.questionContent);
  questionContentFormatted = addLazyLoading(questionContentFormatted);

  var choicesFormatted = state.choices.map((choice) => {
    var choiceImageFromatted = removeUnwantedTags(choice?.image);
    choiceImageFromatted = addLazyLoading(choiceImageFromatted);
    return { ...choice, image: choiceImageFromatted };
  });

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
          {/* {parse(state?.questionName, optionSelectStaticMathField)} */}
          {parse(questionTextFormatted, optionSelectStaticMathField)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img
              loading="lazy"
              src={state?.upload_file_name}
              alt="image not found"
            />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent}>
          <ContentQuestionTextImage
            content={questionContentFormatted}
            contentText={state.ContentQuestionTextImage}
          />
          <SelectQuestionTextImage
            choices={choicesFormatted}
            hasAnswerSubmitted={hasAnswerSubmitted}
            setChoosenAnswer={setChoosenAnswer}
            studentAnswer={state[student_answer]}
            answrerRef={answerRef}
          />
        </div>
      </div>
    </div>
  );
}
