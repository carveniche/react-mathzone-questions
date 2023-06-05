import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import styles from "../OnlineQuiz.module.css"
import SolveButton from "../SolveButton";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import ContentMatchObjectHorizontal from "./ContentMatchObjectHorizontal";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import oneDto2D from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { deleteKeysFromArray, findSelectedValue, manupulateDataSelectChoice, manupulateEquationTypeQuestion1D, manupulateQuestionContent1Darray, manupulateQuestionContentHorizontal } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { collectDataAtCompileTimeMatchObjectVerticalEqn } from "../EqnMatchObjVert/EqnMatchObjVertCollectData/EqnMatchObjVertCollectData";
import compareLatexData from "../../CommonJSFiles/compareLatexData";

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
const changeStateAfterValidation=(setHasAnswerSubmitted,setIsAnswerCorrect,val,setRedAlert)=>
{
  console.log(val)
  if(val===0)
  {
    setRedAlert(true)
    return
  }
  else if(val===1)
  {
    setIsAnswerCorrect(false)
  }
  else {
    setIsAnswerCorrect(true)
  }
  setHasAnswerSubmitted(true)
}
const validationForKeying = (newData, choices,equationObj) => {

  for (let key in newData) {
    if (newData[key]!==false) {

      if (!choices[key]) {
        return 0
      };
     
    }
  }
  for (let key in newData) {
    if (newData[key]) {
      if (!choices[key]) return 0;
      else if (
        equationObj?.hasOwnProperty(key)
        )
          {
            
            if(!compareLatexData( String(newData[key]).trim()?.toLowerCase() ,
            String(equationObj[key]).trim()?.toLowerCase()))
            return 1
          }
          else if( String(newData[key]).trim()?.toLowerCase() !==
          String(choices[key]).trim()?.toLowerCase()){
            return 1
          }
    }
  }
  return 2;
};
export default function MatchObjectHorizontal({ state, totalRows, totalCols,meter }) {
  meter=Number(meter)||0
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
  const [newData,setNewData]=useState({})
  const {hasAnswerSubmitted,setHasAnswerSubmitted,setIsAnswerCorrect,setChoicesId,setStudentAnswerQuestion,setQuestionWithAnswer,isStudentAnswerResponse}=useContext(ValidationContext)
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);

  const inputRef = useRef(new Array(totalEmptyBox));
  const equationKeyingRef=useRef()
  useEffect(()=>{
   
    let arr=collectDataAtCompileTimeMatchObjectVerticalEqn(state?.questionContent)
    setNewData({...arr})
  },[])
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
  
    if(state?.choiceType=='dragdrop'||state?.choiceType=='selectchoice')
    {
      let status=validationForDragAndDrop(inputRef)
      changeStateAfterValidation(setHasAnswerSubmitted,setIsAnswerCorrect,status,setRedAlert)
    if(state!==0){
      let result=manupulateQuestionContentHorizontal(inputRef?.current)
    state={...state,questionContent:result}
    setQuestionWithAnswer({...state})
    }
    }
    else if(state?.choiceType=='keying')
    {
      
      
    let status=validationForKeying(newData,inputRef.current,equationKeyingRef.current)
    if(status!==0){
      let result=manupulateEquationTypeQuestion1D(state?.questionContent,inputRef?.current,"numvalue")
      result=manupulateQuestionContent1Darray(result)
      result =deleteKeysFromArray(result,{"dropVal":"dropVal"})
      result=oneDto2D(result)
      console.log(result)
      setQuestionWithAnswer({...state,questionContent:result})
    }
changeStateAfterValidation(setHasAnswerSubmitted,setIsAnswerCorrect,status,setRedAlert)
   
    }
    else if(state?.choiceType=='selectchoice'){
    let val= validationForSelectChoice(inputRef,newData)
    console.log(val)
    changeStateAfterValidation(setHasAnswerSubmitted,setIsAnswerCorrect,val,setRedAlert)
  
    }
   
 
  };
  return (
    <div>
       {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} answerHasSelected={hasAnswerSubmitted}/>}
       {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>{parse(state?.questionName,optionSelectStaticMathField)}</div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div className={styles.borderTopBottomMargin}>
          <ConditionOnProgressBar meter={meter} />
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
            equationKeyingRef={equationKeyingRef}
          />

        </div>
      </div>
    </div>
  );
}
