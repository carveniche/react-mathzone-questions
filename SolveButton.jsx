import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./OnlineQuiz.module.css";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
export default function SolveButton({ onClick }) {
  const excludeParticipant = ["sm", "audit", "smmanager", "", "parent"];
  const [openAnimation, setOpenAnimation] = useState(false);
  const timer1 = useRef(null);
  const timer2 = useRef(null);
  const {
    hasAnswerSubmitted,
    currentIdentity,
    isAnswerCorrect,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setIsStudentAnswerResponse,
    handleUpdateStudentAnswerResponse,
    setShowQuizResponseAsText,
    setResponseUrl,
    setChoicesId,
    setQuestionWithAnswer,
    setStudentAnswerQuestion
  } = useContext(ValidationContext);
  const handleSubmit = () => {
    onClick();
    let temp = false;
    setHasAnswerSubmitted((prev) => {
      setIsAnswerCorrect((isAnswer) => {
        temp = prev ? (isAnswer ? 1 : 0) : -1;
        return isAnswer;
      });
      return prev;
    });
    return temp;
  };
  window.handleSubmit = handleSubmit;

  //  this function is for next js project 
  const nextJsHandleSubmit = () => {
    onClick();
    return new Promise((resolve) => {
      setHasAnswerSubmitted((prev) => {
        setIsAnswerCorrect((isAnswer) => {
          let temp = prev ? (isAnswer ? 1 : 0) : -1;
          resolve(temp); // Resolving after state update
          return isAnswer; // Correct state update
        });
        return prev;
      });
    });
  };
  
  window.nextJsHandleSubmit = nextJsHandleSubmit;
  const hideShowSolution=()=>{
    setChoicesId("")
    // setIsStudentAnswerResponse(false)
    // setShowQuizResponseAsText(false)
 
    }
    window.reactMathzoneHideSolution = hideShowSolution;

  return false ? (
    <>
      {hasAnswerSubmitted && (
        <button
          onClick={onClick}
          className={`${styles.checkButton} ${styles.checkButtonColor} react-mathzone-solve-button`}
          id="solveBtn"
        >
          Solve
        </button>
      )}
    </>
  ) : null;
}
