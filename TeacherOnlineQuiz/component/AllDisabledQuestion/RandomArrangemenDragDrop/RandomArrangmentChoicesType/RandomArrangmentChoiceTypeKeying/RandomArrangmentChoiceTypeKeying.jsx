import React, { useContext, useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components"
export default function RandomArrangmentChoiceTypeKeying({inputRef,content,totalRows,totalEmptyBox,}){
const [row,setRow]=useState([])
const hasAnswerSubmitted=true
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
        let imageArray=[]
        let count=Number(item?.count)||0
        for(let i=0;i<count;i++)
        {
          imageArray?.push(item?.img)
        }
        let obj = { ...item, show: false, dropVal: "",imageArray:[...imageArray] };
        item.row == i && temp.push(obj);
      });
      arr.push(temp);
    }
    setRow([...arr])
},[])
inputRef.current=row

    return row?.map((items,index)=><FlexBox key={index}>
    {items?.map((item,i)=>item.isMissed==="false"?  <FlexBox3 >
    <ImageBox>{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
                <div><b>{typeof item?.count=="string"?HtmlParser(item?.count):item?.count}</b></div>
             </FlexBox3>: <FlexBox3>
                <ImageBox >{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
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
width:70%;
gap:4rem;
@media (max-width: 1000px) {
  width:90%;
}
> div{
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;



}
 
`;
const Input=styled.input`
height:50px;
text-align:center;  
width:180px;

`

const FlexBox3=styled.div`
width:auto;

margin:1rem 0;
display:flex;
gap:2rem;
flex-direction:column;
justify-content:space-between;
> div{
 
 width:auto;
 justify-content:center;
}
> div{
  display:flex;
  

  
}
`
const ImageBox=styled.div`
display:flex;
gap:1rem;
flex-wrap:wrap;

`