import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";

export default function CompareOfImageKeyingChoiceType({content,totalRows,dropRef,totalCols})
{
    let [rows,setRows]=useState([])
useEffect(()=>{
let row=[]
for(let i=0;i<totalRows;i++)
{
    let temp=[]
    content.map(items=>items.map((item)=>String(item.row)==String(i)&&temp.push({...item,show:false,dropValue:''})))
    row.push(temp)
}
 setRows([...row])

},[])
const hasAnswerSubmitted=true
dropRef.current=[...rows]
const handleChange=(e,row,col)=>{
    if(hasAnswerSubmitted)
    return
rows[row][col].dropValue=e.target.value
if(rows[row][col].dropValue=="")
rows[row][col].show=false
else
rows[row][col].show=true
setRows([...rows])
}

return <div>
   <div>
       {/* Droppable Part */}
   {
        rows?.map((items,i)=><FlexBox2 key={i} totalRows={totalCols}>
            {items?.map((item,index)=>
                item.isMissed=="false"?<div>
                    {HtmlParser(item.value)}
                </div>:<div>
                    <Input value={items.dropValue} onChange={(e)=>handleChange(e,i,index)} disabled={hasAnswerSubmitted}/>
                </div>
            )}
        </FlexBox2>)
    }

    {/* Draggable Part */}
   
   </div>
</div>
}
const FlexBox2=styled.div`
display:flex;
flex-direction:row;

margin:2rem 0.2rem;
gap:4rem;
//justify-content:center;
    align-items:center;
> div{
    width:Calc((100% - ${props=>props.totalRow}*2rem) / ${props=>props.totalRows});
    display:flex;
    flex-wrap:wrap;
    
    justify-content:center;
}

`
const Input=styled.input`
height:50px; 
width:100px;
word-break: break-all;
text-align:center;
`