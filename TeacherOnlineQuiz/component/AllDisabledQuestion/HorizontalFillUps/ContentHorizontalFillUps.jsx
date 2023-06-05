import React from "react";
import styled from "styled-components"
import {useState} from "react"
import DragAndDropType from "../ChoicesType/DragAndDropType/DragAndDropType";
import KeyingChoiceType from "../ChoicesType/ChoiceTypeKeying/KeyingChoiceType";
import SelectChoice from "../ChoicesType/SelectChoice/SelectChoice";
import MultiSelect from "../ChoicesType/MultiSelect/MultiSelect";

export default function ContentHorizontalFillUps({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType})
{
   
    return <div>
        {
      choiceType=='dragdrop' &&<DragAndDropType content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<KeyingChoiceType content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted}/>
        
        }
        {
            choiceType=='selectchoice'&&<SelectChoice content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
        }
          {
            choiceType=='multi select'&&<MultiSelect content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
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
{/* <DragAndDropType content={content} choices={choices}/> */}

//keying
