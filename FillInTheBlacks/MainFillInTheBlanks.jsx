import React from "react"
import FillInTheBlanks from "./FillInTheBlanks";

export default function MainFillInTheBlanks({obj,meter,choiceId}){
  let studentAnswer=""
  let question_data=obj?.question_data||[]
  question_data=question_data[0]||{}
  studentAnswer=question_data?.studentAnswer
    return <FillInTheBlanks state={obj?.question_data[0]} meter={meter} choiceId={studentAnswer}/>
}