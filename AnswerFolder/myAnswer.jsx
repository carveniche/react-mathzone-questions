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
  var temp = {};
  let hasError = false;
  const isOldTypeQuestion = specailOldTypeQuestion.includes(type);

  if (isOldTypeQuestion) {
    temp = studentResponseData
  } else {
    try {
      let studentResponce;

      const resp =
        studentResponseData?.question_data?.[0]?.student_response;

      if (resp === null || resp === undefined || resp === "") {
        studentResponce = studentResponseData?.question_data?.[0]?.question_text
      } else {
        studentResponce = resp
      }
      const sRes = studentResponce

      const parsedRes = sRes ? JSON.parse(sRes) : {};

      temp = {
        ...parsedRes,
        upload_file_name:
          studentResponseData?.question_data?.[0]?.upload_file_name,
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
    handleUpdateStudentAnswerResponse(true)
  }, [])
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
