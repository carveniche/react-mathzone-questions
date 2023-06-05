import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components"
export default function VerticalKeyingChoiceType({inputRef,content,totalRows,totalEmptyBox,hasAnswerSubmitted}){
const [row,setRow]=useState([])
const [state,setState]=useState([])
const handleChange=(e,rows,cols)=>{
    let str=''+rows+cols
    setState({...state,
        [str]:e.target.value})  
    }
let currentIndex=0
useEffect(()=>{
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
     
        item.row == i && temp.push(item);
      });
      arr.push(temp);
    }
    setRow([...arr])
},[])


    return row?.map((items,index)=><FlexBox key={index}>
    {items?.map((item,i)=>item.isMissed==="false"?<div key={i}>{typeof item.value==="string"?HtmlParser(item?.value):item?.value}</div>:<div value={item.value} key={i}  ref={el=>{
        inputRef.current[currentIndex]=el
        if(currentIndex<totalEmptyBox-1)
        currentIndex=currentIndex+1
    }}>
            <Input value={state[`${index}${i}`]?state[`${index}${i}`]:''} onChange={(e)=>{handleChange(e,index,i)}} disabled={hasAnswerSubmitted}/>
            </div>)}
        </FlexBox>)
}

export const FlexBox=styled.div`
display:flex;

//justify-content:center;
align-items:center;
gap:10px;
margin-bottom:1rem;

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