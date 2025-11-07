import React from "react";
import FillInTheBlanks from "./FillInTheBlanks";

export default function MainFillInTheBlanks({ obj, meter, choiceId }) {
  let question_data = obj?.question_data || [];
  question_data = question_data[0] || {};
  studentAnswer = question_data?.studentAnswer;

  let studentAnswer = question_data?.studentAnswer ?? "";

  // --- Safe parse logic ---
  if (typeof studentAnswer === "string") {
    try {
      const parsed = JSON.parse(studentAnswer);
      studentAnswer = isNaN(parsed) ? parsed : Number(parsed);
    } catch {
      studentAnswer = isNaN(studentAnswer) ? studentAnswer : Number(studentAnswer);
    }
  }
  
 
  return (
    <FillInTheBlanks
      state={obj?.question_data[0]}
      meter={meter}
      choiceId={studentAnswer || choiceId}
    />
  );
}
