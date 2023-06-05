import React from "react";
import DisabledBlockBaseImage from "./DisabledBlockBaseImage";


// let obj={
//     "operation":"addition",
//     "type":"base_block_images",
//     "rows":"1",
//     "cols":"1",
//     "questionName":"Use the model to subtract\u0026nbsp;\u003cdiv\u003e800 - 300\u0026nbsp;\u003c/div\u003e",
//     "questionContent":[
//        [
//           {
//              "row":0,
//              "col":0,
//              "value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e"
//           }
//        ]
//     ],
//     "solution":{
//        "model":[
//           {
//              "val":"800 - 300 = 500\u0026nbsp;"
//           }
//        ],
//        "sidebyside":[
          
//        ],
//        "srows":null,
//        "scols":null
//     },
//     "choices":[
//        "50",
//        "500",
//        "40",
//        "400"
//     ],
//     "choiceType":"selectchoice",
//     "choiceCount":4,
//     "answer":"500"
//  }
export default function DisabledMainBlockBaseImage({obj,meter}){
    // console.log(obj)
    return <DisabledBlockBaseImage state={obj} totalRows={obj.rows} meter={meter}/>
}