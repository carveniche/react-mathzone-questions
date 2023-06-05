import React from "react"
import DisabledQuestionTextImage from "./DisabledQuestionTextImage"
// let obj={
//    "operation":"addition",
//    "type":"questiontextimages",
//    "questionName":"The point H(3, -3) is reflected across the y-axis. What are the coordinates of the resulting point, H′?",
//    "questionContent":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/T-Coordinates/CRD_25.png\"\u003e",
//    "questionContentText":"",
//    "choiceType":"selectchoice",
//    "solution":{
//       "model":[
//          {
//             "val":"H' =\u0026nbsp;\u003cspan style=\"text-align: center;\"\u003e(-3, -3)\u003c/span\u003e"
//          }
//       ],
//       "sidebyside":[
         
//       ],
//       "srows":null,
//       "scols":null
//    },
//    "choices":[
//       {
//          "image":"(-3, -3)",
//          "option":"true"
//       },
//       {
//          "image":"(3, -3)",
//          "option":"false"
//       },
//       {
//          "image":"(3, 3)",
//          "option":"false"
//       },
//       {
//          "image":"(-3, -2)",
//          "option":"false"
//       }
//    ]
// }
export default function DisabledMainQuestionTextImage({obj,meter}){

return <DisabledQuestionTextImage state={obj} meter={meter}/>
}