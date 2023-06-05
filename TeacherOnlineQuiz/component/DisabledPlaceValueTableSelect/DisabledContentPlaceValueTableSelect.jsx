import React from "react"
import styled from "styled-components";
export default function DisabledContentPlaceValueTableSelect({content,questionHead,totalCols}){ 
return <Grid>
    <FlexBox totalCols={totalCols}>
    {questionHead?.map((item,i)=><div key={i}>{item.value}</div>)}
    </FlexBox>
    {
content?.map((items,index)=><FlexBox key={index} totalCols={totalCols}>
    {items.map((item,i)=>item?.isMissed==='false'?<div key={i}>{item.value}</div>: <div key={i} value={item.value}><input type="text" value=''  disabled/></div>)}
</FlexBox>)
    }
</Grid>
}

const FlexBox=styled.div`
display:flex;

//justify-content:center;
align-items:center;

> div{
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid black;
  min-height:60px;
    width:Calc(100% / ${props=>props.totalCols});
    height:auto;
    word-break: break-word;
    
}
* input{
    min-width:80px;
    width:auto;
    min-height:45px;
    word-break: break-word;
    text-align: center;
}

`
const Grid=styled.div`
display:grid;
`