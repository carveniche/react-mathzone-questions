import React, { useContext } from "react";

import { useEffect, useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import parse from "html-react-parser";
import ContentMatchObjectHorizontal from "./ContentMatchObjectHorizontal";
import { ProgressBorder } from "../../../../../Modal2/modal2";


const validationForSelectChoice=(inputRef,content)=>{
let arr=inputRef?.current
let n=arr?.length||0

let val=null
for(let i=0;i<n;i++)
{
  if(arr[i].show)
  {
    val=arr[i].value
    break;
  }
}
if(val===null)
return 0
n=content?.length||0
for(let i=0;i<n;i++)
{
  if(content[i]?.isMissed=="true")
  {
if(content[i]?.numvalue!=val)
{
return 1
}
  }
}
return 2
}
const validationForDragAndDrop=(inputRef)=>
{
  let n=inputRef?.current?.length||0
  let arr=inputRef.current
  for(let i=0;i<n;i++)
  {
let m=arr[i]?.length||0
for(let j=0;j<m;j++)
{
  if(arr[i][j].isMissed=="true")
  {
    if(!arr[i][j].show)
    return 0//not selected
  }
}
  }
  for(let i=0;i<n;i++)
  {
let m=arr[i]?.length||0
for(let j=0;j<m;j++)
{
  if(arr[i][j].isMissed=="true")
    if(arr[i][j].numvalue!=arr[i][j].dropVal)
    return 1//not selected}
  
}
  }
 return 2
}
const validationForMultiSelect=(choices)=>{

 
  let n=choices?.length||0
  let flag=true
  for(let i=0;i<n;i++)
  {
    if(choices[i].show){
      flag=false
      break
    }
  }
  if(flag)
  {
    return 0
  }
  for(let i=0;i<n;i++)
  {
    if(choices[i].show!=choices[i].correct){
    return 1}
  }
  return 2
}
const validationForKeying=(inputRef)=>{
  console.log(inputRef)
  let arr=inputRef?.current
  let n=arr?.length||0
  for(let i=0;i<n;i++)
  {
    let m=arr[i]?.length||0
    for(let j=0;j<m;j++)
    {
      if(arr[i][j].isMissed==="true")
      if(!arr[i][j].show||arr[i][j].dropVal==""||arr[i][j].dropVal==undefined)
      return 0
    }
  }
  for(let i=0;i<n;i++)
  {
    let m=arr[i]?.length||0
    for(let j=0;j<m;j++)
    {
      if(arr[i][j].isMissed==="true")
      if(String(arr[i][j]?.dropVal).trim()!=String(arr[i][j]?.numvalue).trim())
      return 1
    }
  }
  return 2
}
export default function MatchObjectHorizontal({ state, totalRows, totalCols,meter }) {
  meter=Number(meter)||0
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  //let [rows, setRows] = useState([]);
  const hasAnswerSubmitted=true
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);

  const inputRef = useRef(new Array(totalEmptyBox));
  useEffect(() => {
    let totalEmptyBox = 0;

    state?.questionContent?.map(
      (item) => item.isMissed === "true" && totalEmptyBox++
    );
    setTotalEmptyBox(totalEmptyBox);
    //setRows(rows);
  }, []);
 

  return (
    <div>
       
      <div>
        <div className={styles.questionName}>{parse(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div className={styles.borderTopBottomMargin}>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent} >
          
          <ContentMatchObjectHorizontal
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            hasAnswerSubmitted={hasAnswerSubmitted}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
          />

        </div>
      </div>
    </div>
  );
}
