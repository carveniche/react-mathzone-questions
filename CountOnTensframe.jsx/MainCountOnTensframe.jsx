import React, { useEffect } from "react"
import CountOnTensframe from "./CountOnTensframe";
// let obj = {
//     operation: "addition",
//     type: "countontenframes",
//     questionName: "How many fishes are there on the frame?",
//     questionContent:
//       '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/WaterAnimals/Fish-Red.png"\u003e',
//     answerCount: "8",
//     choices: ["8", "9", "11", "10"],
//     choiceType: "selectchoice",
//     choiceCount: 4,
//     solution: { model: [{ val: "There are 10 fishes" }] },
//   };
export default function MainCountOnTensframe({obj,meter})
{
    return <CountOnTensframe obj={obj} meter={meter} />
}