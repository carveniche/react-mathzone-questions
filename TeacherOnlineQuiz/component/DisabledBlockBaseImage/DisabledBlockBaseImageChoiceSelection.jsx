import React from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../../../OnlineQuiz.module.css";
import styled from "styled-components";
export default function DisabledBlockBaseImageChoiceSelection({choices}){
    return <FlexBox >
{choices?.map((value,i)=><div  key={i}>
    <div>{String.fromCharCode(65+i)}</div>
    <div key={i} >{HtmlParser(value)}</div>
</div >)}
    </FlexBox >
}
const FlexBox=styled.div`
display:flex;
flex-wrap:wrap;
gap:0.4rem;
width:90%;
margin-Top: 0.1rem;
cursor: pointer;
> div{
    min-width:Calc(50% - 0.4rem);
    max-width:Calc(50% - 0.4rem);
    
    flex:1;
    display:flex;
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
align-items: center;
padding-left:18px;
color: #233584;
border-radius: 12px;
word-break:break;
min-height: auto;
height: 60px;

gap: 2rem;

border: 1px solid black;

height:auto;

padding:1rem;

 
}
> div > div{
    min-width:auto;
    min-height:auto;
    
    
  
}
> div > div:nth-child(2)
{
    flex: 1;
    display:flex;
  
    flex-wrap:wrap;
    word-break:break;
   

}
`


