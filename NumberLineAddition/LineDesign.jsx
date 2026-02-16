import React from 'react'
import styles from "../OnlineQuiz.module.css";
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
