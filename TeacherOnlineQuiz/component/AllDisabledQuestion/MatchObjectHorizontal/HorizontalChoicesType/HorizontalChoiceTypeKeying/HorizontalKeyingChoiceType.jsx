import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components"
export default function HorizontalKeyingChoiceType({inputRef,content,totalRows,totalEmptyBox,hasAnswerSubmitted}){
const [row,setRow]=useState([])
const handleChange=(e,rows,cols)=>{
    row[rows][cols].dropVal=e.target.value
    if(row[rows][cols].dropVal=="")
    {
        row[rows][cols].show=false
    }
    else
    row[rows][cols].show=true
    setRow([...row])
    }

useEffect(()=>{
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
     
        item.row == i && temp.push({...item,show:false,dropVal:""});
      });
      arr.push(temp);
    }
    setRow([...arr])
},[])
inputRef.current=row

    return row?.map((items,index)=><FlexBox key={index}>
    {items?.map((item,i)=>item.isMissed==="false"?  <FlexBox3  length={items?.length}>
    <div>{HtmlParser(item?.imgvalue)}</div>
                <div ><b>{typeof item?.numvalue=="string"?HtmlParser(item?.numvalue):item?.numvalue}</b></div>
             </FlexBox3>: <FlexBox3 length={items?.length}>
                <div>{HtmlParser(item.imgvalue)}</div>
               <div>
               <div >
                { (
                 <Input value={row[index][i]?.dropVal} onChange={(e)=>{handleChange(e,index,i)}} disabled={hasAnswerSubmitted}/>
                
                )}
              </div>
               </div>
              
              </FlexBox3>)}
        </FlexBox>)
}

export const FlexBox = styled.div`
  display: flex;
gap:2rem;
flex-wrap:wrap;
 
`;
const Input=styled.input`
height:50px;
text-align:center;  
width:90px;

`
const FlexBox3=styled.div`
width:calc((100% - ${({length})=>(length-1)*2}rem) / ${({length})=>length});
margin:1rem 0;
display:flex;
gap:2rem;

flex-direction:column;
> div{
 

 justify-content:center;
 flex-wrap:wrap;
}
> div{
  display:flex;
  

  
}
`