import React from "react"
import styles from "./OnlineQuiz.module.css";
export default function SolveButton({onClick,hasAnswerSubmitted})
{
    return  hasAnswerSubmitted?<div style={{float:'right'}}><b>please wait...</b></div>:<button onClick={onClick} className={styles.checkButton}>Solve</button>
}