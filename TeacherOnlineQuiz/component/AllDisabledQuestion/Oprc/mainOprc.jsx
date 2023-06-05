import React from "react";
import Oprc from "./Oprc";
let obj = {
  questionName:
    "<p>Drag and drop the correct steps that show the procedure and example to check if a given pair of numbers is co-prime.</p>\r\n",
  columnHead: ["Step 1", "Step 2", "Step 3"],
  questionContent: [
    ["Find the factors of the given numbers."],
    ["Identify the common factors."],
    [
      "If the common factor is 1, the numbers are co-prime; else they are not co-prime.",
    ],
    ["Factors of 12 --&gt; 1, 2, 3, 4, 6, 12 ; Factors of 25 --&gt; 1, 5, 25"],
    ["Common factor --&gt; 1"],
    ["Hence 12 and 25 are co-prime."],
  ],
  rowhead: [
    '<strong><span style="color:#800080;"><span style="background-color:#00FFFF;">Procedure</span></span></strong>',
    '<strong><span style="color:#800080;"><span style="background-color:#00FFFF;">Example</span></span></strong>',
  ],
};
let obj2 = {
  status: true,
  question_data: [
    {
      question_id: 20304,
      operation: null,
      question_text:
        "\u003cp\u003eDrag and drop the correct numbers for dividend, divisor and quotient.\u003c/p\u003e\r\n",
      question_type: "oprc",
      upload_file_name: "",
      level: "level2",
      fib_text: null,
      fib_before_text: null,
      after_question_text: "",
      choice_data: [],
      orc_oprc_data: [
        {
          rows: null,
          columns: null,
          row_headers: [
            "Divide 27 ice\u0026nbsp;creams among 3 children. \u0026nbsp;",
            "Divide 24 lollipops among 4 children.",
          ],
          column_headers: ["Dividend", "Divisor", "Quotient"],
          response: [["27"], ["3"], ["9"], ["24"], ["4"], ["6"]],
          extra_options: [],
        },
      ],
      ol_data: [],
    },
  ],
  tag_id: 94,
  live_class_id: 80032,
  level: "level2",
  live_class_practice_id: 34782,
  quiz_completed: false,
  question_no: 4,
  message: "next question added",
};
export default function MainOprc({obj2,meter}) {
  return <Oprc obj={obj2?.question_data[0]} meter={meter}/>;
}
