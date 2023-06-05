import React from "react";
import HorizontalFillUps from "../HorizontalFillUps/HorizontalFillUps";
import Horizontal from "./Horizontal";

// let obj={
//     "operation":"addition",
//     "type":"horizontal",
//     "rows":"4",
//     "cols":"5",
//     "questionName":"\u003cdiv\u003eIn the following equations ♥ represents a particular rule. Find the rule for this set of equations to complete the last equation.\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e",
//     "questionContent":[
//        [
//           {
//              "row":0,
//              "col":0,
//              "value":"7",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":1,
//              "value":"♥",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":2,
//              "value":"2",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":3,
//              "value":"=",
//              "isMissed":"false"
//           },
//           {
//              "row":0,
//              "col":4,
//              "value":"25",
//              "isMissed":"false"
//           }
//        ],
//        [
//           {
//              "row":1,
//              "col":0,
//              "value":"16",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":1,
//              "value":"♥",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":2,
//              "value":"9",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":3,
//              "value":"=",
//              "isMissed":"false"
//           },
//           {
//              "row":1,
//              "col":4,
//              "value":"49",
//              "isMissed":"false"
//           }
//        ],
//        [
//           {
//              "row":2,
//              "col":0,
//              "value":"9",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":1,
//              "value":"♥",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":2,
//              "value":"3",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":3,
//              "value":"=",
//              "isMissed":"false"
//           },
//           {
//              "row":2,
//              "col":4,
//              "value":"36",
//              "isMissed":"false"
//           }
//        ],
//        [
//           {
//              "row":3,
//              "col":0,
//              "value":"13",
//              "isMissed":"false"
//           },
//           {
//              "row":3,
//              "col":1,
//              "value":"♥",
//              "isMissed":"false"
//           },
//           {
//              "row":3,
//              "col":2,
//              "value":"9",
//              "isMissed":"false"
//           },
//           {
//              "row":3,
//              "col":3,
//              "value":"=",
//              "isMissed":"false"
//           },
//           {
//              "row":3,
//              "col":4,
//              "value":"16",
//              "isMissed":"true"
//           }
//        ]
//     ],
//     "solution":{
//        "model":[
//           {
//              "val":"The rule is – Find the difference between the 2 numbers and square it.7 ♥ 2 = 25 16 ♥ 9 = 49 9 ♥ 3 = 36 13 ♥ 9 = 16"
//           }
//        ],
//        "sidebyside":[
          
//        ],
//        "srows":null,
//        "scols":null
//     },
//     "choices":[
//        "16"
//     ],
//     "choiceType":"keying",
//     "choiceCount":1
//  }

export default function MainHorizontal({obj,meter}){
    
    let totalRows=Number(obj?.rows)||0
    let arr=[]
    try{
    for(let i=0;i<totalRows;i++)
    {
        obj?.questionContent[i]?.map((item,j)=>{
            item.row==i&&item.col==j&&arr.push({...item})
        })
    }
    obj={...obj,questionContent:[...arr]}
}
catch(e){
  
}
    return <HorizontalFillUps state={obj} totalRows={obj?.rows} totalCols={obj?.cols} meter={meter} questionType="horizontal"/>
}