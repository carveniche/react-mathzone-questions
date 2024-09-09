import React, { useContext, useRef, useState, useEffect } from "react";
import HtmlParser from "react-html-parser";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import { serializeResponse } from "../CommonJSFiles/gettingResponse";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "./OnlineQuiz.module.css";
import OnlineQuizQuestionContent from "./OnlineQuizQuestionContent";
import OnlineQuizSelectChoiceOption from "./OnlineQuizSelectChoiceOption";
import SolveButton from "./SolveButton";
import OnlineQuizSelectChoiceOptionMushroom from "./OnlineQuizSelectChoiceQuestionMushroom";
import ProgressBar from "./ProgressBar";
import CoinsContainer from "./CoinsContainer";
import CoinImage from "./CoinImage";
import CorrectAnswerImage from "./CorrectAnswerImage";
import WrongImage from "./WrongImage";

function HorizontalPreviewClick({ obj, meter }) {
  console.log(obj.choices, "check obj");
  console.log(meter);

  meter = Number(meter) || 0;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    isAnswerCorrect,
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

  function extractTextFromHtml(htmlContent) {
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    return element.textContent || element.innerText || "";
  }

  
  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  };
  const choicesContainImage = obj.choices.some((choice) => isImageUrl(choice));

  return (
    <div >
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          hasAnswerSubmitted={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div
        id="studentAnswerResponse"
        style={{ display: "flex", gap: 90,marginLeft:"10%" }}
      >
        

        <div>
          <div className={styles.questionName} >
            {HtmlParser(obj?.questionName)}
          </div>
          {obj?.upload_file_name && (
            <div>
              <img src={obj?.upload_file_name} alt="image not found" />
            </div>
          )}
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent} >
            {Boolean(obj?.rows) && Boolean(obj?.cols) && (
              <OnlineQuizQuestionContent
                totalRows={obj?.rows}
                totalColumn={obj?.cols}
                content={obj?.questionContent}
              />
            )}
            {choicesContainImage ? (
              <OnlineQuizSelectChoiceOption
                choices={obj?.choices}
                correctAnswer={obj?.answer}
                isAnswerSelected={showAnswer}
                setIsAnswerCorrect={setIsAnswerCorrect}
                setanswerHasSelected={setHasAnswerSelected}
                answerRef={input2Ref}
                studentAnswer={obj[student_answer]}
              />
            ) : (
              <OnlineQuizSelectChoiceOptionMushroom
                choices={obj?.choices}
                correctAnswer={obj?.answer}
                isAnswerSelected={showAnswer}
                setIsAnswerCorrect={setIsAnswerCorrect}
                setanswerHasSelected={setHasAnswerSelected}
                answerRef={input2Ref}
                studentAnswer={obj[student_answer]}
              />
            )}
          </div>
        </div>
      </div>
   
   
    </div>
  );
}

export default HorizontalPreviewClick;

