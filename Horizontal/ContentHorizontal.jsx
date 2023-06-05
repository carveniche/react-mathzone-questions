import React from "react";
import styled from "styled-components"
import {useState} from "react"
export default function ContentHorizontal({content,inputRef,totalEmptyBox,hasAnswerSubmitted})
{
    const [state,setState]=useState({})
    const handleChange=(e,rows,cols)=>{
        let str=''+rows+cols
        setState({...state,
            [str]:e.target.value})
            
        }
        let currentIndex=0
return <div>
    
    <div>
        {content?.map((items,index)=><FlexBox key={index}>
{
    items?.map((item,i)=>item.isMissed==="false"?<div key={i}>{item.value}</div>:<div value={item.value} key={i}
    ref={el=>{
        inputRef.current[currentIndex]=el
        if(currentIndex<totalEmptyBox-1)
        currentIndex=currentIndex+1
    }}
    >
<Input value={state[`${index}${i}`]?state[`${index}${i}`]:''} onChange={(e)=>{handleChange(e,index,i)}} disabled={hasAnswerSubmitted}/>
    </div>)
}
        </FlexBox>)}
    </div>
</div>
}


const FlexBox=styled.div`
display:flex;

//justify-content:center;
align-items:center;
> div{
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:50px;
    min-width:auto;
}

`
const Input=styled.input`
width:40px;
height:40px;
text-align:center;  
`