import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./OnlineQuiz.module.css";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
// import Awesome from "../../assets/audios/Awesome.mp3"
// import KeepIt from "../../assets/audios/keep it up.mp3"
// import Good from "../../assets/audios/Good job.mp3"
// import Nice from "../../assets/audios/Nice work.mp3"
// import Well from "../../assets/audios/Well Done.mp3"
// import YouDid from "../../assets/audios/You did it.mp3"
// import Fantastic from "../../assets/audios/Fantastic.mp3"
// import Incorrect02 from "../../assets/audios/incorrect-02.mp3"
// import Incorrec from "../../assets/audios/incorrect.mp3"

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

  const audioLists={}
//  const audioLists = {
//   correct: {
//     Awesome,
//     Good,
//     KeepIt,
//     Nice,
//     Well,
//     YouDid,
//     Fantastic,
//   },
//   incorrect: {
//     Incorrect02,
//   },
// };

const playRandomAudio = (answer) => {
  if (answer === -1) return;

  const listKey = answer === 1 ? 'correct' : 'incorrect';
  const audioList = audioLists[listKey];
  const keys = Object.keys(audioList);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const audio = new Audio(audioList[randomKey]);

  audio.play();
};


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
    playRandomAudio(temp)
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