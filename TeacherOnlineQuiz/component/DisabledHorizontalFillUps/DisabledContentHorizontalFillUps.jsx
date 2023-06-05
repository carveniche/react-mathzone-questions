import React from "react";
import styled from "styled-components"
import {useState} from "react"
export default function DisabledContentHorizontalFillUps({content,hasAnswerSubmitted,totalEmptyBox,inputRef})
{
   
    const [state,setState]=useState([])
   
    return <div>
        {
        content?.map((items,index)=><FlexBox key={index}>
            {items?.map((item,i)=>item.isMissed==="false"?<div key={i}>{item.value}</div>:<div value={item.value} key={i}  >
            <Input value={state[`${index}${i}`]?state[`${index}${i}`]:''}  disabled={true}/>
            </div>)}
        </FlexBox>)
        }
    </div>
}
const FlexBox=styled.div`
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