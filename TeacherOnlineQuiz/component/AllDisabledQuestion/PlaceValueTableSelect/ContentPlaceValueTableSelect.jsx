import React from "react"
import styled from "styled-components";
import {useState} from "react"
import HtmlParser from "react-html-parser";
export default function ContentPlaceValueTableSelect({content,inputRef,totalEmptyBox,hasAnswerSubmitted,questionHead,totalCols}){
   
    const [state,setState]=useState({})
    const handleChange=(e,rows,cols)=>{
       
        let str=''+rows+cols
        setState({...state,
            [str]:e.target.value})
            
        }
        let currentIndex=0
    
return <Grid>
    <FlexBox totalCols={totalCols} backgroundColor={"orange"}>
    {questionHead?.map((item,i)=><div key={i}>{HtmlParser(typeof item?.value==="string"?item?.value:'')}</div>)}
    </FlexBox>
    {
content?.map((items,index)=><FlexBox key={index} totalCols={totalCols}>
    {items.map((item,i)=>item?.isMissed!=='true'?<div key={i}>{HtmlParser(typeof item?.value==="string"?item.value:'')}</div>: <div key={i} ref={el=>{
        inputRef.current[currentIndex]=el
        if(currentIndex<totalEmptyBox-1)
        currentIndex=currentIndex+1
    }} value={item.value}><input type="text" value={state[`${index}${i}`]?state[`${index}${i}`]:''} onChange={(e)=>{handleChange(e,index,i)}} disabled={hasAnswerSubmitted}/></div>)}
</FlexBox>)
    }
</Grid>
}

export const FlexBox=styled.div`
display:flex;

//justify-content:center;
align-items:center;
background:${({backgroundColor})=>backgroundColor??"unset"};
color:${({backgroundColor})=>backgroundColor?"white":"unset"};

> div{
  
    display:flex;
    padding:0.2rem;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:0.7rem;
    flex:1;
    border:1px solid orange;
  min-height:60px;
    width:Calc(100% / ${props=>props.totalCols});
    height:100%;
    word-break: break-word;
    
}
* input{
    min-width:60px;
    width:60px;
    min-height:45px;
    word-break: break-word;
    text-align: center;
}

`
export const Grid=styled.div`
display:grid;
max-width:850px;
`