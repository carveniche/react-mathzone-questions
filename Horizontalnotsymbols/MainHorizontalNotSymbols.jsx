import React from "react";
import HorizontalNotSymbols from "./HorizontalNotSymbols";

// let obj={
//     "operation":"addition",
//     "type":"horizontalnotsymbols",
//     "rows":"1",
//     "cols":"5",
//     "questionName":"The numbers are arranged from greatest to least. Find the missing number.",
//     "questionContentText":"Greatest to least",
//     "questionContent":[
//        [
//           {
//              "row":1,
//              "col":1,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/43.png\"\u003e"
//           },
//           {
//              "row":1,
//              "col":2,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/39.png\"\u003e"
//           },
//           {
//              "row":1,
//              "col":3,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/27.png\"\u003e"
//           },
//           {
//              "row":1,
//              "col":4,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/Question-mark.png\"\u003e"
//           },
//           {
//              "row":1,
//              "col":5,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/21.png\"\u003e"
//           }
//        ]
//     ],
//     "solution":{
//        "model":[
//           {
//              "val":"The missing number is 26"
//           }
//        ],
//        "sidebyside":[
          
//        ],
//        "srows":null,
//        "scols":null
//     },
//     "choices":[
//        "19",
//        "34",
//        "26",
//        "24"
//     ],
//     "choiceType":"selectchoice",
//     "choiceCount":4,
//     "answerValue":"26"
//  }

export default function MainHorizontalNotSymbols({obj,meter})
{
return (<>
<HorizontalNotSymbols state={obj} totalRows={obj.rows} meter={meter}/>
</>)
}
