import React, { useContext, useState } from "react";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SolveButton from "../SolveButton";
import { ProgressBorder } from "../../Modal2/modal2";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
export default function FillInTheBlanks({ state, meter, choiceId }) {
  const [inputState, setInputState] = useState("");
  const [redAlert, setRedAlert] = useState(false);
  meter = Number(meter) || 0;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  var answer = state?.choice_data[0].choices;
  const hasLetter = /[a-zA-Z]/.test(answer);
  const hasNumber = /\d/.test(answer);
  const handleChange = (e) => {
    var inpValue;
    inpValue = e.target.value;

    if (!hasLetter && hasNumber && e.target.value.length > answer.length)
      inpValue = e.target.value.slice(0, answer.length);

    setInputState(inpValue);
  };
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    if (String(inputState).trim() == "") {
      setRedAlert(true);
      return;
    }
    let n = state?.choice_data?.length || 0;

    if (!CompareTwoValue(state?.choice_data[0]?.choices, inputState)) {
      setChoicesId(inputState);
      setIsAnswerCorrect(false);
      setHasAnswerSubmitted(true);
      return;
    }
    setChoicesId(inputState);

    setIsAnswerCorrect(true);
    setHasAnswerSubmitted(true);
    return;
  };
  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && (
        <CustomAlertBoxMathZone msg={"Please answer the question..."} />
      )}
      <div className="mathzoneQuestionName" id="studentAnswerResponse">
        {state?.question_text && <div>{HtmlParser(state?.question_text)}</div>}
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="Image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div style={StylesInline.FlexBox}>
          {state?.fib_before_text && (
            <div>{HtmlParser(state?.fib_before_text)}</div>
          )}
          <input
            style={StylesInline.Input}
            maxLength={answer.length}
            value={isStudentAnswerResponse ? choiceId : inputState}
            onChange={handleChange}
            disabled={hasAnswerSubmitted || isStudentAnswerResponse}
          />
          {state?.fib_text && <div>{HtmlParser(state?.fib_text)}</div>}
          {state?.after_question_text && (
            <div>{HtmlParser(state?.after_question_text)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const StylesInline = {
  Input: {
    width: "180px",
    height: "fit-content",
    minHeight: "40px",
    textAlign: "center",
    borderRadius: 5,
  },
  FlexBox: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
    width: "auto",
  },
};
