import React ,{useState,useEffect} from 'react'
import LongDivision from './LongDivision'
// import Solution from "../../MainOnlineQuiz/Solution.module.css";
import styles from "../OnlineQuiz.module.css";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";

import {
  BottomBorder,
  RightPranthesis,
  TopBorder,
} from "./DragDropLongDivision";

export default function MainLongDivision({teacher,obj,meter}) {
  return (
    <LongDivision state={obj} meter={meter} teacher={teacher} totalRows={obj?.rows||1} totalCols={obj?.cols||1}/>
  )
}



export function CorrectLongDvision2({data}){

  const [row, setRow] = useState([]);
 useEffect(()=>{
  let arr = [];
  arr=data?.questionContent
  setRow([...arr])
  console.log('arr',arr)
 },[])

  return (
    <div className={styles.correctAnswerBox}>
    <div className={`${styles.correctAnswer} ${styles.correctAnswer2}`}>
    <h6>The correct answer is:</h6>

    <div style={{ width: "fit-content" }}>
       
      <table
        style={{ borderCollapse: "collapse" }}
        className={styles.longDivisonTable}
      >
        <tbody>
          
          {row?.map((items, index) => (
           
            <tr key={index}>
              {items?.map((item, i) =>
               
                  <td key={i} style={{padding:'5px'}}>
                    <div style={{width:'22px',height:'22px',padding:'5px',backgroundColor:item.isMissed==="true"?'#8BC34A':''}}>
                    <b >   
                        <HtmlParserComponent value={item?.value} />
                      </b>
                    </div>
                    {index % 2 === 1 && (
                      <>
                        <TopBorder width={i == 0 ? "8px" : "100%"}></TopBorder>
                      </>
                    )}
                    {index == row.length - 1 && (
                      <BottomBorder
                        width={i == 0 ? "8px" : "100%"}
                      ></BottomBorder>
                    )}
                    {index == 1 && i == 0 && (
                      <>
                        <RightPranthesis>)</RightPranthesis>
                      </>
                    )}
                  </td>
                
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
 } 