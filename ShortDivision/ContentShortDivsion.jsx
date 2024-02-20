import React from "react";
import styled from "styled-components"
// import LongDivisionDragAndDropType from "./DragDropLongDivision";
// import LongDivisionKeyingChoiceType from "./KeyingLongDivision";
// import LongDivsionSelectChoice from "./SelectChoiceLongDivision";
import ShortDivisionKeyingChoiceType from "./KeyingShortDivision";
import ShortDivisionDragAndDropType from "./DragDropShortDivision";



export default function ContentShortDivsion({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType})
{
   
    return <div>
        {
      (choiceType=='dragdrop') &&<ShortDivisionDragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<ShortDivisionKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>
        
        }
        {
            choiceType=='selectchoice'&&<ShortDivisionKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
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
