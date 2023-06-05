import React, { useContext, useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
export default function LongDivisionKeyingChoiceType({
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
  };

  useEffect(() => {
    let arr = [];
    arr=Object.assign([],content)
    arr=arr.map((item)=>{
      return item?.map((items)=>{
        return {...items,show:false}
      })
    })

    setRow([...arr]);
  }, []);
  inputRef.current = row;
  let defaultBorderRef=useRef(3)
  return <div style={{width:'fit-content'}}>
   { row?.map((items, index) => (
    <div key={index} className={styles.LongDivisonDragDropFlexBox}>
      {items?.map((item, i) =>
        item.isMissed !== "true" ? (
          <div className={styles.LongDivisonDragDropFlexBox3} style={{
            borderBottom:`${(index%2===0&&i>0)?defaultBorderRef.current:0}px solid indigo`,
              borderRight:`${(index===1&&i===0)?defaultBorderRef.current+1:0}px solid indigo`,padding:10, paddingRight:5,
              borderRadius:`${index===1&&i===0?"150px":0}`,position:`${index===1&&i===0?"relative":"static"}`,top:-2,left:13,
              justifyContent:`${index>0&&i===0?"flex-end":"center"}`

             }}
             key={i}
             >
           
            <div>
              <b>
                <HtmlParserComponent value={item?.value} />
              </b>
            </div>
          </div>
        ) : (
          <div className={styles.LongDivisonDragDropFlexBox3} style={{
            borderBottom:`${(index%2===0&&i>0)?defaultBorderRef.current:0}px solid indigo`,
              borderRight:`${(index===1&&i===0)?defaultBorderRef.current+1:0}px solid indigo`,padding:10, paddingRight:5,
              borderRadius:`${index===1&&i===0?"150px":0}`,position:`${index===1&&i===0?"relative":"static"}`,top:-2,left:13,
              justifyContent:`${index>0&&i===0?"flex-end":"center"}`

             }}
             key={i}
             >
            <div>{HtmlParser(item.imgvalue)}</div>
            <div>
              <div>
                {
                  <input
                    style={InlineCss.Input}
                    value={
                      isStudentAnswerResponse
                        ? item[student_answer]
                        : row[index][i]?.dropVal
                    }
                    onChange={(e) => {
                      handleChange(e, index, i);
                    }}
                    disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                  />
                }
              </div>
            </div>
          </div>
        )
      )}
    </div>
  ))
}
  </div>

}


const InlineCss = {
  Input: {
    height: "30px",
    textAlign: "center",
    width: "15px",
  },
};
