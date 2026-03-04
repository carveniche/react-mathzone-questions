import React, { useContext } from 'react'
import styles from "../OnlineQuiz.module.css";
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
export default function LineDesign({lines}) {
  return (
    <div className={styles.hori}>
            <div id={styles.horizontal_line}>

                <div id="xline" className={styles.xline}>
                    <div className={styles.arrowLeft}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 60 36"
                            width="60"
                            height="36"
                        >
                            <path fill="none" d="M0 0h60v36H0z" />
                            <path
                                d="M14 18l15-10M15 18l15 10"
                                stroke="#888888"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className={styles.arrowBotline}></div>
                    </div>
                    {lines.map((line, i) => (
                        <React.Fragment key={i}>{line}</React.Fragment>
                    ))}
                    <div className={styles.arrowRight}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 60 36"
                            width="60"
                            height="36"
                        >
                            <path fill="none" d="M0 0h60v36H0z" />
                            <path
                                transform="rotate(180 30 18)"
                                d="M14 18l15-10M15 18l15 10"
                                stroke="#888888"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className={styles.arrowBotline}></div>
                    </div>
                </div>
            </div>
        </div>
  )
}




export  function LineDesignNew({ lines ,numberLine,question}) {
   const {
            hasAnswerSubmitted,
            isStudentAnswerResponse,
        } = useContext(ValidationContext);

    const isDisabled = hasAnswerSubmitted || isStudentAnswerResponse;
    const numsDisplayed =  question?.numbersDisplayed
    console.log(numsDisplayed,"numbersDisplayed")
  return (
    <div className={styles.hori}>
      <div id={styles.horizontal_line}>

        <div id="xline" className={styles.xline}>
          <div className={styles.arrowLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 36"
              width="60"
              height="36"
            >
              <path fill="none" d="M0 0h60v36H0z" />
              <path
                d="M14 18l15-10M15 18l15 10"
                stroke="#888888"
                strokeWidth="2"
              />
            </svg>
            <div className={styles.arrowBotline}></div>
          </div>
          {numberLine?.map((item, index) => {
           const sortedAnswers = [...question.ansArray].sort((a, b) => a - b);
            const answerIndex = sortedAnswers.indexOf(item.value);
            const isAnswerPoint = answerIndex !== -1;
            const showLabel = !numsDisplayed && index === 0 ;
          
            return (
              <div
                key={index}
                className={
                  isDisabled
                    ? styles.answeredSection
                    : styles.section
                }
                style={{ minWidth: "45px" }}
              >
                <div className={styles.botline}></div>

                <div className={styles.ticktext}>
                  <div className={styles.keyVertBar}></div>

                  {isAnswerPoint ? (
                    <input
                      readOnly={isDisabled}
                      className={`${styles.checkNumLine} answers`}
                      style={{
                        width: `${item.label.length * 14}px`,
                        margin: "2px"
                      }}
                      type="text"
                      defaultValue={isStudentAnswerResponse ? question?.student_answer[answerIndex] : ""}
                    />
                  ) : (
                      <p
                        className={styles.mapBox}
                        style={{ display: showLabel ? "block" : "none" }}
                      ></p>
                  )}
                </div>
              </div>
            );
          })}
          <div className={styles.arrowRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 36"
              width="60"
              height="36"
            >
              <path fill="none" d="M0 0h60v36H0z" />
              <path
                transform="rotate(180 30 18)"
                d="M14 18l15-10M15 18l15 10"
                stroke="#888888"
                strokeWidth="2"
              />
            </svg>
            <div className={styles.arrowBotline}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
