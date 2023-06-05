import React, { useContext, useEffect, useRef } from "react";

import { useState } from "react";
import styles from "../OnlineQuiz.module.css";

import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export default function ContentVertical({
  content,
  totalRows,
  totalCols,
  hasAnswerSubmitted,
  totalEmptyBox,
  inputRef,
}) {
  let array2D = new Array(Number(totalRows) || 0);
  let temp = new Array(totalCols);
  for (let i = 0; i < array2D?.length; i++) {
    array2D[i] = [...temp];
  }
  const {isStudentAnswerResponse}=useContext(ValidationContext)
  let focusRef = useRef([...array2D]);

  const handleChange = (e, rows, cols) => {
    let arr = ["Backspace"];
   
    if (isNaN(Number(e.key))&&!arr.includes(e.key)) {
      return;
    }
    
    let prevStr = contentData[rows][cols]?.dropVal;
    if (e.keyCode == 8) {

      contentData[rows][cols].dropVal = ""
      contentData[rows][cols].show=false
  }
    else {
  
    
      contentData[rows][cols].dropVal = e.key
      contentData[rows][cols].show=true
    
    };

    if (prevStr == "" && e.keyCode == 8) {
      let temp = focusRef?.current;
      for (let j = cols; j < temp[0]?.length; j++) {
        let x = rows - 1;
        if (j != cols) x = focusRef.current?.length - 1;
        for (let i = x; i > -1; i--) {
          if (temp[i][j] !== undefined) {
            temp[i][j]?.children[0]?.focus();
            return;
          }
        }
      }
      return;
    }
    setContentData([...contentData]);

    if (e.keyCode !== 8) {
      let temp = focusRef?.current;
      let n = temp?.length || 0;
      let m = temp[0]?.length || 0;
      for (let j = cols; j > -1; j--) {
        let x = rows + 1;
        if (j != cols) x = 0;
        for (let i = x; i < n; i++) {
    
          if (temp[i][j] !== undefined) {
            temp[i][j]?.children[0]?.focus();
            return;
          }
        }
      }
    }
  };
  let currentIndex = 0;
  let [contentData,setContentData]=useState([])
  useEffect(()=>{
    contentData=content?.map(row=>row?.map(cols=>{
      let items={...cols,dropVal:'',show:false}
      return items
    }))
    setContentData([...contentData])
    
  },[])
  useEffect(() => {
    if(contentData?.length>0)
    firstTimeFocus();
  }, [contentData?.length]);
  
  const firstTimeFocus = () => {
    let temp = focusRef?.current;
    let n = focusRef.current?.length || 0;
    let m = focusRef.current[0]?.length || 0;
    for (let j = m - 1; j > 0; j--) {
      for (let i = 0; i < n; i++) {
        if (temp[i][j] !== undefined) {
          temp[i][j]?.children[0]?.focus();
          return;
        }
      }
    }
  };

inputRef.current=[...contentData]
  return (
    <div className="mathzone-color-indigo">
      <div style={{ marginTop: "4rem" }}>
        {contentData?.map((items, index) => (
          <div
            key={index}
            border={index === totalRows - 1 && "2px"}
            totalWidth={totalCols}
            className={styles.VerticalKeyingFlexBox}
            style={{
              borderTop: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              borderBottom: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 35}px`,
              padding:`${index === totalRows - 1 ? 5 : 0}px 0`,
            }}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                  <HtmlParserComponent value={item?.value} />
                </div>
              ) : (
                <div
                  value={item.value}
                  key={i}
                  ref={(el) => {
                    focusRef.current[index][i] = el;
                    
                    if (currentIndex < totalEmptyBox - 1)
                      currentIndex = currentIndex + 1;
                  }}
                >
                 
                  <input
                  
                    value={isStudentAnswerResponse?item[student_answer]:contentData[index][i]?.dropVal}
                    onKeyUp={(e) => {
                      if(isStudentAnswerResponse)return
                      handleChange(e, index, i);
                    }}
                    style={InlineCss.Input}
                    maxLength={1}
                    disabled={hasAnswerSubmitted||isStudentAnswerResponse}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const InlineCss = {
  Input: {
    width: "30px",
    height: "30px",
    textAlign: "center",
  },
};
