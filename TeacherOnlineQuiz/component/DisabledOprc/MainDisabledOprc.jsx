import React from "react";
import DisabledOprc from "./DisabledOprc";
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

export default function MainDisabledOprc({obj}){
    return <DisabledOprc obj={obj}/>
}