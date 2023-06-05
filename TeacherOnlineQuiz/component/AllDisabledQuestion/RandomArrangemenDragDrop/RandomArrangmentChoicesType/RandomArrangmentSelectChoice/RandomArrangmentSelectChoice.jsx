import React, { useEffect } from "react"
import {useState,useRef} from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components"
import styles from "../../../OnlineQuiz.module.css";
export default function RandomArrangmentSelectChoice({choices,inputRef,answerHasSelected,content,totalRows}){
    const [row,setRow]=useState([])
    let [choicesState,setChoicesState]=useState([])
    let prev=useRef(0)
    useEffect(()=>{
        let arr2=[]
        choices?.map((item)=>{
            let obj={value:item,show:false}
            arr2.push({...obj})
        })
       
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
        setChoicesState([...arr2])
    },[])
    const handleChoiceSelection=(i)=>{
        if(answerHasSelected)
        return
        choicesState[prev.current].show=false
        choicesState[i].show=true
        setChoicesState([...choicesState])
        prev.current=i
    }
    inputRef.current=choicesState
    return <>
   {row?.map((items,index)=><FlexBox key={index}>
    {items?.map((item,i)=>item.isMissed==="false"?  <FlexBox3 >
    <ImageBox>{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
                <div style={{background:'indigo',color:'white',height:'50px',minWidth:'50px',padding:'1rem',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center'}}><b>{item?.count}</b></div>
             </FlexBox3>: <FlexBox3>
                <ImageBox >{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
               <div>
               <div >
                { (
                 <Input  disabled={true}/>
                
                )}
              </div>
               </div>
              
              </FlexBox3>)}
        </FlexBox>)}
    <div className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}>
    {choicesState?.map((value,i)=><div className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont} ${value.show?styles.selectedChoiceType:styles.prevSelectionAnswerSelection}`} key={i}onClick={()=>handleChoiceSelection(i) }>
        <div> <b>{String.fromCharCode(65 + i)}</b></div>
        <div key={i} >{HtmlParser(value?.value)}</div>
    </div >)}
        </div >
    </>
}

const Input=styled.input`
height:50px;
text-align:center;  
width:80px;

`
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