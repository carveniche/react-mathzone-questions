import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import styled from "styled-components";

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
        <tbody style={{position:"relative"}}>
          {row?.map((items, index) => {
         
     if(index !==2){
      return(
        <tr key={index} className={items?.some(item => item?.value === 'R') ? styles.tdspace : styles.tdspace_pd}>

              {items?.map((item, i) =>

                  item.isMissed !== "true" 
                  ? (
            
                  <td key={i} style={{width:'40px',height:'40px'}} >
                    <div>
                      <p  style={InlineCss.Input}>
                        <HtmlParserComponent value={item?.value} />
                   
                      </p>
                     
                    </div>
           
                    {index % 2 === 0 && (
                      <>
                        <BottomBorder width={i == 0 ? "0px" : "100%"}></BottomBorder>
                      </>
                    )}
                  
                    {index == 1 && i == 0 && (
                      <>
                     <KeyRightPranthesis>)</KeyRightPranthesis>
                      </>
                    )}
                  </td>
                ) : (
                  <td key={i} className="two" style={{width:'40px',height:'40px'}}>
                    <div>{HtmlParser(item.imgvalue)}</div>
                    {console.log(item[student_answer])}
                    <div>
                      <div>
                        {
                          <input
                            maxLength={items.length-1==i?3:1}
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
                     <KeyRightPranthesis>)</KeyRightPranthesis>
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
            
                  <td key={i} className="one" style={{width:'20px',height:'20px'}}>
                    <div>
                      <b style={{marginLeft:'10px',fontSize:'15px'}}>
                        <HtmlParserComponent value={item?.re_value} />
                   
                      </b>
                     
                    </div>
           
                   
                  
                  
                  </td>
                ) : (
                  <td key={i} className="two" style={{width:'20px',height:'20px'}}>
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

export const KeyRightPranthesis = styled.div`
position: absolute;
top: 16px;
transform: scale(1.5,3.65);
right: -8px;
color: indigo;
`;

export const BottomBorder = styled.div`
  position: absolute;
  width: ${(props) => props.width ?? "100px"};
  bottom: -3px;
  height: 3px;
  right: -8px;
  background: indigo;
`;


const InlineCss = {
  Input: {
    height: "38px",
    textAlign: "center",
    width: "38px",
    position:"relative",
    zIndex:"1",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'0px'

  }, 
  re_Input: {
    height: "18px",
    textAlign: "center",
    width: "18px",
    position:"relative",
    zIndex:"1",
    fontSize:'15px'
  },

  



};
