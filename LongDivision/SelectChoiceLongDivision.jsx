import React, { useEffect } from "react";
import { useState, useRef } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../OnlineQuiz.module.css";
export default function LongDivisonSelectChoice({
  choices,
  inputRef,
  answerHasSelected,
  content,
  totalRows,
}) {
  const [row, setRow] = useState([]);
  let [choicesState, setChoicesState] = useState([]);
  let prev = useRef(0);
  useEffect(() => {
    let arr2 = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr2.push({ ...obj });
    });

    let arr = [];
    arr=Object.assign([],content)
    arr=arr.map((item)=>{
      return item?.map((items)=>{
        return {...items,show:false}
      })
    })
    setRow([...arr]);
    setChoicesState([...arr2]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (answerHasSelected) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;
  const defaultBorderRef=useRef(3)
  return (
    <>
   <div style={{width:'fit-content'}}>
   {row?.map((items, index) => (
        <div
          key={index}
          className={styles.LongDivisonDragDropFlexBox}
        >
          {items?.map((item, i) =>
            item.isMissed !== "true" ? (
              <div
              key={i}
                className={styles.LongDivisonDragDropFlexBox3}
                style={{
                  borderBottom:`${(index%2===0&&i>0)?defaultBorderRef.current:0}px solid indigo`,
                    borderRight:`${(index===1&&i===0)?defaultBorderRef.current+1:0}px solid indigo`,padding:10,
                    paddingRight:5,
                    borderRadius:`${index===1&&i===0?"150px":0}`,position:`${index===1&&i===0?"relative":"static"}`,top:-2,left:13,
                    justifyContent:`${index>0&&i===0?"flex-end":"center"}`
      
                   }}
              >
               
                <div>
                  <b>
                    {typeof item?.value == "string"
                      ? HtmlParser(item?.value)
                      : item?.value}
                  </b>
                </div>
              </div>
            ) : (
              <div
              key={i}
                className={styles.LongDivisonDragDropFlexBox3}
                style={{
                  borderBottom:`${(index%2===0&&i>0)?defaultBorderRef.current:0}px solid indigo`,
                    borderRight:`${(index===1&&i===0)?defaultBorderRef.current+1:0}px solid indigo`,padding:10, paddingRight:5,
                    borderRadius:`${index===1&&i===0?"150px":0}`,position:`${index===1&&i===0?"relative":"static"}`,top:-2,left:13,
                    justifyContent:`${index>0&&i===0?"flex-end":"center"}`
      
                   }}
              >
              
              
                  <div>{<input style={InlineCss.Input} disabled={true} value={"?"}/>}</div>
                
              </div>
            )
          )}
        </div>
      ))}
   </div>
      <div
        className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
      >
        {choicesState?.map((value, i) => (
          <div
          key={i}
            className={`${styles.flex} ${styles.choiceType} ${
              styles.selectChoicesFont
            } ${
              value.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
            
            onClick={() => handleChoiceSelection(i)}
          >
            <div className="mathzone-circle-selectbox">
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div key={i}>{HtmlParser(value?.value)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
const InlineCss = {
  Input: {
    height: "30px",
    textAlign: "center",
    width: "15px",
  },
};
