import React, { useContext, useState } from "react";
import HtmlParser from "react-html-parser";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components"
import { ProgressBorder } from "../../../../../Modal2/modal2";
export default function FillInTheBlanks({ state,meter }) {
  const [inputState, setInputState] = useState("");
  meter=Number(meter)||0
  const handleChange = (e) => {
    setInputState(e.target.value);
  };
  const  hasAnswerSubmitted=true
  return (
    <div>
      <div className={styles.questionName}>
        {state?.question_text && <div>{HtmlParser(state?.question_text)}</div>}
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} /></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <FlexBox>
          {state?.fib_before_text && (
            <div>{HtmlParser(state?.fib_before_text)}</div>
          )}
          <Input type="text" value={inputState} onChange={handleChange} disabled={hasAnswerSubmitted}/>{state?.fib_text&&<div>{HtmlParser(state?.fib_text)}</div>}
          {state?.after_question_text && (
            <div>{HtmlParser(state?.after_question_text)}</div>
          )}
        </FlexBox>
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items:center;
  width:auto;
`;
const Input = styled.input`
  width: 80px;
  height: fit-content;
  min-height:40px;
  text-align:center;
`;
