import React, { useContext } from 'react';
import parse from "html-react-parser";
import styles from "../CommonFiles/ModuleStyles/choices.module.css";
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import HtmlParser from 'react-html-parser';
import { optionSelectStaticMathField } from '../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode';

export default function MultiSelectChoiceCommon({
  type,
  choices,
  studentAnswer,
  handleChoiceSelection
}) {

  const {
    hasAnswerSubmitted,
    studentAnswerChoice,
    isStudentAnswerResponse,
    currectAnswer,
  } = useContext(ValidationContext);


  function extractLatexFromMathQuill(input) {
    if (!input || typeof input !== "string") return "";

    const container = document.createElement("div");
    container.innerHTML = input;

    container.querySelectorAll(".mq-selectable").forEach(el => {
      const latexMatch = el.textContent.match(/\$(.*?)\$/);
      const latex = latexMatch ? latexMatch[1] : "";
      el.replaceWith(latex);
    });

    let result = container.textContent || "";

    result = result
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .replace(/×/g, "*")
      .replace(/\\{2,}/g, "\\")
      .trim();

    return result;
  }

  return (
    <div className={styles.choices_wrapper}>
      {choices?.map((item, i) => {

        const str = JSON.stringify(item);

        let valueTrimmed = item?.value;
        let studentChoiceTrimmed = studentAnswerChoice;
        let correctAnswerTrimmed = currectAnswer;
        let studentAnswerTrimmed = studentAnswer;

        if (str.includes("mq-selectable")) {

          valueTrimmed = extractLatexFromMathQuill(
            String(item?.value).trim()
          );

          studentChoiceTrimmed = extractLatexFromMathQuill(
            String(studentAnswerChoice).trim()
          );

          // ✅ Preserve array structure
          if (Array.isArray(currectAnswer)) {
            correctAnswerTrimmed = currectAnswer.map(val =>
              extractLatexFromMathQuill(String(val).trim())
            );
          } else {
            correctAnswerTrimmed = extractLatexFromMathQuill(
              String(currectAnswer).trim()
            );
          }

          if (Array.isArray(studentAnswer)) {
            studentAnswerTrimmed = studentAnswer.map(val =>
              extractLatexFromMathQuill(String(val).trim())
            );
          } else {
            studentAnswerTrimmed = extractLatexFromMathQuill(
              String(studentAnswer).trim()
            );
          }
        }
        // ✅ SAFE ARRAY CONVERSION (Minimal Fix)
        const correctArray = Array.isArray(correctAnswerTrimmed)
          ? correctAnswerTrimmed
          : [correctAnswerTrimmed];

        const studentArray = Array.isArray(studentAnswerTrimmed)
          ? studentAnswerTrimmed
          : [studentAnswerTrimmed];

        const isSelectedFalse =
          isStudentAnswerResponse &&
          !correctArray.includes(valueTrimmed) &&
          studentArray.includes(valueTrimmed);

        const isVisible = !isStudentAnswerResponse && item?.show;
        const isAnswerSubmitted = hasAnswerSubmitted;

        const isThisIncorrectAnswer =
          item?.selected !== "true" &&
          isAnswerSubmitted &&
          isVisible &&
          !correctArray.includes(studentChoiceTrimmed);

        const correctOption =
          (isAnswerSubmitted || isStudentAnswerResponse) &&
          item?.selected == "true";

        const classList = new Set([
          styles.choiceType,
          (isSelectedFalse || isThisIncorrectAnswer) && styles.red,
          correctOption && styles.green,
          isVisible
            ? styles.selectedChoiceType
            : styles.prevSelectionAnswerSelection,
          (isAnswerSubmitted || isStudentAnswerResponse) &&
            styles.notHoverClass
        ]);

        const className = Array.from(classList)
          .filter(Boolean)
          .join(' ');

        return (
          <div
            className={className}
            key={i}
            onClick={() => handleChoiceSelection(i)}
          >
            <div className={styles.choiceTypeInner}>
              <div className={styles.circle}>
                <b>{String.fromCharCode(65 + i)}</b>
              </div>

              <div className={styles.choice_text}>
                {
                  type === "htmlparse"
                    ? HtmlParser(item?.value)
                    : type === "number"
                      ? (Number(item?.value) || "?")
                      : parse(item?.value, optionSelectStaticMathField)
                }
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}