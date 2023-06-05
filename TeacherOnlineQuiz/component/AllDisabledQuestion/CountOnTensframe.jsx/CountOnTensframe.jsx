import React, { useContext, useRef } from "react"
import ContentCountOnTensframe from "./ContentCountOnTensframe"
import styles from "../OnlineQuiz.module.css";
import SelectCountOnTensframe from "./SelectCountOnTensframe";
import HtmlParser from "react-html-parser";

const validationForSelectChoice=(choices,answer)=>{
  let n=choices?.length||0
  let val=null
  
  for(let i=0;i<n;i++)
  {
   
    if(choices[i]?.show)
    {
     
      val=choices[i]?.value
      if(String(answer).trim()==String(val).trim())
      return 2
      else return 1
    }
  }
  
  return 0


  }
const answerUpdationStatus=(setAnswerCorrectStatus,setAnswerSubmitStatus,val)=>{
  console.log(val)
  
    if(val===0)
    {
      alert('please select all the answer...')
      return
    }
    else if(val===1)
    setAnswerCorrectStatus(false)
    else if(val===2)
    setAnswerCorrectStatus(true)
    setAnswerSubmitStatus(true)
  }
export default function CountOnTensframe({obj,meter}){
  meter=Number(meter)||0
  const inputRef=useRef()
  console.log(obj)

return <div>

    <div>
    <div className={styles.questionName}>{typeof obj?.questionName=="string"?HtmlParser(obj?.questionName):obj?.questionName}</div>
    {obj?.upload_file_name&&<div><img src={obj?.upload_file_name} alt="image not found"/></div>}
    <div>
          <div className={styles.border}>
            <div></div>
          </div>
        </div>
    <div>
        <ContentCountOnTensframe content={obj?.questionContent} totalRows={obj?.answerCount}/>
        <SelectCountOnTensframe choices={obj?.choices} inputRef={inputRef}/>
    </div>
    </div>
</div>
}