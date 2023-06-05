import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StudentResultMathZone } from "../../../../../api";
import handleResizeWidth from "../../../MainOnlineQuiz/handleResizeWidth";
import styles from "../../OnlineQuiz.module.css"
export default function ParentViews({ practiceId, conceptName, conceptTag,students }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    allChildrenInfo(students)
    handleResizeWidth();
  }, []);
  const promiseResolve=async (item)=>{
    let search = window.location.search;
    let urlParams = new URLSearchParams(search);
    let userId = urlParams.get("userID");
    let studentIds=item?.split('-')[0]
    
    let url=`?live_class_practice_id=${practiceId}&user_id=${userId}&student_id=${studentIds}`
    let result=await StudentResultMathZone(url)
    
    setData(prev=>{
      let temp=[...prev]
      if(result?.data?.result_data[0])
      temp.push(result?.data?.result_data[0])
      return temp
    })
    
 
  }
const allChildrenInfo=async (students)=>{
console.log(data)
for(let item of students)
{
  await promiseResolve(item)
  
}
}

  return (
    <div>
         <div className={styles.title2}>
        
        <div style={{display:'flex',justifyContent:'center' ,fontWeight:'bold !important'}} id={styles.titleStatus}>Result Status</div>
      
      </div>
      <Grid>
    <div className="borderRight bgColor textColor">Student Name</div>
    <div className="borderRight bgColor textColor">Total Questions</div>
    <div className="borderRight bgColor textColor">Skipped Questions</div>
    <div className="borderRight bgColor textColor">Correct </div>
    <div className="borderRight bgColor textColor">Incorrect </div>
    <div className="bgColor textColor">Score</div>

        {data?.map((item, i) => (
          <>
            <div className="borderRight borderTop">{item?.name}</div>
            <div className="borderRight borderTop">{item?.total || 0}</div>
            <div className="borderRight borderTop">{item?.skipped || 0}</div>
            <div className="borderRight borderTop">{item?.correct}</div>
            <div
              className="borderRight borderTop pointer"
              
            >
              {item?.incorrect}
            </div>
            <div className="borderTop ">{item?.score}</div>
          </>
        ))}
      </Grid>
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  width: 90%;
  margin-top: 1rem;
  margin-left: 4%;
  margin-right: 6%;
  grid-template-columns: repeat(6, 1fr);
  word-break: break;
  > div {
    border: 1px solid black;
    padding: 0.2rem;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: 400;
    font-size: 16px;
    word-break: break;
    text-align: center;
  }
  > .borderRight {
    border-right: 0;
  }
  > .borderTop {
    border-top: 0;
  }
  > .flexBox {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  > .flexBox > button {
    margin-right: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  > .pointer {
    color: red;
    cursor: pointer;
  }
  > .bgColor{
    background-color:deepskyblue;  
    
  }
  > .textColor{
    color:white;
  }
`;
