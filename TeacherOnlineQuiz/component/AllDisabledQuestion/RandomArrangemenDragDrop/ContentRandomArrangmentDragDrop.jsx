import React from "react";
import styled from "styled-components"
import {useState} from "react"
import RandomArrangmentChoiceTypeKeying from "./RandomArrangmentChoicesType/RandomArrangmentChoiceTypeKeying/RandomArrangmentChoiceTypeKeying";
import RandomArrangmentDragAndDropType from "./RandomArrangmentChoicesType/RandomArrangmentDragAndDropType/RandomArrangmentDragAndDropType";
import RandomArrangmentMultiSelect from "./RandomArrangmentChoicesType/RandomArrangmentMultiSelect/RandomArrangmentMultiSelect";
import RandomArrangmentSelectChoice from "./RandomArrangmentChoicesType/RandomArrangmentSelectChoice/RandomArrangmentSelectChoice";
export default function ContentRandomArrangmentDragDrop({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType,totalCols})
{
    
    return <div>
        {
      false &&<RandomArrangmentChoiceTypeKeying content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
           true &&<RandomArrangmentDragAndDropType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices} totalCols={totalCols}/>
        
        }
        {
            false&&<RandomArrangmentSelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
        }
          {
            false&&<RandomArrangmentMultiSelect content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
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