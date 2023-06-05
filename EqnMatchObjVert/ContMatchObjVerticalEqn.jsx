import React from "react";
import styled from "styled-components"
import {useState} from "react"
import ChoiceDNDMatchObjVertEqn from "./ChoiceTypeMatchObjVertiEqn/ChoiceDNDMatchObjVertEqn/ChoiceDNDMatchObjVertEqn";
import ChoiceMSelectMatchObjVertEqn from "./ChoiceTypeMatchObjVertiEqn/ChoiceMSelectMatchObjVertEqn/ChoiceMSelectMatchObjVertEqn";
import ChoiceSelectMatchObjVertEqn from "./ChoiceTypeMatchObjVertiEqn/ChoiceSelectMatchObjVertEqn/ChoiceSelectMatchObjVertEqn";
import ChoiceKeyMatchObjVertEqn from "./ChoiceTypeMatchObjVertiEqn/ChoiceKeyMatchObjVertEqn/ChoiceKeyMatchObjVertEqn";
export default function ContMatchObjVerticalEqn({content,hasAnswerSubmitted,totalEmptyBox,inputRef,choices,totalRows,choiceType,totalCols,equationKeyingRef})
{
   
    return <div>
        {
      (choiceType=='dragdrop'||choiceType=='selectchoice') &&<ChoiceDNDMatchObjVertEqn content={content} choices={choices} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows}/>
      
        }
        {
            choiceType=='keying' &&<ChoiceKeyMatchObjVertEqn content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} totalCols={totalCols} equationKeyingRef={equationKeyingRef}/>
        
        }
        {
            false&&<ChoiceSelectMatchObjVertEqn content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} answerHasSelected={hasAnswerSubmitted} choices={choices}/>
        }
          {
            choiceType=='multi select'&&<ChoiceMSelectMatchObjVertEqn content={content} inputRef={inputRef} totalEmptyBox={totalEmptyBox} totalRows={totalRows} hasAnswerSubmitted={hasAnswerSubmitted} choices={choices}/>
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