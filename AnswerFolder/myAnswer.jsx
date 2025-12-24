import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import styles from "../OnlineQuiz.module.css";
import parse, { htmlToDOM } from "html-react-parser";
import NumberBondAnswerRespone from "./NumberBondAnswerResponse/NumberBondAnswerRespone";
import CkeditorAnswerRes from "./CkeditorAnswerRes";

import { ValidationContextProvider } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import newTypeQuestionChecker from "../CommonJSFiles/newTypeQuestionChecker";
import HtmlParserComponent from ".././CommonJSFiles/HtmlParserComponent";
import oldQuestionWithNoHtmlQuestion from "../CommonJSFiles/oldQuestionWithNoHtmlQuestion";
import QuestionWithNoHtmlContent from "../CommonJsxComponent/QuestionWithNoHtmlContent";
import SkippedQuestionViewer from "./SkippedQuestionViewer";
import CommonStudentResponse from "../CommonJSFiles/CommonStudentResponse";


export default function MyAnswer({
  obj,
  type,
  timerStatus,
  studentResponseData,
  questionData,
  showSkippedQuestion,
  showExtraDom,
  pageFrom,
}) {
  let specailOldTypeQuestion = oldQuestionWithNoHtmlQuestion();
  let responseAnswer = {};
  try {
    responseAnswer = JSON.parse(obj?.question_response);
  } catch (e) {
    responseAnswer = {};
  }
 
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {typeof obj === "undefined" ? (
        <div>
          {/* <div className={styles.skippedQuestionTitle}>
            <h1> {showExtraDom}Student has not answered this question.</h1>
          </div> */}
          {showSkippedQuestion && <SkippedQuestionViewer obj={questionData} />}
        </div>
      ) : (
        obj?.correct !== undefined && pageFrom !="mathZoneResultReview" && (
          <div className={styles.answerBoxContainer}>
            <AnswerBox
              // background={
              //   obj?.correct == true
              //     ? "#cceea5"
              //     : obj?.correct == false
              //     ? "#fae0e0"
              //     : "initial"
              // }
              color={
                obj?.correct == true
                  ? "#6caf20"
                  : obj?.correct == false
                  ? "#eb5953"
                  : "initial"
              }
            >
              {obj?.correct == true
                ? <img
                  src={`https://d2jhdcglwxx007.cloudfront.net/correct.png`}
                  alt="correct/incorrect"
                />
                : obj?.correct == false
                ? <img
                    src={`https://d2jhdcglwxx007.cloudfront.net/incorrect.png`}
                    alt="correct/incorrect"
                  />
                : ""}
            </AnswerBox>
            {!timerStatus && (
              <div className={styles.timerContainer}>
                <div className={styles.timerCircle}>
                  <span className={styles.timerTime} id={styles.timerDisplay}>
                    {(() => {
                      let mm = Math.floor((obj?.time_spent || 0) / 60);
                      let ss = (obj?.time_spent || 0) % 60;
                      return `${mm.toString().padStart(2, "0")}:${ss
                        .toString()
                        .padStart(2, "0")}`;
                    })()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      )}
      {obj && obj?.question_response ?
        (specailOldTypeQuestion?.includes(type) ? (
          <ValidationContextProvider>
            <QuestionWithNoHtmlContent
              type={type}
              obj={studentResponseData}
              choicesId={
                studentResponseData?.result_data &&
                studentResponseData?.result_data[0]?.choice_id
              }
              studentResponse={obj?.question_response}
            />
          </ValidationContextProvider>
        ) : newTypeQuestionChecker(type) ? (
          <ValidationContextProvider>
            <CommonStudentResponse
              data={responseAnswer}
              type={responseAnswer?.type}
            />
          </ValidationContextProvider>
        ) : (
          <HtmlParserComponent value={obj?.question_response} />
        )):
        (typeof obj !== "undefined" && (
          <div
            style={{
              // height: "100vh",
              minHeight: "200px",   // or any meaningful height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",       // default browser font size
              fontWeight: "bold",
            }}
          >
            Student response not available.
          </div>
        ))
        
        }
    </div>
  );
}

const AnswerBox = styled.div`
  width: 200px;

  padding-left: 1rem;
  height: 60px;
  display: flex;
  font-family: var(--fn);
  border-radius: 5px;

  align-items: center;
  font-weight: normal;
  color: ${(props) => props.color};
  font-size: 20px;
  //align-self:center;
  background-color: ${(props) => props.background};
  margin-bottom: 2rem;
  border: ${(props) => (props.background ? 1 : 0)}px solid black;
`;
