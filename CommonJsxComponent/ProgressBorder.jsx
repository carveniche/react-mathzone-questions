
import { useContext } from "react"
import styled from "styled-components"


export const Modal2=styled.div`
position:relative;


padding-bottom:1rem;
min-height:200px;
height:auto;
max-height:calc(100% - 136px);;
overflow:auto;
width:100%;
background-color: white;
border:2px solid black;
border-top:0;
`

export const ProgressBorde2=styled.div`
height:4px;
width:100%;
background-color: #EAEAEA;
margin-top:1rem;
margin-bottom:1rem;
border-radius: 100px;
> div{
height:4px;
background-color: #86C440;
border-radius: 100px ;
width:${props=>props.meter?(props.meter-1)*(100/props?.total||1):0}%;
  }
`

export default function ProgressBorder({children,meter}){
  
return <>
{
<></>
}
</>
}