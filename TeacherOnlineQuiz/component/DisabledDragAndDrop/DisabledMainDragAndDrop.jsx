import React from "react"
import DisabledDragAndDrop from "./DisabledDragAndDrop"
let obj={
    "operation":"addition",
    "type":"compare_drag_operator",
    "rows":"1",
    "cols":"3",
    "questionName":"Which words make this statement correct?",
    "questionContent":[
       {
          "row":0,
          "col":0,
          "value":"29",
          "isMissed":"false"
       },
       {
          "row":0,
          "col":1,
          "value":"is less than",
          "isMissed":"true"
       },
       {
          "row":0,
          "col":2,
          "value":"33",
          "isMissed":"false"
       }
    ],
    "solution":{
       "model":[
          {
             "val":"29 is less than 33"
          }
       ],
       "sidebyside":[
          
       ],
       "srows":null,
       "scols":null
    },
    "choices":[
       {
          "selected":"false",
          "value":"is equal to"
       },
       {
          "selected":"false",
          "value":"is more than"
       },
       {
          "selected":"true",
          "value":"is less than"
       }
    ],
    "choiceType":"dragdrop",
    "choiceCount":3
 }
export default function DisabledMainDragAndDrop()

{
    return <DisabledDragAndDrop state={obj} totalRows={obj.rows} totalColumns={obj.cols}/>
}