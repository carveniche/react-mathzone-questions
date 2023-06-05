import React from "react";
import styled from "styled-components"
import {useState} from "react"
import HorizontalDragAndDropType from "./HorizontalChoicesType/HorizontalDragAndDropType/HorizontalDragAndDropType";
import HorizontalKeyingChoiceType from "./HorizontalChoicesType/HorizontalChoiceTypeKeying/HorizontalKeyingChoiceType";
import HorizontalSelectChoice from "./HorizontalChoicesType/HorizontalSelectChoice/HorizontalSelectChoice";
import HorizontalMultiSelect from "./HorizontalChoicesType/HorizontalMultiSelect/HorizontalMultiSelect";



export default function ContentMatchObjectHorizontal({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType})
{
   
    return <div>
        {
      (choiceType=='dragdrop'||choiceType=='selectchoice') &&<HorizontalDragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<HorizontalKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>
        
        }
        {
            false&&<HorizontalSelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
        }
          {
            choiceType=='multi select'&&<HorizontalMultiSelect content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
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
