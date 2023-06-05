import React from "react"
import Vertical from "./Vertical"

// let obj={
//     "operation":"addition",
//     "type":"vertical",
//     "rows":"3",
//     "cols":"5",
//     "questionName":"Use the digits\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/1.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/2.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/3.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/4.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/5.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/6.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/7.png\"\u003e,\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/8.png\"\u003e\u0026nbsp;and\u0026nbsp;\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/9.png\"\u003e\u0026nbsp;to fill in the following so that it is true. Use each digit only once.\u0026nbsp;",
//     "questionContent":[
//        [
//           {
//              "row":0,
//              "col":0,
//              "value":"",
//              "isMissed":"true"
//           },
//           {
//              "row":0,
//              "col":1,
//              "value":"7",
//              "isMissed":"true"
//           },
//           {
//              "row":0,
//              "col":2,
//              "value":"9",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":3,
//              "value":"3",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":4,
//              "value":"2",
//              "isMissed":"false"
//           }
//        ],
//        [
//           {
//              "row":1,
//              "col":0,
//              "value":"✕",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":1,
//              "value":"",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":2,
//              "value":"",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":3,
//              "value":"",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":4,
//              "value":"2",
//              "isMissed":"false"
//           }
//        ],
//        [
//           {
//              "row":2,
//              "col":0,
//              "value":"1",
//              "isMissed":"true"
//           },
//           {
//              "row":2,
//              "col":1,
//              "value":"5",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":2,
//              "value":"8",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":3,
//              "value":"6",
//              "isMissed":"true"
//           },
//           {
//              "row":2,
//              "col":4,
//              "value":"4",
//              "isMissed":"true"
//           }
//        ]
//     ],
//     "solution":{
//        "model":[
//           {
//              "val":"\u003cspan style=\"font-size: 20px;\"\u003e\u0026nbsp; 7932\u0026nbsp;\u0026nbsp;\u003c/span\u003e\u003cdiv\u003e\u003cu style=\"font-size: 20px;\"\u003ex\u003c/u\u003e\u003cu style=\"font-size: 20px;\"\u003e\u0026nbsp; \u0026nbsp; \u0026nbsp; 2\u003c/u\u003e\u003cspan style=\"font-size: 20px;\"\u003e\u0026nbsp; \u0026nbsp;\u003c/span\u003e\u003c/div\u003e\u003cdiv\u003e\u003cspan style=\"font-size: 20px;\"\u003e\u003cu\u003e15864\u003c/u\u003e\u003c/span\u003e\u003c/div\u003e"
//           }
//        ],
//        "sidebyside":[
          
//        ],
//        "srows":null,
//        "scols":null
//     },
//     "choices":[
//        "4",
//        "6",
//        "8",
//        "5",
//        "1",
//        "2",
//        "3",
//        "9",
//        "7"
//     ],
//     "choiceType":"keying",
//     "choiceCount":9
//  }
//  obj={
//    operation: "addition",
//    type: "long_multiplication",
//    rows: "3",
//    cols: "4",
//    questionName: "Multiply numbers to find the missing digits.",
//    questionContent: [
//      [
//        { row: 0, col: 0, value: "", isMissed: "false" },
//        { row: 0, col: 1, value: "1", isMissed: "false" },
//        { row: 0, col: 2, value: "6", isMissed: "false" },
//        { row: 0, col: 3, value: "9", isMissed: "false" },
//      ],
//      [
//        { row: 1, col: 0, value: "✕", isMissed: "false" },
//        { row: 1, col: 1, value: "", isMissed: "false" },
//        { row: 1, col: 2, value: "", isMissed: "false" },
//        { row: 1, col: 3, value: "9", isMissed: "false" },
//      ],
//      [
//        { row: 2, col: 0, value: "1", isMissed: "true" },
//        { row: 2, col: 1, value: "5", isMissed: "true" },
//        { row: 2, col: 2, value: "2", isMissed: "true" },
//        { row: 2, col: 3, value: "1", isMissed: "true" },
//      ],
//    ],
//    solution: {
//      model: [{ val: "169 x 9 = 1521" }],
//      sidebyside: [],
//      srows: null,
//      scols: null,
//    },
//    choices: ["1", "5", "2", "1"],
//    choiceType: "selectchoice",
//    choiceCount: 4,
//    digits: "1",
//  };


export default function DisabledTeacherMainVertical({obj,meter})
{
    return <Vertical state={obj} totalRows={obj.rows} totalCols={obj.cols} meter={meter}/>
}