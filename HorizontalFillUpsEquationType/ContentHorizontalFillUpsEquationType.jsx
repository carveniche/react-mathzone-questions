import React from "react";
import styled from "styled-components"
import DragDropHorizontalFillUpsEquationType from "./ChoiceTypeHorizontalFillUpsEquationType/DragDropHorizontalFillUpsEquationType/DragDropHorizontalFillUpsEquationType";
import KeyingHorizontalFillUpsEquationType from "./ChoiceTypeHorizontalFillUpsEquationType/KeyingHorizontalFillUpsEquationType/KeyingHorizontalFillUpsEquationType";
import SelectChoiceHorizontalFillUpsEquationType from "./ChoiceTypeHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType";
export default function ContentHorizontalFillUpsEquationType({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType,totalCols,studentAnswer,equationKeyingRef})
{
    return <div>
        {
      choiceType=='dragdrop' &&<DragDropHorizontalFillUpsEquationType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<KeyingHorizontalFillUpsEquationType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} totalCols={totalCols}
            equationKeyingRef={equationKeyingRef}
            
            />
        
        }
        {
            choiceType=='selectchoice'&&<SelectChoiceHorizontalFillUpsEquationType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}  totalCols={totalCols} studentAnswer={studentAnswer} choiceType={choiceType}/>
           
        }
        
    </div>
}
export const FlexBox=styled.div`
display:flex;

//justify-content:center;
align-items:center;
gap:10px;

> div{
    display:flex;
    align-items:center;
    justify-content:center;
 
    
    

}

`
const Input=styled.input`
height:50px;
text-align:center;  
width:80px;

`

