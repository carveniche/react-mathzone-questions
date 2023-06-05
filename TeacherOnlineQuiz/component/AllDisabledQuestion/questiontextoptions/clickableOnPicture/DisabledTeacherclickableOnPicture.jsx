import { Pattern } from "./pattern"
import styles from "./clickableOnPicture.module.css"
import styles2 from "../../OnlineQuiz.module.css";
import parse from "html-react-parser"
import { useContext, useEffect, useState } from "react"

import styled from "styled-components";
import { ProgressBorder } from "../../../../../../Modal2/modal2";

// let data = {
//     operation: "addition",
//     type: "questiontextoptions",
//     questionName: "Which picture shows 6?",
//     row: 1,
//     col: 2,
//     questionContent: [
//       [
//         {
//           row: 1,
//           col: 1,
//           value:
//             '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/10-Camel.png"\u003e',
//           count: "8",
//           selected: "true",
//         },
//         {
//           row: 1,
//           col: 2,
//           value:
//             '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/04-Zebra.png"\u003e',
//           count: "7",
//           selected: "false",
//         },
//       ],
//     ],
//     solution: { model: [] },
//     arrangement: "regular",
//     answerValue: "true",
//   };

export const DisabledTeacherClickableOnPic = ({data,meter}) => {
  meter=Number(meter)||0
    const [questionContent,setQuestionContent]=useState([])
    useEffect(()=>{
let totalRows=Number(data?.row)||0
let arr=[]
for(let i=0;i<totalRows;i++)
{
    data?.questionContent[i]?.map((item,j)=>{
        item?.row==(i+1)&&item.col==(j+1)&&arr.push({...item,show:false})
    })

}
let n=arr?.length||0
for(let i=0;i<n;i++)
{
  if(arr[i]?.selected==="true")
  {
    setPrevStatus(i)
    break
  }
}
setQuestionContent([...arr])
    },[])
    const [prevStatus,setPrevStatus]=useState(-1)
    const hasAnswerSubmitted=true
    const handleClick = (index) =>{
        if(hasAnswerSubmitted)
        return
        setPrevStatus(index)
    }

    return <div>
    
         <div>
        <div className={styles2.questionName}>{parse(data.questionName)}</div>
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div>
        <Grid totalCols={Number(data?.col)||0}>
            {questionContent?.map((e, i) => {
                return <div className={styles.frame}style={{background:prevStatus == i ?"blue":"white",cursor:'pointer'}}  onClick={()=>{handleClick(i)}} ><Pattern count={questionContent[i]?.count} imgUrl={questionContent[i]?.value} /></div>
            })}
        </Grid>
       
        
            </div>
    </div>
    </div>
}

const Grid=styled.div`
display:grid;
max-width:90%;
gap:1rem;
grid-template-columns: repeat(${props=>props.totalCols}, 1fr);
`