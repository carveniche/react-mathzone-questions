import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
export default function VerticalSelect({
  content,
  totalRows,
  totalCols,
  hasAnswerSubmitted,
  totalEmptyBox,
  inputRef,
  choices,
  studentAnswer
}) {
  let [choiceState, setChoicesState] = useState([]);
  const {isStudentAnswerResponse}=useContext(ValidationContext)
 
  const prevRef = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { val: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  
    
  }, []);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    choiceState[prevRef.current].show = false;
    choiceState[i].show = true;
    prevRef.current = i;
    setChoicesState([...choiceState]);
  };
  inputRef.current = choiceState;
  return (
    <div>
      <div style={{ marginTop: "4rem" }} className="mathzone-color-indigo">
        {content?.map((items, index) => (
          <div
          className={styles.VerticalKeyingFlexBox}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              borderBottom: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 35}px`,
              padding: `${index === totalRows - 1 ? 5 : 0}px 0`,
            }}
            key={index}
            border={index === totalRows - 1 && "2px"}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                  <HtmlParserComponent value={item?.value} />
                </div>
              ) : (
                <div value={item.value} key={i}>
                  <input style={StylesInline.Input} disabled={true} value="?"/>
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <div className={`${styles.MatchObjectVerticalVerticalFlexBox2} mathzone-color-indigo`}>
        {choiceState?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${isStudentAnswerResponse&&String(value.val)?.trim()===String(studentAnswer)?.trim()?styles.selectedChoiceType:value?.show ? styles.selectedChoiceType : ""}`}
          >
            <div className="mathzone-circle-selectbox">{String.fromCharCode(65 + i)}</div>
            <div key={i}>{HtmlParser(value.val)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



const StylesInline = {
  Input: {
    width: "30px",
    height: "30px",
    textAlign: "center",
  },
};
