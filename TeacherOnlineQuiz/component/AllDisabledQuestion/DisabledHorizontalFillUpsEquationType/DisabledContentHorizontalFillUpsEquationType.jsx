import React from "react";
import styled from "styled-components"
import DisabledDragDropHorizontalFillUpsEquationType from "./DisabledChoiceTypeHorizontalFillUpsEquationType/DragDropHorizontalFillUpsEquationType/DisabledDragDropHorizontalFillUpsEquationType";
import DisabledKeyingHorizontalFillUpsEquationType from "./DisabledChoiceTypeHorizontalFillUpsEquationType/KeyingHorizontalFillUpsEquationType/DisabledKeyingHorizontalFillUpsEquationType";
import DisabledSelectChoiceHorizontalFillUpsEquationType from "./DisabledChoiceTypeHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType/DisabledContentHorizontalFillUpsEquationType";

export default function DisabledContentHorizontalFillUpsEquationType({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType,totalCols})
{
    return <div>
        {
      choiceType=='dragdrop' &&<DisabledDragDropHorizontalFillUpsEquationType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<DisabledKeyingHorizontalFillUpsEquationType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} totalCols={totalCols}/>
        
        }
        {
            choiceType=='selectchoice'&&<DisabledSelectChoiceHorizontalFillUpsEquationType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}  totalCols={totalCols}/>
           
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

