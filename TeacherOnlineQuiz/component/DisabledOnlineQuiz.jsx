import React from 'react';
import DisabledCountTensframe from './DisabledCountTensframe';


let obj = {
  operation: "addition",
  type: "count_tenframes_multiple",
  questionName: "How many counters are there?",
  questionContentText: "",
  questionContent: [
    {
      row: 1,
      col: 1,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 1,
      col: 2,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 1,
      col: 3,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 1,
      col: 4,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 1,
      col: 5,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 2,
      col: 1,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 2,
      col: 2,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 2,
      col: 3,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 2,
      col: 4,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    },
    {
      row: 2,
      col: 5,
      image:
        '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Circle-red.png"\u003e'
    }
  ],
  answerCount: "10",
  choices: ["10", "11", "12", "9"],
  choiceType: "selectchoice",
  choiceCount: 4,
  solution: { model: [{ val: "There are 10 counters" }] }
};
let n = obj.questionContent.length;

function DisabledOnlineQuiz({obj}) {
  let totalRow = 1;
for (let i = 1; i < n; i++) {
  let prev = obj.questionContent[i - 1].row;
  let curr = obj.questionContent[i].row;
  if (prev !== curr) totalRow += 1;
}
  //console.log(obj)
  return <>
 <DisabledCountTensframe state={obj} totalRows={totalRow}/>

  </>
}
export default DisabledOnlineQuiz;
