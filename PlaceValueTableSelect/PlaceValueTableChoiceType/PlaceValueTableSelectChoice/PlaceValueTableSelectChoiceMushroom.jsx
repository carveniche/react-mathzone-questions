import React, { useContext, useEffect, useRef } from "react";
import parse from "html-react-parser";

import { useState } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import { ValidationContext } from "../../../../MainOnlineQuiz/MainOnlineQuizPage";
import HtmlParserComponent from "../../../../CommonJSFiles/HtmlParserComponent";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function PlaceValueTableSelectMushroom({
  content,
  inputRef,
  questionHead,
  totalCols,
  choices,
  studentAnswer,
}) {
  let [choicesState, setChoicesState] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  let prev = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const handleChoiceSelection = (i) => {
    setSelectedOption(i)
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = [...choicesState];
  const fontSizeDynamic = (text) => {
    const length = text.length;
  
    if (length > 10) {
      return "12px";
    } else if (length > 5) {
      return "18px"; 
    } else {
      return "24px";
    }
  };
  return (
    <div>
      <div style={GridPlaceValueTable}>
        <div
          className={styles.PlaceValueTableSelectTypeSelectChoiceFlexBox}
          style={HeaderRowPlaceValueTable}
        >
          {questionHead?.map((item, i) => (
            <div key={i}>
              {JSON.stringify(item?.value).includes("mq-selectable") ? (
                parse(item?.value, optionSelectStaticMathField)
              ) : (
                <HtmlParserComponent value={item?.value} />
              )}
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
                  {JSON.stringify(item?.value).includes("mq-selectable") ? (
                    parse(item?.value, optionSelectStaticMathField)
                  ) : (
                    <HtmlParserComponent value={item?.value} />
                  )}
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

      <div
        className={`${styles.flex} ${styles.flexWrap} ${styles.boxChoices}`}
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        {choicesState?.map((value, i) => (
          <div
            key={i}
            onClick={() => handleChoiceSelection(i)}
            className={styles.choiceItem}
            style={{
              position: "relative",
              cursor: "pointer",
              outline: selectedOption === i ? "4px solid yellow" : "none",
              borderRadius: "50%",
              padding: "0",
            }}
          >
            <img
              src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
              alt="Mushroom"
            />
            <div>
              {
                <div
                  key={i}
                  className={styles.choiceText}
                  style={{
                    fontSize: fontSizeDynamic(
                      JSON.stringify(value?.value).includes("mq-selectable")
                        ? parse(value?.value, optionSelectStaticMathField)
                        : HtmlParser(value?.value)
                    ),
                  }}
                >
                  {JSON.stringify(value?.value).includes("mq-selectable")
                    ? parse(value?.value, optionSelectStaticMathField)
                    : HtmlParser(value?.value)}
                </div>
              }
            </div>
          </div>
        ))}
      </div>
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
