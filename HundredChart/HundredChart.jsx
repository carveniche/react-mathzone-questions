import React, { useContext, useEffect, useRef } from "react";
import styles from "./custom.module.css";
import { useState } from "react";
import styles2 from "../OnlineQuiz.module.css";
import styled from "styled-components";
import SolveButton from "../SolveButton";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
import SelectChoiceCommon from "../../CommonJsxComponent/SelectChoiceCommon";
// let data = {
//   operation: "addition",
//   type: "hundreds_chart",
//   rows: 1,
//   cols: 70,
//   questionName: "Find the missing number.",
//   questionContent: [{ row: 1, col: 62, value: "62", isMissed: "true" }],
//   solution: { model: [{ val: "The missing number is 62." }], sidebyside: [] },
//   choices: ["65", "56", "62", "61"],
//   choiceType: "selectchoice",
//   choiceCount: 4,
//   answer: "56",
// };
function HundredChart({ data, meter }) {
  meter = Number(meter) || 0;
  const [prevState, setPrevState] = useState(-1);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    readQuestionText,
    setCurrectAnswer,
    setStudentAnswerChoice,
    
  } = useContext(ValidationContext);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  let [choiceState, setChoicesState] = useState([]);
    const prevRef = useRef(0);
    useEffect(() => { 
   
       //const correctMissedAnswer=  getSelectChoiceMissedValue(content)
       setCurrectAnswer(data?.answer);
       let arr = [];
       data.choices?.map((item) => {
         let obj = { value: item, show: false };
         arr.push({ ...obj });
       });
       setChoicesState([...arr]);
   
     }, []);


  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    const { value } = choiceState[i];
       choiceState[prevRef.current].show = false;
      choiceState[i].show = true;
      setStudentAnswerChoice(choiceState[i]?.value);
      prevRef.current = i;

    if (Number(value) === Number(data.answer)) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    setSelectedAnswer(Number(value));
    setPrevState(i);
  };

  let arr = [];

  for (let i = 0; i < 10; i++) {
    let temp = Array(10)
      .fill(0)
      .map((e, j) => j + 1 + 10 * i);

    arr.push(
      <div className={styles.flex} key={i}>
        {temp.map((e, j) => {
          if (e === Number(data.answer)) {
            return (
              <div key={j} className={styles.brown1}>
                {"??"}
              </div>
            );
          } else {
            return (
              <div key={j} className={styles.brown}>
                {e}
              </div>
            );
          }
        })}
      </div>
    );
  }
  const [redAlert, setRedAlert] = useState(false);

  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    if (prevState == -1) {
      setRedAlert(true);
      return;
    }
    setQuestionWithAnswer({ ...data, [student_answer]: selectedAnswer });
    setHasAnswerSubmitted(true);
  };


  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          hasAnswerSubmitted={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div className={styles.outer} id="studentAnswerResponse">
        <div className={styles2.questionName} style={{ display: "flex" }}>
          {readQuestionText && (
            <SpeakQuestionText readText={data?.questionName} />
          )}
          {HtmlParser(data?.questionName)}
        </div>
        {data?.upload_file_name && (
          <div>
            <img src={data?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div>
          <div className={styles.bottom}>{arr}</div>

          <>

  
                   <SelectChoiceCommon
                    type={"number"}
                     choices={choiceState}
                     studentAnswer={data["studentAnswer"]}
                     handleChoiceSelection={handleChoiceSelection}
                   />

          </>
        </div>
      </div>
    </div>
  );
}

export default HundredChart;
