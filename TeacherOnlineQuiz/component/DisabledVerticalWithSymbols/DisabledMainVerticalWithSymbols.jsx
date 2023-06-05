import React from "react"
import DisabledVerticalWithSymbols from "./DisabledVerticalWithSymbols"
// let obj={
//     "operation":"addition",
//     "type":"verticalwithsymbols",
//     "rows":"1",
//     "cols":"3",
//     "questionName":"Add using models",
//     "questionContentText":"",
//     "questionContent":[
//        [
//           {
//              "row":1,
//              "col":1,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Blue-Ten.png\"\u003e"
//           },
//           {
//              "row":1,
//              "col":2,
//              "value":"+"
//           },
//           {
//              "row":1,
//              "col":3,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Ten.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Ten.png\"\u003e"
//           }
//        ]
//     ],
//     "solution":{
//        "model":[
//           {
//              "val":"90 + 50 = 140"
//           }
//        ],
//        "sidebyside":[
          
//        ],
//        "srows":null,
//        "scols":null
//     },
//     "choices":[
//        "160",
//        "150",
//        "130",
//        "140"
//     ],
//     "choiceType":"selectchoice",
//     "choiceCount":4,
//     "answer":"140"
//  }
export default function DisabledMainVerticalWithSymbols({obj,meter})
{
    return <DisabledVerticalWithSymbols state={obj} totalRows={obj.rows} totalCols={obj.cols} meter={meter}/>
}