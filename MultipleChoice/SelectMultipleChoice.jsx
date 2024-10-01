import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import {
  addLazyLoading,
  removeUnwantedTags,
} from "../../CommonJSFiles/gettingResponse";
export default function SelectMultipleChoice({
  choices,
  inputRef,
  answerHasSelected,
  submitted,
  choiceId,
}) {
  let [choicesState, setChoicesState] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  let prev = useRef(0);
  useEffect(() => {
    let arr = [];
    choices?.map((item) => {
      if (item.solution) {
        item.solution = removeUnwantedTags(item.solution);
        item.solution = addLazyLoading(item.solution);
      }
      let obj = { ...item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
  }, []);
  const handleChoiceSelection = (i) => {
    if (answerHasSelected || isStudentAnswerResponse) return;
    choicesState[prev.current].show = false;
    choicesState[i].show = true;
    setChoicesState([...choicesState]);
    prev.current = i;
  };
  inputRef.current = choicesState;

  return (
    <div className="mathzoneMultipleChoiceFlexBox .word-space_pre-wrap">
      {choicesState?.map(
        (value, i) =>
          (value.choices || value?.choice_image) && (
            <div
              className={`mathzoneFlex  ${
                isStudentAnswerResponse &&
                String(choiceId)?.trim() === String(value?.choice_id)?.trim()
                  ? "mathzoneSelectedChoiceType"
                  : value.show
                  ? "mathzoneSelectedChoiceType"
                  : "mathzonePrevSelectionAnswerSelection"
              }`}
              style={{ padding: `${value?.choice_image ? 0.5 : 1}rem 1rem` }}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div className="mathzone-circle-selectbox">
                {" "}
                <b>{String.fromCharCode(65 + i)}</b>
              </div>
              <div className={`mathzoneFlex mathzoneFlexDirectionColumn`}>
                {value.choices && (
                  <div key={i}>
                    {parse(value.choices, optionSelectStaticMathField)}
                  </div>
                )}
                {value?.choice_image && (
                  <div className="choiceImage">
                    <img src={value?.choice_image} />
                  </div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
