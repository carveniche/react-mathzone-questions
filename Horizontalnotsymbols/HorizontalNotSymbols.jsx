import React, { useContext } from "react";
import HtmlParser from "react-html-parser";
import {useState,useRef,useEffect} from "react";
import OnlineQuizSolutionModel from "../OnlineQuizSolutionModel";
import styles from "../OnlineQuiz.module.css";
import ContentHorizontalNotSymbols from "./ContentHorizontalNotSymbols";
import SelectChoiceHorizontalNotSymbol from "./SelectChoiceHorizontalNotSymbol";
import { Modal2, ProgressBorder } from "../../Modal2/modal2";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
function HorizontalNotSymbols({ state, totalRows,meter }) {
  meter=Number(meter)||0
 const valueRef=useRef()
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,isStudentAnswerResponse,setQuestionWithAnswer}=useContext(ValidationContext)
    let showAnswer=hasAnswerSubmitted
    let setShowAnswer=setHasAnswerSubmitted
    const [answerHasSelected, setanswerHasSelected] = useState(false);
    const [redAlert,setRedAlert]=useState(false)
    const handleSubmitAnswer = () => {
      if(showAnswer)
      return
      if (!answerHasSelected) {
        setRedAlert(true)
        return;
      }
     setQuestionWithAnswer({...state,[student_answer]:valueRef.current})
      setShowAnswer(true);
    };

    return <div >
         {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} answerHasSelected={showAnswer}/>}
         {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
        <div id="studentAnswerResponse">
        <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
         <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent} >
       
        <div className={styles.questionName}>{state.questionContentText}</div>

        {Boolean(totalRows) && (
            <ContentHorizontalNotSymbols
              totalRows={totalRows}
              content={state?.questionContent}
              totalColumns={state.col}
              setanswerHasSelected={setanswerHasSelected}
              isAnswerSelected={showAnswer}
              setShowAnswer={setShowAnswer}
            />
          )}  
           <div>
              <SelectChoiceHorizontalNotSymbol choices={state.choices} correctAnswer={state?.answerValue}  setanswerHasSelected={setanswerHasSelected} isAnswerSelected={showAnswer} setIsAnswerCorrect={setIsAnswerCorrect} valueRef={valueRef} studentAnswer={state[student_answer]}/>
              </div>
            </div> 
            </div>   
    </div>
  }
  export default HorizontalNotSymbols;
