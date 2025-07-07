import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import SelectChoiceCommon from "../../../../CommonJsxComponent/SelectChoiceCommon";
import getSelectChoiceMissedValue from "../../../../CommonJsxComponent/GetSelectChoiceMissedValue";
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
  const { isStudentAnswerResponse, setCurrectAnswer, setStudentAnswerChoice } = useContext(ValidationContext)

  const prevRef = useRef(0);


  useEffect(() => {

    const correctMissedAnswer = getSelectChoiceMissedValue(content)
    setCurrectAnswer(correctMissedAnswer);
    console.log(correctMissedAnswer, content, "correctMissedAnswer")

    let arr = [];
    choices?.map((item) => {
      let obj = { value: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);


  }, []);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    choiceState[prevRef.current].show = false;
    choiceState[i].show = true;
    prevRef.current = i;
    setChoicesState([...choiceState]);
    setStudentAnswerChoice(choiceState[i]?.value);
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
              borderTop: `${index === totalRows - 1 || index === 2 ? 2 : 0}px solid black`,
              borderBottom: `${index === totalRows - 1 ? 2 : 0}px solid black`,
              width: `${totalCols * 35}px`,
              padding: `${index === totalRows - 1 ? 5 : 0}px 0`,
              paddingTop: `${index === 2 ? 5 : 'initial'}px`,
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
                  <input style={StylesInline.Input} disabled={true} value="?" />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      
      <>
        {/* {choiceState?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={`${styles.choicebox} ${isStudentAnswerResponse&&String(value.val)?.trim()===String(studentAnswer)?.trim()?styles.selectedChoiceType:value?.show ? styles.selectedChoiceType : ""}`}
          >

            <div className={`mathzone-circle-selectbox ${styles.circle}`}>
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div key={i}>{HtmlParser(value.val)}</div>
          </div>
        ))} */}

        <SelectChoiceCommon
          type={"htmlparse"}
          choices={choiceState}
          studentAnswer={studentAnswer}
          handleChoiceSelection={handleChoiceSelection}
        />

      </>
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
