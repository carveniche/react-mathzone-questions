import React, { useEffect, useRef } from "react"
import HTMLReactParser from "html-react-parser"
const domManupulate=(id,obj,ref)=>{
   
    
    let inputBox=ref.current.querySelectorAll('input')
    let j=0
    
    for(let item of inputBox)
    {
        if(item?.type==="text")
        {
            item.value=obj?.text[j]
            j++
        }
    }
    j=0
    for(let item of inputBox)
    {
        if(item?.type==="radio")
        {
            
            item.checked=obj?.radio[j]
            j++
        }
    }
    j=0
    for(let item of inputBox)
    {
        if(item?.type==="checkbox")
        {
            item.checked=obj?.checkbox[j]
            j++
        }
    }
    j=0
  //  console.log(obj?.select)
    let selectsBox=ref.current.querySelectorAll('select')
    for(let item of selectsBox)
    {
        
            let options=item?.querySelectorAll('option')
            for(let option of options){
            
          if(obj?.select[j].includes(option?.value))
         {
           
           
             option.selected=true
             break
        }
        
        }
        item.disabled=true
        j++
        
    }
    j=0
}
export default function  CkeditorAnswerRes({obj,value}){
 const ref=useRef()

 
return <form><div ref={ref}>{HTMLReactParser(typeof value?.question_response==="string"?value?.question_response:'')}</div></form>
}