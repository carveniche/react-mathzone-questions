import React from "react"
import DisabledOl from "./DisabledOl";

// const obj = {
//     questionName:
//       "<p>The steps to check if a given pair of numbers is co-prime is listed below.</p>\r\n\r\n<p>Arrange in the correct order.</p>\r\n",
//     questionContent: [
//       "<p>Find the factors of the given numbers.</p>\r\n",
//       "<p>Find the common factors of the given numbers.</p>\r\n",
//       "<p>If the common factor is only 1, then the numbers are co-prime.</p>\r\n",
//     ],
//     text:'<p>For example, 4, 9 are co-prime.</p>\r\n'
//   };
  export default function MainDisabledOl({obj2}){
    let obj1={}
    try{
     obj1={
      questionName:obj2?.question_data[0]?.question_text,
      questionContent:[...obj2?.question_data[0]?.ol_data[0]?.response],
      text:obj2?.question_data[0]?.after_question_text,
      upload_file_name:obj2?.question_data[0]?.upload_file_name
    }}
    catch(e){
      obj1={...obj2}
      console.log('something happened...',e)
    }
      return <DisabledOl obj={obj1} />
  }