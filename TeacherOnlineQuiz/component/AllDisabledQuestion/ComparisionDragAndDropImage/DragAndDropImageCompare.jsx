import React, { useContext } from "react";
import { useRef, useState,useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ProgressBorder } from "../../../../../Modal2/modal2";



import styles from "../OnlineQuiz.module.css"
import SolveButton from "../SolveButton";
import CompareOfImageKeyingChoiceType from "./ChoicesTypeCompareOfImage/CompareOfImageKeyingChoiceType/CompareOfImageKeyingChoiceType";
import CompareOfImageSelectChoice from "./ChoicesTypeCompareOfImage/CompareOfImageKeyingSelectChoice/CompareOfImageSelectChoice";
import DropBoxesImageCompare from "./DropBoxesImageCompare";
const validationForKeyingChoiceType=(choices)=>{
let arr=choices?.current
let n=arr?.length||0
for(let i=0;i<n;i++)
{
  let temp=arr[i]
  let m=temp?.length||0
  for(let j=0;j<m;j++)
  {
    if(temp[j].isMissed=="true"){
      if(temp[j]?.show===false||temp[j]?.dropValue=="")
      return 0
    }
  }
}
for(let i=0;i<n;i++)
{
  let temp=arr[i]
  let m=temp?.length||0
  for(let j=0;j<m;j++)
  {
    if(temp[j].isMissed=="true"){
      if(String(temp[j]?.dropValue).trim()!==String(temp[j]?.value).trim())
      return 1
    }
  }
}
return 2
}
const validationForSelectChoice=(choices,questionContent)=>{
 let val=null
let n=choices?.length
for(let items of choices)
{
  if(items.show)
  {
    val=items.val
    break
  }
}
if(val===null)
return 0
let arr=questionContent
console.log(val)
for(let rows of arr)
{
  for(let items of rows)
  {
    if(items.isMissed==="true")
    {
      if(String(items.value).trim()===String(val).trim())
      {
        return 2
      }
      else
      return 1
    }
  }
}


  }
const changeAnswerStatus=(val,setIsAnswerCorrect,setHasAnswerSubmitted)=>{
  if(val===0)
  {
    alert("please choose the answer");
    return

}
else if(val===1)
setIsAnswerCorrect(false)
else
setIsAnswerCorrect(true)
setHasAnswerSubmitted(true)


}
export default function DragAndDropImageCompare({ state, totalRows, totalColumns,meter }) { 
  meter=Number(meter)||0
  let rows = [];
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  
  const dropRef = useRef(rows);
  const hasAnswerSubmitted=true
  return (
    <div>
      
      <div>
      <div className={styles?.questionName}>{HtmlParser(state?.questionName)}</div>
      {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
      <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
      <div className={styles.contentParent}>
        {state?.choiceType=="dragdrop"?<DropBoxesImageCompare
          content={state.questionContent}
          totalRows={Number(totalRows)}
          state={state}
          isAnswerSubmitted={!hasAnswerSubmitted}
          dropRef={dropRef}
          totalCols={Number(totalColumns)}
        />:state?.choiceType=="keying"?<CompareOfImageKeyingChoiceType
        content={state.questionContent}
        totalRows={Number(totalRows)}
        state={state}
        isAnswerSubmitted={!hasAnswerSubmitted}
        dropRef={dropRef}
        totalCols={Number(totalColumns)}
      />:state?.choiceType=="selectchoice"?<CompareOfImageSelectChoice
      content={state.questionContent}
      totalRows={Number(totalRows)}
      state={state}
      isAnswerSubmitted={!hasAnswerSubmitted}
      dropRef={dropRef}
      totalCols={Number(totalColumns)}
    />:<h1>unsupported files types</h1>     }
    </div>
    </div>
    </div>
  );
}
