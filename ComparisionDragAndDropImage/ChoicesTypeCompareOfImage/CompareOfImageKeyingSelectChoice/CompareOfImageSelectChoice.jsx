import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
export default function CompareOfImageSelectChoice({
  content,
  totalRows,
  dropRef,
  totalCols,
  state,
  studentAnswer
}) {
  const [choices, setChoices] = useState([]);
  let [rows, setRows] = useState([]);
  useEffect(() => {
    let row = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map((items) =>
        items.map(
          (item) =>{
            String(item.row) == String(i) &&
            temp.push({ ...item, show: false, dropValue: "" })}
        )
      );
      row.push(temp);
    }
    setRows([...row]);
    let arr = [];
    state?.choices?.map((item) => {
      let obj = { val: item, show: false };
      arr.push({ ...obj });
    });
    setChoices([...arr]);

  }, []);
  dropRef.current = [...choices];
  const { hasAnswerSubmitted,isStudentAnswerResponse } = useContext(ValidationContext);
  const prevRef = useRef(0);
  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    choices[prevRef.current].show = false;
    choices[i].show = true;
    prevRef.current = i;
    setChoices([...choices]);
  };
  const InlineCss = {
    FlexBox2: {
      display: "flex",
      flexDirection: "row",
      margin: "2rem 0.2rem",
      gap: "4rem",
      alignItems: "center",
      fontSize:18,
    },
    InsideDiv: {
      maxWidth: `Calc((100% - ${totalCols}*2rem) / ${totalCols})`,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    Input: {
      height: "50px",
      width: "100px",
      wordBreak: "break-all",
      textAlign: "center",
    },
  };
 
  return (
    <div>
      <div>
        {/* Droppable Part */}
        {rows?.map((items, i) => (
          <div key={i} totalRows={totalCols} style={InlineCss.FlexBox2}>
            {items?.map((item, index) =>
              item.isMissed == "false" ? (
                <div style={InlineCss.InsideDiv}>{HtmlParser(item.value)}</div>
              ) : (
                <div style={InlineCss.InsideDiv}>
                  <input disabled={true} style={InlineCss.Input} value={"?"}/>
                </div>
              )
            )}
          </div>
        ))}

        {/* Draggable Part */}
      </div>
      <div className={styles.CompareOfImagesSelectChoiceFlexBox}>
        {choices?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${(isStudentAnswerResponse&&String(value?.val)?.trim()===String(studentAnswer)?.trim())?styles.selectedChoiceType:value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div className="mathzone-circle-selectbox">{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.val)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
