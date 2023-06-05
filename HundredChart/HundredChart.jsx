import React, { useContext } from "react";
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
    setQuestionWithAnswer,isStudentAnswerResponse
  } = useContext(ValidationContext);
  const [selectedAnswer,setSelectedAnswer]=useState("")
  const handleClick = (id, i) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    if (Number(id) === Number(data.answer)) {
      setIsAnswerCorrect(true);
      
    } else {
      setIsAnswerCorrect(false);
    }
    setSelectedAnswer(Number(id))
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
            return <div key={j} className={styles.brown1}>{"??"}</div>;
          } else {
            return <div key={j} className={styles.brown}>{e}</div>;
          }
        })}
      </div>
    );
  }
  const [redAlert,setRedAlert]=useState(false)
  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    if (prevState == -1) {
      setRedAlert(true)
      return;
    }
    setQuestionWithAnswer({...data,[student_answer]:selectedAnswer})
    setHasAnswerSubmitted(true);
  };
  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        hasAnswerSubmitted={hasAnswerSubmitted}
      />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div className={styles.outer} id="studentAnswerResponse">
        <div className={styles2.questionName}>
          {HtmlParser(data?.questionName)}
        </div>
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div>
          <div className={styles.bottom}>{arr}</div>

          <div className={styles.HundredChartFlexBox}>
            {data.choices.map((k, i) => (
              <div
                className={(isStudentAnswerResponse&&Number(k)===Number(data[student_answer]))?styles.answer1:prevState == i ? styles.answer1 : styles.answer}
                onClick={() => {
                  handleClick(k, i);
                }}
                key={i}
              >
                <div className={`${styles.circle} mathzone-circle-selectbox`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className={styles.ans}>{Number(k)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HundredChart;
