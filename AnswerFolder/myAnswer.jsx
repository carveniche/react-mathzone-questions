import React, { useContext, useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import styles from "../OnlineQuiz.module.css";
import parse, { htmlToDOM } from "html-react-parser";
import NumberBondAnswerRespone from "./NumberBondAnswerResponse/NumberBondAnswerRespone";
import CkeditorAnswerRes from "./CkeditorAnswerRes";

import { ValidationContext, ValidationContextProvider } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import newTypeQuestionChecker from "../CommonJSFiles/newTypeQuestionChecker";
import HtmlParserComponent from ".././CommonJSFiles/HtmlParserComponent";
import oldQuestionWithNoHtmlQuestion from "../CommonJSFiles/oldQuestionWithNoHtmlQuestion";
import QuestionWithNoHtmlContent from "../CommonJsxComponent/QuestionWithNoHtmlContent";
import SkippedQuestionViewer from "./SkippedQuestionViewer";
import CommonStudentResponse from "../CommonJSFiles/CommonStudentResponse";
import AllFile from "../../AllFile";
import UnsupportedQuestionType from "../../UnsupportedQuestionType/UnsupportedQuestionType";


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
  
  let temp = {};
  let hasError = false;
  const isOldTypeQuestion = specailOldTypeQuestion.includes(type);

  if (isOldTypeQuestion) {
    temp = studentResponseData;
  } else {
    try {
      const question = studentResponseData?.question_data?.[0];

      const resp = question?.student_response;

      let parsedResp = {};
      let hasContent = false;

      if (resp && typeof resp === "string") {
        try {
          parsedResp = JSON.parse(resp);
          hasContent = Object.keys(parsedResp).length > 0;
        } catch {
          parsedResp = {};
          hasContent = false;
        }
      }

      const finalResponse = hasContent
        ? parsedResp
        : question?.question_text
          ? JSON.parse(question.question_text || "{}")
          : {};

      temp = {
        ...finalResponse,
        upload_file_name: question?.upload_file_name,
      };

    } catch (e) {
      hasError = true;
      temp = studentResponseData;
    }
  }


  if (hasError) {
    return (

      <UnsupportedQuestionType type={type} isFrom={"ResultReview"} obj={studentResponseData} />
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ValidationContextProvider>
        <StudentResponce type={type} obj={studentResponseData} temp={temp} />
      </ValidationContextProvider>
    </div>
  );
}

const StudentResponce = ({ type, obj, temp }) => {
  const { handleUpdateStudentAnswerResponse } = useContext(ValidationContext)
  useEffect(() => {
    if (typeof handleUpdateStudentAnswerResponse === "function") {
      handleUpdateStudentAnswerResponse(true);
    }
  }, [handleUpdateStudentAnswerResponse]);
  return (
    <>
      < AllFile
        type={type}
        obj={obj}
        temp={temp}
        isResponse={false}
      />
    </>
  )
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
