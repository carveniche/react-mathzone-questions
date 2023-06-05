import React, { useContext } from "react";
import { useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import DropBoxes from "./DropBoxes";
import styles from "../OnlineQuiz.module.css";

import CompareDragOperatorKeyingChoiceType from "./CompareDragOperatorChoiceType/CompareDragOperatorKeyingChoiceType/CompareDragOperatorKeyingChoiceType";
import CompareDragOperatorSelectChoice from "./CompareDragOperatorChoiceType/CompareDragOperatorSelectChoice/CompareDragOperatorSelectChoice";
import { ProgressBorder } from "../../../../../Modal2/modal2";

const validationForKeyingChoiceType = (choices) => {
  let arr = choices?.current;
  let n = arr?.length || 0;
  for (let i = 0; i < n; i++) {
    let temp = arr[i];
    let m = temp?.length || 0;
    for (let j = 0; j < m; j++) {
      if (temp[j].isMissed == "true") {
        if (temp[j]?.show === false || temp[j]?.dropValue == "") return 0;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    let temp = arr[i];
    let m = temp?.length || 0;
    for (let j = 0; j < m; j++) {
      if (temp[j].isMissed == "true") {
        if (String(temp[j]?.dropValue).trim() !== String(temp[j]?.value).trim())
          return 1;
      }
    }
  }
  return 2;
};
const validationForSelectChoice = (choices) => {

  for (let items of choices) {
    if (items.show) {
      if(String(items.show)!==items.selected)
      return 1
      else return 2
    }
  }
  return 0
};
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
export default function DragAndDrop({ state, totalRows, totalColumns,meter }) {
  meter=Number(meter)||0
  let rows = [];
  const  hasAnswerSubmitted = true 
  for (let i = 0; i < Number(totalRows); i++) {
    let temp = new Array(Number(state.cols));
    rows.push(temp);
  }
  const dropRef = useRef(rows);
  
  return (
    <div>
    
      <div>
        <div className={styles?.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          {(state?.choiceType == "dragdrop"||1) ? (
            <DropBoxes
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) : state?.choiceType == "keying" ? (
            <CompareDragOperatorKeyingChoiceType
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) : state?.choiceType == "selectchoice" ? (
            <CompareDragOperatorSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              state={state}
              isAnswerSubmitted={!hasAnswerSubmitted}
              dropRef={dropRef}
              totalCols={Number(totalColumns)}
            />
          ) :(
            <h1>Unsupported file types ...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
