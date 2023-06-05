import React, { useContext, useEffect } from "react"
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import { Modal2, ProgressBorder } from "../Modal2/modal2";
import ContentCountTensframeQuiz from "./ContentCountTensframeQuiz";
import styles from "./OnlineQuiz.module.css";
import OnlineQuizSelectChoiceOption from "./OnlineQuizSelectChoiceOption";
import SolveButton from "./SolveButton";
function CountTensFramesQuiz({ state, totalRows,meter }) {
  meter=Number(meter)||0
  const [imageLoaded,setImageLoaded]=useState(false)
  const [answerHasSelected, setanswerHasSelected] = useState(false);
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect}=useContext(ValidationContext)
  let setShowAnswer=setHasAnswerSubmitted
  let showAnswer=hasAnswerSubmitted
  const handleSubmitAnswer = () => {
    if(!imageLoaded){
      alert('Image is loading...')
      return
    }
    if (showAnswer) {
      alert("Please Select Answer");
      return;
    }
    setShowAnswer(true);
  };
    return (
    <div >
       <SolveButton onClick={handleSubmitAnswer}/>
     
      <div>

        <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
            <div class={styles.contentParent}>
            
        {Boolean(totalRows) && (
          <ContentCountTensframeQuiz
            totalRows={totalRows}
            totalColumn={state?.view_json?.cols}
            content={state?.questionContent}
            setImageLoaded={setImageLoaded
            }
          />
        )}
        {Boolean(state?.choiceType === "selectchoice") && (
          <OnlineQuizSelectChoiceOption
            choices={state?.choices}
            correctAnswer={state?.answerCount}
            answerHasSelected={answerHasSelected}
            setanswerHasSelected={setanswerHasSelected}
            isAnswerSelected={showAnswer}
            setIsAnswerCorrect={setIsAnswerCorrect}
          />
        )}
       </div>  
      </div>
    </div>
  );
}
export default CountTensFramesQuiz;
