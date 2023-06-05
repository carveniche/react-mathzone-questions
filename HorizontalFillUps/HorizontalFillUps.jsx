import React, { useContext } from "react";
import ContentHorizontalFillUps from "./ContentHorizontalFillUps";
import { useEffect, useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css"
import SolveButton from "../SolveButton";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import acceptedConditionForAdd_Mul from "../../CommonJSFiles/acceptedConditionForAdd_Mul";
import oneDInsertValueSelectChoice from "../../CommonJSFiles/ManupulateJsonData/oneDInsertValueSelectChoice";
import { findSelectedValue, manupulateQuestionContent, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import oneDto2D, { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
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
if(CompareTwoValue(content[i]?.value,val))
{
return 2
}
else{
  return 1
}
  }
}
return 2
}
export const validationForDragAndDrop=(inputRef,questionType)=>
{
  
  let n=inputRef?.current?.length||0
  let arr=inputRef.current
  
if(questionType==="horizontal")
{
  let checkingValue=acceptedConditionForAdd_Mul(arr[0])
  
  if(checkingValue!==undefined)
  return checkingValue
}

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
    if(!CompareTwoValue(arr[i][j]?.value,arr[i][j]?.dropVal))
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
export default function HorizontalFillUps({ state, totalRows, totalCols,meter,questionType }) {
  
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  meter=Number(meter)||0
  //let [rows, setRows] = useState([]);
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion, setQuestionWithAnswer,isStudentAnswerResponse}=useContext(ValidationContext)
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
  const [redAlert,setRedAlert]=useState(false)
  const handleSubmitAnswer = () => {

    if (hasAnswerSubmitted) return;
  
    if(state?.choiceType=='dragdrop'||state?.choiceType=='keying')
    {
      let status=validationForDragAndDrop(inputRef,questionType)
      if(status===0)
      {
        setRedAlert(true)
        return
      }
      else if(status===1)
      setIsAnswerCorrect(false)
      else{
      setIsAnswerCorrect(true)}
      
      if(questionType!=="horizontal"&&questionType!=="horizontalPicture"){
   
     let result= manupulateQuestionContent(inputRef?.current)
     state={...state,questionContent:result}
     setQuestionWithAnswer({...state})
    }
     else{
      let result= manupulateQuestionContentHorizontal(inputRef?.current)
     state={...state,questionContent:result}
     
     setQuestionWithAnswer({...state})
     }

    }
  
    else if(state?.choiceType=='selectchoice'){
    let val= validationForSelectChoice(inputRef,state?.questionContent)
    if(val===0)
    {
      setRedAlert(true)
      return
    }
    else if(val===1)
    {
      setIsAnswerCorrect(false)
    }
    else{
      setIsAnswerCorrect(true)
    }
    let value=findSelectedValue(inputRef?.current,"value")
    let result=[...state?.questionContent]
    
    if(questionType==="horizontal"||questionType==="horizontalPicture")
    {
      result=oneDto2D(result)
    }
    console.log(result)
    setQuestionWithAnswer({...state,questionContent:result,[student_answer]:value})
    }
    else if(state?.choiceType=='multi select'){
      let val= validationForMultiSelect(inputRef?.current)
      if(val===0)
      {
        setRedAlert(true)
        return
      }
      else if(val===1)
      {
        setIsAnswerCorrect(false)
      }
      else{
        setIsAnswerCorrect(true)
      }
      
    }
    let jsonData=serializeResponse("studentAnswerResponse")
    setStudentAnswerQuestion(jsonData)
     setHasAnswerSubmitted(true);
    
  };

  return (
    <div>
       {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} answerHasSelected={hasAnswerSubmitted}/>}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>{parse(state?.questionName)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div className={styles.borderTopBottomMargin}>
        <ConditionOnProgressBar meter={meter}/>
        </div>
        <div className={styles.contentParent} >
          
          <ContentHorizontalFillUps
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            hasAnswerSubmitted={hasAnswerSubmitted}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
            studentAnswer={state[student_answer]}
            questionType={state?.type}
          />

        </div>
      </div>
    </div>
  );
}