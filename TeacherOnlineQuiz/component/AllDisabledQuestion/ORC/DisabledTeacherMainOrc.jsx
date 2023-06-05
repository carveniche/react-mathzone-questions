import React from "react"
import ORC from "./ORC";
let obj = {
  "status":true,"question_data":[{"question_id":57129,"question_text":"\u003cp\u003eDrag and drop\u003c/p\u003e\r\n","question_name":null,"question_type":"orc","upload_file_name":"","level":"level2","choice_data":[],"orc_oprc_data":[{"rows":null,"columns":null,"row_headers":"","column_headers":["Polygon","Not a polygon\u0026nbsp;"],"response":[["\u003cimg alt=\"\" src=\"/system/ckeditor_assets/attachments/3977/ps02.png\" style=\"width: 150px; height: 150px;\"\u003e"],["\u003cimg alt=\"\" src=\"/system/ckeditor_assets/attachments/3864/pc11.png\" style=\"width: 150px; height: 150px;\"\u003e","\u003cimg alt=\"\" src=\"/system/ckeditor_assets/attachments/3867/pc01.png\" style=\"width: 150px; height: 150px;\"\u003e","\u003cimg alt=\"\" src=\"/system/ckeditor_assets/attachments/3866/pc08.png\" style=\"width: 150px; height: 150px;\"\u003e"]],"extra_options":[]}],"ol_data":[]}],"tag_id":1542,"live_class_id":80032,"level":"level2","live_class_practice_id":34307,"quiz_completed":false,"question_no":5,"message":"next question added"
}
let obj2={
  "status":true,
  "question_data":[
     {
        "question_id":57121,
        "operation":null,
        "question_text":"\u003cp\u003eDrag and drop\u003c/p\u003e\r\n",
        "question_type":"orc",
        "upload_file_name":"",
        "level":"level2",
        "fib_text":null,
        "fib_before_text":null,
        "after_question_text":"",
        "choice_data":[
           
        ],
        "orc_oprc_data":[
           {
              "rows":null,
              "columns":null,
              "row_headers":null,
              "column_headers":[
                 "Polygon",
                 "Not a polygon"
              ],
              "response":[
                 [
                    "\u003cimg alt=\"\" src=\"https://www.begalileo.com/system/ckeditor_assets/attachments/3835/ps10.png\" style=\"width: 150px; height: 150px;\"\u003e",
                    "\u003cimg alt=\"\" src=\"https://www.begalileo.com/system/ckeditor_assets/attachments/3834/ps07.png\" style=\"width: 150px; height: 150px;\"\u003e"
                 ],
                 [
                    "\u003cimg alt=\"\" src=\"https://www.begalileo.com/system/ckeditor_assets/attachments/3832/pc19.png\" style=\"width: 150px; height: 150px;\"\u003e",
                    "\u003cimg alt=\"\" src=\"https://www.begalileo.com/system/ckeditor_assets/attachments/3833/pc07.png\" style=\"width: 150px; height: 150px;\"\u003e"
                 ]
              ],
              "extra_options":[
                 
              ]
           }
        ],
        "ol_data":[
           
        ]
     }
  ],
  "tag_id":1542,
  "live_class_id":80032,
  "level":"level2",
  "live_class_practice_id":34364,
  "quiz_completed":false,
  "question_no":1,
  "message":"next question added"
}

  export default function DisabledTeacherMainOrc({obj2,meter})
  {
 
      return <ORC obj={obj2?.question_data[0]} question_text={obj2?.question_data[0]?.question_text} meter={meter}/>
  }
//   <OrcAnswered obj={obj2?.question_data[0]} question_text={obj2?.question_data[0]?.question_text}/>