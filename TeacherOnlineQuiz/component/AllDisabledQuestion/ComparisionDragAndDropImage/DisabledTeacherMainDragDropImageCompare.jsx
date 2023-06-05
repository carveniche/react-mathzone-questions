import React from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"
import DragAndDropImageCompare from "./DragAndDropImageCompare"
// let obj={
//    "operation":"addition",
//    "type":"comparison_of_images",
//    "rows":"1",
//    "cols":"3",
//    "questionName":"Choose the correct symbol.",
//    "questionContent":[
//       [
//          {
//             "row":0,
//             "col":0,
//             "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/10.png\"\u003e",
//             "isMissed":"false"
//          },
//          {
//             "row":0,
//             "col":1,
//             "value":"=",
//             "isMissed":"true"
//          },
//          {
//             "row":0,
//             "col":2,
//             "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/15.png\"\u003e",
//             "isMissed":"false"
//          }
//       ]
//    ],
//    "solution":{
//       "model":[
//          {
//             "val":"7 = 7"
//          }
//       ],
//       "sidebyside":[
         
//       ],
//       "srows":null,
//       "scols":null
//    },
//    "choices":[
//       "\u003c",
//       "=",
//       "\u003e"
//    ],
//    "choiceType":"dragdrop",
//    "choiceCount":3
// }
export default function DisabledTeacherMainDragDropImageCompare({obj,meter})
{

    return<>
   
    <DragAndDropImageCompare state={obj} totalRows={obj.rows} totalColumns={obj.cols} meter={meter}/>
    </>
}