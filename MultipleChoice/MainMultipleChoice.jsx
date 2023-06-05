import React from "react";
import MultipleChoice from "./MultipleChoice";
export default function MainMultipleChoice({obj,meter,choiceId}) {
  let studentAnswer=""
  let question_data=obj?.question_data||[]
  question_data=question_data[0]||{}
  studentAnswer=question_data?.studentAnswer
  return <MultipleChoice state={obj?.question_data[0]} meter={meter} choiceId={studentAnswer}/>;
}
