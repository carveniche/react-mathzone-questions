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
    responseAnswer = JSON.parse(obj?.student_response);
  } catch (e) {
    responseAnswer = {};
  }
  // const [skippQuestionData, setSkippQuestionData] =useState({})
  //  useEffect(()=>{
  //   setSkippQuestionData({ question_data: [questionData] ?? {} })
  //  },[questionData])
  const question_status = ["Not attempted", "Skipped"]


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {(question_status.includes(obj?.question_status)) && newTypeQuestionChecker(type) && (
        <div>
          {studentResponseData && <SkippedQuestionViewer obj={studentResponseData} />}
        </div>
      )}
      {obj ?
        (specailOldTypeQuestion?.includes(type) ? (
          <ValidationContextProvider>
            <QuestionWithNoHtmlContent
              type={type}
              obj={studentResponseData}
              choicesId={
                studentResponseData?.question_data?.[0] &&
                studentResponseData?.question_data?.[0]?.student_answer
              }
              studentResponse={obj?.student_response}
            />
          </ValidationContextProvider>
        ) : (newTypeQuestionChecker(type) && (!question_status.includes(obj?.question_status))) ? (
          <ValidationContextProvider>
            <CommonStudentResponse
              data={responseAnswer}
              type={responseAnswer?.type}
            />
          </ValidationContextProvider>
        ) : (
          <HtmlParserComponent value={obj?.student_response} />
        )) :
        (obj?.student_response !== null && (
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
