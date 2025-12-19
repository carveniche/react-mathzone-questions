import React, { useContext, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../.././CommonJSFiles/HtmlParserComponent";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import SelectChoiceCommon from "../../../CommonFiles/SelectChoiceCommon";
import getSelectChoiceMissedValue from "../../../CommonJsxComponent/GetSelectChoiceMissedValue";

export default function ContentPlaceValueTableSelect({
  content,
  inputRef,
  questionHead,
  totalCols,
  choices,
  studentAnswer,
}) {

    const { hasAnswerSubmitted, setStudentAnswerChoice, isStudentAnswerResponse,setCurrectAnswer } =
    useContext(ValidationContext);
  let [choicesState, setChoicesState] = useState([]);
  let prev = useRef(0);
  useEffect(() => {

      const correctMissedAnswer=  getSelectChoiceMissedValue(choices,"option");
      console.log(correctMissedAnswer,"correctMissedAnswer")
      setCurrectAnswer(correctMissedAnswer);

    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);

  const handleChoiceSelection = (i) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
    setStudentAnswerChoice(choicesState[i]?.value);
  };
  inputRef.current = [...choicesState];
  return (
    <div>
      <div style={GridPlaceValueTable}>
        <div
          className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox}
          style={HeaderRowPlaceValueTable}
        >
       {questionHead?.map((item, i) => (
  <div key={i}>
    {JSON.stringify(item?.value).includes("mq-selectable") ? 
      parse(item?.value, optionSelectStaticMathField) : 
      <HtmlParserComponent value={item?.value} />}
  </div>
))}
        </div>
        {content?.map((items, index) => (
          <div
            key={index}
            className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox}
          >
            {items.map((item, i) =>
              item?.isMissed !== "true" ? (
                <div key={i}>
                  {JSON.stringify(item?.value).includes("mq-selectable") ? 
      parse(item?.value, optionSelectStaticMathField) : 
      <HtmlParserComponent value={item?.value} />}
                </div>
              ) : (
                <div>
                  <input disabled={true} value="?" />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <>


        <SelectChoiceCommon
          type={"htmlparse"}
          choices={choicesState}
          studentAnswer={studentAnswer}
          handleChoiceSelection={handleChoiceSelection}
        />

      </>
    </div>
  );
}

export const GridPlaceValueTable = {
  maxWidth: 850,
  display: "table",
  width: "fit-content",
  textAlign: "center",
};

export const HeaderRowPlaceValueTable = {
  backgroundColor: "orange",
  color: "white",
};
