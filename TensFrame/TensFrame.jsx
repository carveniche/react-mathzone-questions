import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import TensframeContent from "./TensFrameContent";
import styled from "styled-components";
import OnlineQuizSolutionModel from "../OnlineQuizSolutionModel";
import { Modal2, ProgressBorder } from "../../Modal2/modal2";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
export default function TensFrame({ state, totalRows, totalColumns, meter }) {
  meter = Number(meter)||0;
  let boxesImageRef = useRef([]);
  let [index, setIndex] = useState(0);
  const heightDiv = useRef(0);
  const [redAlert,setRedAlert]=useState(false)
  const [msg,setMsg]=useState("")
  const handleAddImage = () => {
    if(isStudentAnswerResponse||hasAnswerSubmitted)
    return
    if (index >= 10) {
      setMsg("You can not add Image");
      setRedAlert(true)
      return;
    } else setIndex(index + 1);
  };

  const handleRemoveImage = () => {
    if(isStudentAnswerResponse||hasAnswerSubmitted)
    return
    if (index <= 0) {
      setMsg("You can not Remove Image");
      setRedAlert(true)
      return;
    } else setIndex(index - 1);
  };
  
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,isStudentAnswerResponse,setQuestionWithAnswer}
  =useContext(ValidationContext)
  let answerSubmit=hasAnswerSubmitted
  let setAnswerSubmit=setHasAnswerSubmitted
  const handleSubmitAnswer = () => {
    if(answerSubmit||isStudentAnswerResponse)
    return
    if (String(state.answerCount) === String(index)) {
      setIsAnswerCorrect(true);
    } else setIsAnswerCorrect(false);
    setAnswerSubmit(true);
    setQuestionWithAnswer({...state,[student_answer]:index})
  };


  return (
    <div>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmitAnswer}
        answerHasSelected={answerSubmit}
      />}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone msg={msg}/>}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
         <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent} ref={heightDiv}>
         
          <TensframeContent
            totalColumns={totalColumns}
            boxesImageRef={boxesImageRef}
            images={HtmlParser(state?.questionContent)}
            currentIndex={isStudentAnswerResponse?state[student_answer]:index}
          />
          <div>
          <div className={styles.questionName}>Click to add</div>
          <div className={styles.flex}>
            
            <div className={styles.TensframeButtonBox} onClick={handleAddImage} disabled={answerSubmit}>
              <div>1</div>
              <div>{HtmlParser(state?.questionContent)}</div>
            </div >
            <div className={styles.TensframeButtonBox} onClick={handleRemoveImage} disabled={answerSubmit}>
             
              <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdZqfU-iVR-ddMW3t0qFTshLKUaBwboTZyg&usqp=CAU" />
              </div>
              
            </div>
            
          </div>
         
          </div>
        </div>

      </div>
    </div>
  );
}

const ButtonBox = styled.button`
  width: 80px;
  background-color: white;
  display: block;
  height: 80px;
  margin: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 0.6rem;
  * img {
    width: 50px;
    height: 50px;
  }
`;
