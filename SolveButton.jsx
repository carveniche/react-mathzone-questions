import React, { useContext, useEffect, useRef, useState } from "react";
import CorrectAnswerAnimation from "../../components/LottieTransformation/CorrectAnswerAnimation";
import GameLoseEmotionMathZone from "../../components/LottieTransformation/GameLoseEmotionMathZone";
import { handleResizeCheckBtn } from "../MainOnlineQuiz/handleResizeWidth";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "./OnlineQuiz.module.css";
export default function SolveButton({ onClick }) {
  const excludeParticipant=["sm","audit","smmanager","","parent"]
  const [openAnimation, setOpenAnimation] = useState(false);
  const timer1 = useRef(null);
  const timer2 = useRef(null);
  const { hasAnswerSubmitted, currentIdentity, isAnswerCorrect,setHasAnswerSubmitted,setIsAnswerCorrect } =
    useContext(ValidationContext);
    const handleSubmit=()=>{
      onClick()
      let temp=false
  setHasAnswerSubmitted(prev=>{

      setIsAnswerCorrect(isAnswer=>{
        temp=prev?(isAnswer?1:0):-1
        return isAnswer
      })
      return prev
    })
    console.log(temp,'temp')
      return temp
    }
    window.handleSubmit=handleSubmit
  useEffect(() => {
    if (excludeParticipant.includes(currentIdentity)) handleResizeCheckBtn();
    if (hasAnswerSubmitted) {
      handleOpenAnimation();
    }
    return () => {
      clearTimeout(timer1.current);
      clearTimeout(timer2.current);
    };
  }, [hasAnswerSubmitted]);
  const handleOpenAnimation = () => {
    timer1.current = setTimeout(() => {
      setOpenAnimation(true);
      clearTimeout(timer1.current);
      handleCloseAnimation();
    }, 500);
  };
  const handleCloseAnimation = () => {
    timer2.current = setTimeout(() => {
      setOpenAnimation(false);
      clearTimeout(timer2.current);
    }, 5000);
  };
  useEffect(()=>{
    if(excludeParticipant?.includes(currentIdentity))
    return
    handleResizeCheckBtn()
  },[hasAnswerSubmitted])
  return (
    false?  <>
      {hasAnswerSubmitted ? (
        <div
          className={`${styles.checkButton} ${styles.checkButtonWaiting}`}
          id="solveBtn"
        >
          <b>please wait...</b>
        </div>
      ) : (
        <button
          onClick={onClick}
          className={`${styles.checkButton} ${styles.checkButtonColor}`}
          id="solveBtn"
        >
          Solve
        </button>
      )}
    </>:null
  );
}
