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
    // Ensure `onClick` is a valid function
    //console.log("nextJsHandleSubmit clicked")

    if (typeof onClick !== "function") {
      console.error("onClick is not a function");
      return Promise.reject("onClick is not a function");
    }
  
    onClick();
  
    return new Promise((resolve) => {
      let tempResult = -1; // Default value
  
      setHasAnswerSubmitted((prev) => {
       // console.log("Previous hasAnswerSubmitted:", prev);

        tempResult = prev ? (isAnswerCorrect ? 1 : 0) : -1; 
        return prev;
      });
  
      setIsAnswerCorrect((isAnswer) => {

        tempResult = isAnswer ? 1 : tempResult; // Adjust based on correctness
        resolve(tempResult); // Resolve with final result
        return isAnswer; // Update state correctly
      });
    });
  };
 
  
  
  window.nextJsHandleSubmit = nextJsHandleSubmit;


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
