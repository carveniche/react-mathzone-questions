import React from "react";
import styled from "styled-components"
import DragAndDropType from "../ChoicesType/DragAndDropType/DragAndDropType";
import KeyingChoiceType from "../ChoicesType/ChoiceTypeKeying/KeyingChoiceType";
import SelectChoice from "../ChoicesType/SelectChoice/SelectChoice";
import MultiSelect from "../ChoicesType/MultiSelect/MultiSelect";
import HorizontalKeyingChoiceType from "../ChoicesType/ChoiceTypeKeying/HorizontalKeyingChoiceType";

export default function ContentHorizontalFillUps({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType,studentAnswer,questionType,totalCols})
{
   
    return <div>
        {
      choiceType=='dragdrop' &&<DragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} choiceType={choiceType}/>
      
        }
        {
            choiceType=='keying' &&(questionType=="horizontal"?<HorizontalKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalCols={totalCols} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>:<KeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} />)
        
        }
        {
            choiceType=='selectchoice'&&<SelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices} studentAnswer={studentAnswer} choiceType={choiceType} questionType={questionType}/>
        }
          {
            choiceType=='multi select'&&<MultiSelect content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
        }
    </div>
}
export const FlexBox=styled.div`
display:flex;
align-items:center;
gap:10px;

> div{
    display:flex;
    align-items:center;
    justify-content:center;
 
    
    

}

`

{/* <DragAndDropType content={content} choices={choices}/> */}

//keying
