import React from "react";
import MultipleSelect from "./MultipleSelect";

export default function DisabledTeacherMainMultipleSelect({obj,meter,resultView={resultView}}) {
  
  return <MultipleSelect state={obj?.question_data[0]} meter={meter} resultView={resultView}/>;
}
