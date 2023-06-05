import React, { useContext } from "react";

import { useEffect, useState, useRef } from "react";
import styles from "./HorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";
import ContentHorizontalFillUpsEquationType from "./ContentHorizontalFillUpsEquationType";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "./replaceDomeNode/ReplaceDomNode";
import {
  collectDataAtCompileTime,
  oldAndNewData,
} from "./CollectAnswerDataHorizontalFillUpsEquation/CollectAnswerDataHorizontalFillUpsEquation";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { deleteKeysFromArray, findSelectedValue, manupulateEquationTypeQuestion1D, manupulateQuestionContent1Darray, manupulateQuestionContentDnd2d, twoDto1DArray } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import  { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import compareLatexData from "../../CommonJSFiles/compareLatexData";

const validationForSelectChoice = (inputRef, content) => {
  let arr = inputRef;
  let n = arr?.length || 0;

  let val = null;
  for (let i = 0; i < n; i++) {
    if (arr[i].show) {
      val = arr[i].value;
      break;
    }
  }

  if (val === null) return 0;
  val = oldAndNewData(val);
  n = content?.length || 0;

  for (let key in content) {
    if (content[key] !== false) {
      if (String(content[key]).trim() === String(val).trim()) return 2;
      else return 1;
    }
  }
  return 2;
};
const validationForDragAndDrop = (inputRef) => {
  let n = inputRef?.current?.length || 0;
  let arr = inputRef.current;

  for (let row of arr) {
    for (let col of row) {
      if (col.isMissed === "true") {
        if (!col.show) return 0; //not selected
      }
    }
  }
  for (let row of arr) {
    for (let col of row) {
      if (col.isMissed === "true") {
        if (!col.show) return 0; //not selected
        let val = col?.value;
        let dropVal = col?.dropVal;
        val = oldAndNewData(val);
        dropVal = oldAndNewData(dropVal);
        if (String(val).trim() !== String(dropVal).trim()) return 1;
      }
    }
  }
  return 2;
};

const validationForKeying = (newData, choices,equationObj) => {
  for (let key in newData) {
    if (newData[key]) {
      if (!choices[key]) return 0;
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

const changeStateAfterValidation = (
  setHasAnswerSubmitted,
  setIsAnswerCorrect,
  val,setRedAlert
) => {
  if (val === 0) {
    setRedAlert(true);
    return;
  } else if (val === 1) {
    setIsAnswerCorrect(false);
  } else setIsAnswerCorrect(true);
  setHasAnswerSubmitted(true);
};

export default function HorizontalFillUpsEquationType({
  state,
  totalRows,
  totalCols,
  meter,
}) {
  const [redAlert, setRedAlert] = useState(false);
  const [newData, setNewData] = useState({});
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);
const equationKeyingRef=useRef()
  meter = Number(meter) || 0;
  //let [rows, setRows] = useState([]);
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
  const { hasAnswerSubmitted, setHasAnswerSubmitted, setIsAnswerCorrect,setQuestionWithAnswer,isStudentAnswerResponse } =
    useContext(ValidationContext);
  const handleSubmitAnswer = () => {
    // if (hasAnswerSubmitted) return;

    if (state?.choiceType == "dragdrop") {
      let status = validationForDragAndDrop(inputRef);
      changeStateAfterValidation(
        setHasAnswerSubmitted,
        setIsAnswerCorrect,
        status,setRedAlert
      );
      if(state!==0){
        let result =manupulateQuestionContentDnd2d(inputRef.current,"value")
        result=twoDto1DArray(result)
        result=deleteKeysFromArray(result,{"dropVal":"dropVal"})
        setQuestionWithAnswer({...state,questionContent:result})
      
      }
    } else if (state?.choiceType == "keying") {
      let status = validationForKeying(newData, inputRef.current,equationKeyingRef.current);
  
      changeStateAfterValidation(
        setHasAnswerSubmitted,
        setIsAnswerCorrect,
        status,setRedAlert
      );
     if(status!=0){
      let result=manupulateEquationTypeQuestion1D(state?.questionContent,inputRef?.current,"value")
      result=manupulateQuestionContent1Darray(result)
      console.log(result)
      setQuestionWithAnswer({...state,questionContent:result})
     }
    } else if (state?.choiceType == "selectchoice") {
      let val = validationForSelectChoice(inputRef.current, newData);
      changeStateAfterValidation(
        setHasAnswerSubmitted,
        setIsAnswerCorrect,
        val,setRedAlert
      );
      if(val!==0){
        let value=findSelectedValue(inputRef.current,"value")
        setQuestionWithAnswer({...state,[student_answer]:value})
      }
    }
  };
  useEffect(() => {
    let arr = collectDataAtCompileTime(state?.questionContent);

    setNewData({ ...arr });
  }, []);
  return (
    <div className={styles.MainApp}>
      {!isStudentAnswerResponse&&<SolveButton onClick={handleSubmitAnswer} />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {parse(state?.questionName, optionSelectStaticMathField)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent}>
          <ContentHorizontalFillUpsEquationType
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            hasAnswerSubmitted={false}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
            studentAnswer={state[student_answer]}
            equationKeyingRef={equationKeyingRef}
            
          />
        </div>
      </div>
    </div>
  );
}
