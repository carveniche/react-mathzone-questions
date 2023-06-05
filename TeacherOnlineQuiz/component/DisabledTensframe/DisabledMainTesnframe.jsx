import React from "react"
import DisabledTensFrame from "./DisabledTensframe"
// let obj=
//     {
//         "operation":"addition",
//         "type":"tenframes",
//         "questionName":"Add counters in the frame to make 10\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e",
//         "questionContent":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/GS-110.png\"\u003e",
//         "answerCount":"10",
//         "rows":2,
//         "columns":5
//      }

     
export default function DisabledMainTensframe({obj,meter}){
    return <DisabledTensFrame totalColumns={obj.columns} totalRows={obj.rows} state={obj} meter={meter}/>
}