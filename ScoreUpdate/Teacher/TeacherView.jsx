import React, { useEffect, useState } from "react"
import { useContext } from "react"
import styled from "styled-components"
import { StudentResultMathZone } from "../../../../../api"
import { ViewStatusContext } from "../../../../myPages/demo"
import handleResizeWidth from "../../../MainOnlineQuiz/handleResizeWidth"
import styles from "../../OnlineQuiz.module.css"
import TeacherViewResEnd from "./TeacherViewResEnd/TeacherViewResEnd"
export default function TeacherView({practiceId,conceptName,conceptTag}){
    const [data,setData]=useState([])
useEffect(()=>{
   
    let search = window.location.search;
    let urlParams = new URLSearchParams(search);
    let userId = urlParams.get("userID");
    let url=`?live_class_practice_id=${practiceId}&user_id=${userId}`
    getStudentResult(url)
    handleCloseReviewResultStatus()


},[])
const getStudentResult=async(url)=>{
    try{
    let result=await StudentResultMathZone(url)
    setData(result?.data?.result_data)

    }
    catch(e){
        console.log('error in api',e)
    }
}
const [state,setState]=useState(false)
const handleClose=()=>{
    handleCloseReviewResultStatus()
setCurrentUserId("")
}
const handleOpenResponse=(id)=>{
    console.log(id)
    setCurrentUserId(id)
    handleOpenReviewResultStatus()
}
useEffect(()=>{
handleResizeWidth()
},[reviewResultStatus])
const [currentUserId,setCurrentUserId]=useState("")
const {handleCloseReviewResultStatus,handleOpenReviewResultStatus,reviewResultStatus}=useContext(ViewStatusContext)
return  !reviewResultStatus?<div>
    <div className={styles.title2}>
        
        <div style={{display:'flex',justifyContent:'center' ,fontWeight:'bold !important'}} id={styles.titleStatus}>Result Status</div>
      
      </div>
<Grid>
    <div className="borderRight bgColor textColor"><a>Student Name</a></div>
    <div className="borderRight bgColor textColor">Total Questions</div>
    <div className="borderRight bgColor textColor">Skipped Questions</div>
    <div className="borderRight bgColor textColor">Correct </div>
    <div className="borderRight bgColor textColor">Incorrect </div>
    <div className="bgColor textColor">Score</div>
 
    {data?.map((item,i)=><><div className="borderRight borderTop">{item?.name}</div>
<div className="borderRight borderTop">{item?.total||0}</div>
<div className="borderRight borderTop">{item?.skipped||0}</div>
<div className="borderRight borderTop">{item?.correct}</div>
<div className="borderRight borderTop pointer" onClick={()=>handleOpenResponse(item.user_id)}>{item?.incorrect}</div>
<div className="borderTop ">{item?.score}</div>

</>)}
</Grid>
</div>:<TeacherViewResEnd practiceId={practiceId} id={currentUserId} onClick={handleClose}/>
}

const Grid=styled.div`
display:grid;
width:90%;
margin-top:1rem;
margin-left:4%;
margin-right:6%;
grid-template-columns:repeat(6,1fr);
word-break:break;
> div{
    
    border:1px solid black;
    padding:0.2rem;
    justify-content:center;
    align-items:center;
    display:flex;
    font-weight:400;
    font-size:16px;
    word-break:break;
    text-align:center
}
> .borderRight{
    border-right:0;
}
> .borderTop{
    border-top:0;
}
> .flexBox{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0;
}
> .flexBox > button{
    margin-right:0;
    margin:0;
    width:100%;
    height:100%;
    border-radius:0;

}
> .pointer{
    color:red;
    cursor:pointer;

}
> .bgColor{
    background-color:deepskyblue;  
    
  }
   > .textColor{
    color:white;
  }
`