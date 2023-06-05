import React, { useEffect } from "react"
import { useState } from "react";
import HtmlParser from "react-html-parser";
import DisabledOnlineQuizSelectChoiceOption from "./DisabledOnlineQuizSelectChoiceOption";
import DisabledQuizSolution from "./DisabledQuizSolution";
import styles from "../../OnlineQuiz.module.css";
import ContentCountTensframeQuiz from "../../ContentCountTensframeQuiz";
function DisabledCountTensframe({ state, totalRows }) {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <div >
            <div>
                <div className={styles.questionName}>{HtmlParser(state?.questionName)}</div>
                <div>
                    <div className={styles.border}>
                        <div></div>
                    </div>
                </div>
                <div class={styles.contentParent} >
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
                        <DisabledOnlineQuizSelectChoiceOption
                            choices={state?.choices}
                        />
                    )}
                </div>
                <div>
                    <div>
                        <div >
                            <div className={styles.parentSolutionMargin}>
                                <div >
                                    <b> Correct Solution is</b>
                                </div>
                                <div style={{ color: 'black' }}>
                                    <b>{state?.answer && state?.answer}</b>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div >
                            <DisabledQuizSolution model={state?.solution?.model} />
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}
export default DisabledCountTensframe;
