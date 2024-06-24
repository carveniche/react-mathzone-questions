import React, { useEffect, useState } from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"; 
import styles from "../OnlineQuiz.module.css";  
export default function ContentCountOnTensframe({content,totalRows}){
let [state,setState]=useState([])
useEffect(()=>{
    totalRows=Number(totalRows)||0
let arr=[]
// for(let i=0;i<10;i++){
//     if(i<totalRows) arr.push(content)
// } 
const parsedContent = HtmlParser(content);
 
parsedContent.className = styles.imgggg;
 
console.log("---------", parsedContent.className);
 
for(let i=0;i<10;i++){
      arr.push(i<totalRows ? <div className={styles.box} >{HtmlParser(content)}</div> : <div className={styles.box} ></div> )
}
setState([...arr])
},[]) 
return <div className={styles.gridBox}>
    {state?.map((item)=> item)}
    </div>
    // return <div className={styles.gridBox}>
    // {state?.map((item)=><div  className={styles.box} >{HtmlParser(item)}</div>)}
    // </div>
}
 