import React from "react";
import MultipleChoice from "./MultipleChoice";

export default function DisabledTeacherMainMultipleChoice({obj,meter,resultView}) {
  
  return <MultipleChoice state={obj?.question_data[0]} meter={meter} resultView={resultView}/>;
}
