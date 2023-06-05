import React from "react";
import DisabledPlaceValueTableSelect from "./DisabledPlaceValueTableSelect";
let obj={
    "operation":"addition",
    "type":"place_value_table_select",
    "rows":"4",
    "cols":"2",
    "questionName":"\u003cdiv\u003eComplete the table:\u0026nbsp;\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e",
    "questionContent":[
       [
          {
             "row":0,
             "col":0,
             "value":"5",
             "isMissed":"false"
          },
          {
             "row":0,
             "col":1,
             "value":"5000",
             "isMissed":"true"
          }
       ],
       [
          {
             "row":1,
             "col":0,
             "value":"3",
             "isMissed":"false"
          },
          {
             "row":1,
             "col":1,
             "value":"3000",
             "isMissed":"true"
          }
       ],
       [
          {
             "row":2,
             "col":0,
             "value":"8",
             "isMissed":"false"
          },
          {
             "row":2,
             "col":1,
             "value":"8000",
             "isMissed":"true"
          }
       ],
       [
          {
             "row":3,
             "col":0,
             "value":"7",
             "isMissed":"false"
          },
          {
             "row":3,
             "col":1,
             "value":"7000",
             "isMissed":"true"
          }
       ]
    ],
    "questiontbHead":[
       {
          "row":0,
          "value":"Liters"
       },
       {
          "row":1,
          "value":"Milliliters"
       }
    ],
    "solution":{
       "model":[
          {
             "val":"1 liters = 1000 milliliters"
          }
       ],
       "sidebyside":[
          
       ],
       "srows":null,
       "scols":null
    },
    "choices":[
       
    ],
    "choiceType":"keying",
    "pvts_text_head":""
 }


export default function DisabledMainValueTableSelect()
{
    return <DisabledPlaceValueTableSelect state={obj} totalRows={obj?.rows}/>
}