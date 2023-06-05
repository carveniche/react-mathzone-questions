import React, { useContext, useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentPlaceValueTableSelect from "./ContentPlaceValueTableSelect";
import { useRef, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import PlaceValueTableDragDrop from "./PlaceValueTableChoiceType/PlaceValueTableDragDrop/PlaceValueTableDragDrop";
import PlaceValueTableSelectChoice from "./PlaceValueTableChoiceType/PlaceValueTableSelectChoice/PlaceValueTableSelectChoice";
import { ProgressBorder } from "../../../../../Modal2/modal2";
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
const ValidationForDragDrop=(content)=>
{
for(let rows of content)
{
  for(let items of rows)
  {
    if(items.isMissed=="true")
    {
      if(!items.show) return 0
    }
  }
}
for(let rows of content)
{
  for(let items of rows)
  {
    if(items.isMissed=="true")
    {
      if(String(items.dropVal).trim()!=String(items.value).trim()) return 1
    }
  }
}
return 2
}
export default function PlaceValueTableSelect({ state, totalRows,meter }) {
  meter=Number(meter)||0
  let totalEmptyBox = 0;
  state.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  const inputRef = useRef(new Array(totalEmptyBox));
  const hasAnswerSubmitted=true
 
  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state.questionName)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          {state?.choiceType == "keying" ? (
            <ContentPlaceValueTableSelect
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
            />
          ) : state?.choiceType == "dragdrop" ? (
            <PlaceValueTableDragDrop
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
      
            />
          ) :state?.choiceType == "selectchoice" ? (
            <PlaceValueTableSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
      
            />
          ) : (
            <h1>unsupported files types</h1>
          )}
        </div>
      </div>
    </div>
  );
}
