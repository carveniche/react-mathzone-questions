import React from "react"
import FillInTheBlanks from "./FillInTheBlanks";

let obj = {
  status: true,
  question_data: [
    {
      question_id: 31955,
      operation: null,
      question_text: "",
      question_type: "Fill in the blanks",
      upload_file_name: "",
      level: "level3",
      fib_text: "",
      fib_before_text:
        "The value of (25 - 8 ) + (51 + 48) estimated to the nearest 10 is",
      after_question_text: null,
      choice_data: [
        {
          choice_id: 75141,
          choices: "120",
          correct: null,
          choice_image: "",
          solution:
            "25 is rounded as 30. \u003cbr/\u003e\n8 is rounded as 10. \u003cbr/\u003e\n51 is rounded as 50. \u003cbr/\u003e\n48 is rounded as 50. \u003cbr/\u003e\nThus, (25 - 8) + (51 + 48) is rounded as (30 - 10) + (50 + 50) = 120",
          solution_image: "",
          solution1: "",
          solution1_image: "",
          solution2: "",
          solution2_image: "",
        },
      ],
      orc_oprc_data: [],
      ol_data: [],
    },
  ],
  tag_id: 1150,
  live_class_id: 80032,
  level: "level3",
  live_class_practice_id: 34440,
  quiz_completed: false,
  question_no: 5,
  message: "next question added",
};

export default function DisabledTeacherMainFillInTheBlanks({obj,meter}){
    return <FillInTheBlanks state={obj?.question_data[0]} meter={meter}/>
}