import React from "react";
import MultipleSelect from "./MultipleSelect";

export default function MainMultipleSelect({obj,meter,choiceId}) {
  let studentAnswer=[]
  let question_data =obj?.question_data||[]
  question_data=question_data[0]||{}
  studentAnswer=question_data?.studentAnswer||[]
  return <MultipleSelect state={obj?.question_data[0]} meter={meter} choiceId={studentAnswer}/>;
}
