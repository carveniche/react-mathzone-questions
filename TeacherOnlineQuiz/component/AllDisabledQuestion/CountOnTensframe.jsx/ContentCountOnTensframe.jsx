import React, { useEffect, useState } from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
export default function ContentCountOnTensframe({content,totalRows}){
let [state,setState]=useState([])
useEffect(()=>{
    totalRows=Number(totalRows)||0
let arr=[]
for(let i=0;i<totalRows;i++)
{
    arr.push(content)
}
setState([...arr])
},[])
return <FlexBox>
    {state?.map((item)=><div>{HtmlParser(item)}</div>)}
    </FlexBox>
}

const FlexBox=styled.div`
display:flex;
flex-wrap:wrap;
border-collapse: collapse;
> div{
    width:auto;
    height:auto;
    border:1px solid black;
    padding:1rem;
}
`