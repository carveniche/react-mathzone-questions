import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import {
  BottomBorder,
  RightPranthesis,
  TopBorder,
} from "./DragDropShortDivision";
export default function ShortDivisionKeyingChoiceType({
  inputRef, 
  content,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);

  const { isStudentAnswerResponse } = useContext(ValidationContext);

  const handleChange = (e, rows, cols) => {
    
    row[rows][cols].dropVal = e.target.value;
  
    if (row[rows][cols].dropVal == "") {
      row[rows][cols].show = false;
    } else row[rows][cols].show = true;
    
    setRow([...row]);
    console.log(row,"row")
  };
  
  const handleChange1 = (e, rows, cols) => {
    
    row[rows][cols].dropVal = e.target.value;
  
    if (row[rows][cols].dropVal == "") {
      row[rows][cols].re_show = false;
    } else row[rows][cols].re_show = true;
    
    setRow([...row]);
    console.log(row,"dbvjh")
  };

  useEffect(() => {
    let arr = [];
    arr = Object.assign([], content);
    arr = arr.map((item) => {
      return item?.map((items) => {
        return { ...items, show: false,re_show:false };
      });
    });

    setRow([...arr]);
    console.log(arr.length,"arr")
  }, []);

  inputRef.current = row;
  let defaultBorderRef = useRef(3);
  return (
    <div style={{ width: "fit-content" }}>
      <table
        style={{ borderCollapse: "collapse",position:"relative" }}
        className={styles.longDivisonTable}
      >
        <tbody>
          {row?.map((items, index) => {
            
     if(index !==2){
      return(
            <tr key={index} className={content.length >2? (index ===1 ? `${styles.keyrow_1}` : ''):"" }>
              {items?.map((item, i) =>

                  item.isMissed !== "true" 
                  ? (
            
                  <td key={i} style={{width:'40px',height:'55px'}} >
                    <div>
                      <b>
                        <HtmlParserComponent value={item?.value} />
                   
                      </b>
                     
                    </div>
           
                    {index % 2 === 0 && (
                      <>
                        <BottomBorder width={i == 0 ? "0px" : "100%"}></BottomBorder>
                      </>
                    )}
                  
                    {index == 1 && i == 0 && (
                      <>
                      <RightPranthesis transform={content.length > 2 ? 'scale(1.4, 5.02)' : 'scale(1.4, 2.65)'}
                           style={{top:content.length > 2 ?'-16px':'9px'}}>|</RightPranthesis>
                       {/* <p style={content.length>2?StraightPranthesis:StraightPranthesisSmall}></p> */}
                      </>
                    )}
                  </td>
                ) : (
                  <td key={i} className="two" style={{width:'40px',height:'55px'}}>
                    <div>{HtmlParser(item.imgvalue)}</div>
                    {console.log(item[student_answer])}
                    <div>
                      <div>
                        {
                          <input
                            maxLength={1}
                            type={"text"}
                            style={InlineCss.Input}
                            value={
                              isStudentAnswerResponse
                                ? item[student_answer]
                                : row[index][i]?.dropVal
                            }
                            onChange={(e) => {
                              handleChange(e, index, i);
                            }}
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
                          />
                        }
                      </div>
                    </div>
                    {index % 2 == 0 && (
                      <>
                        <BottomBorder width={i == 0 ? "0px" : "100%"}></BottomBorder>
                      </>
                    )}
                  
                    {index == 1 && i == 0 && (
                      <>
                       <RightPranthesis transform={content.length > 2 ? 'scale(1.4, 5.02)' : 'scale(1.4, 2.65)'}
                           style={{top:content.length > 2 ?'-16px':'9px'}}>|</RightPranthesis>
                      </>
                    )}
                  </td>
                )
              )}


    

            </tr>
)
 }else{
  return(
  <tr key={index} className={`${styles.keyrow_2}`}>

         {items?.map((item, i) =>
                  item.re_isMissed !== "true" 
                  ? (
            
                  <td key={i} className="one" style={{width:'40px',height:'50px'}}>
                    <div>
                      <b>
                        <HtmlParserComponent value={item?.re_value} />
                   
                      </b>
                     
                    </div>
           
                   
                  
                  
                  </td>
                ) : (
                  <td key={i} className="two" style={{width:'40px',height:'50px'}}>
                    <div>{HtmlParser(item.imgvalue)}</div>
                    {console.log(item[student_answer])}
                    <div>
                      <div>
                        {
                          <input
                            maxLength={1}
                            type={"text"}
                            style={InlineCss.re_Input}
                            value={
                              isStudentAnswerResponse
                                ? item[student_answer]
                                : row[index][i]?.dropVal
                            }
                            onChange={(e) => {
                              handleChange1(e, index, i);
                            }}
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
                          />
                        }
                      </div>
                    </div>
                
                  </td>
                )
              )}




</tr>
  )
 }



})}
        </tbody>
      </table>
    </div>
  );
}


const InlineCss = {
  Input: {
    height: "40px",
    textAlign: "center",
    width: "40px",
  }, 
  re_Input: {
    height: "38px",
    textAlign: "center",
    width: "40px",
  },

  



};
