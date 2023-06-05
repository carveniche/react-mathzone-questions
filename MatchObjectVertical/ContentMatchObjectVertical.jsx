import React from "react";
import styled from "styled-components"
import {useState} from "react"
import VerticalDragAndDropType from "./VerticalChoicesType/VerticalDragAndDropType/VerticalDragAndDropType";
import VerticalKeyingChoiceType from "./VerticalChoicesType/VerticalChoiceTypeKeying/VerticalKeyingChoiceType";
import VerticalMultiSelect from "./VerticalChoicesType/VerticalMultiSelect/VerticalMultiSelect";
import VerticalSelectChoice from "./VerticalChoicesType/VerticalSelectChoice/VerticalSelectChoice";



export default function ContentMatchObjectVertical({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType})
{
   
    return <div>
        {
      (choiceType=='dragdrop'||choiceType=='selectchoice') &&<VerticalDragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<VerticalKeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>
        
        }
        {
           false&&<VerticalSelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
        }
          {
            choiceType=='multi select'&&<VerticalMultiSelect content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
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
