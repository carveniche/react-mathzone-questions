import React from "react";
import styled from "styled-components"
import LongDivisionDragAndDropType from "./DragDropLongDivision";
import LongDivisionKeyingChoiceType from "./KeyingLongDivision";
import LongDivsionSelectChoice from "./SelectChoiceLongDivision";



export default function ContentLongDivsion({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType})
{
   
    return <div>
        {
      (choiceType=='dragdrop') &&<LongDivisionDragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<LongDivisionKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>
        
        }
        {
            choiceType=='selectchoice'&&<LongDivsionSelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
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
