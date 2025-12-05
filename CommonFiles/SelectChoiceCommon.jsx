import React, { useContext, useEffect, useState } from 'react'
import { optionSelectStaticMathField } from '../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode'
import parse from "html-react-parser";
import styled from "styled-components";
import styles from "../CommonFiles/ModuleStyles/choices.module.css";
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import HtmlParser from 'react-html-parser';
export default function SelectChoiceCommon(

  { type,
    choices,
    studentAnswer,
    handleChoiceSelection }) {

  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    isAnswerCorrect,
    choicesId,
    setChoicesId,
    studentAnswerChoice,
    setStudentAnswerChoice,
    studentAnswerQuestion,
    setStudentAnswerQuestion,
    responseUrl,
    setResponseUrl,
    handleCurrentIdentity,
    currentIdentity,
    setQuestionWithAnswer,
    questionWithAnswer,
    handleUpdateStudentAnswerResponse,
    isStudentAnswerResponse,
    indianAccent,
    setIndianAccent,
    readQuestionText,
    setReadQuestiontext,
    setChoices,
    showQuizResponseAsText,
    currectAnswer,
    questionObj,
  } = useContext(ValidationContext)

  return (
    <>
      <div className={styles.choices_wrapper}>
        {choices?.map((item, i) => {
          const valueTrimmed = String(item?.value).trim();
          const studentChoiceTrimmed = String(studentAnswerChoice).trim();
          const correctAnswerTrimmed = String(currectAnswer).trim();
          const studentAnswerTrimmed = String(studentAnswer).trim();
          const isSelectedTrue = isStudentAnswerResponse && correctAnswerTrimmed == item?.value;
          const isSelected = isStudentAnswerResponse && correctAnswerTrimmed == studentAnswerTrimmed && item?.value == studentAnswerTrimmed;
          const isSelectedFalse = isStudentAnswerResponse && correctAnswerTrimmed !== studentAnswerTrimmed && item?.value == studentAnswerTrimmed;
          const isVisible = item?.show;
          const isAnswerSubmitted = hasAnswerSubmitted;
          const isCurrentStudentAnswer = isAnswerSubmitted && isVisible && correctAnswerTrimmed == studentChoiceTrimmed;
          const isThisCorrectAnswer = isAnswerSubmitted && correctAnswerTrimmed == valueTrimmed;
          const isThisIncorrectAnswer = isAnswerSubmitted && isVisible && correctAnswerTrimmed !== studentChoiceTrimmed;
          const classList = new Set([
            styles.choiceType,
            isSelectedFalse && styles.red,
            (isSelected || isSelectedTrue) && styles.green,
            isVisible ? styles.selectedChoiceType : styles.prevSelectionAnswerSelection,
            isCurrentStudentAnswer && styles.green,
            isThisIncorrectAnswer && styles.red,
            isThisCorrectAnswer && styles.green,
            (isAnswerSubmitted || isStudentAnswerResponse) && styles.notHoverClass

          ]);

          const className = Array.from(classList).filter(Boolean).join(' ');
          return (

            <div
              className={className}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div className={styles.choiceTypeInner}>
                <div className={` ${styles.circle}`}>
                  {" "}
                  <b>{String.fromCharCode(65 + i)}</b>
                </div>
                <div key={i} className={styles.choice_text}>
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

          )
        })}
      </div>

    </>
  )
}







export function SelectChoiceCommonOld(

  {
    choices,
    choiceId,
    handleChoiceSelection }) {

  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    studentAnswerChoice,
    isStudentAnswerResponse,
    currectAnswer,
  } = useContext(ValidationContext)
  return (
    <>
      <div className={styles.choices_wrapper}>
        {choices?.map((item, i) => {
          const valueTrimmed = String(item?.choice_id).trim();
          const studentChoiceTrimmed = String(studentAnswerChoice).trim();
          const correctAnswerTrimmed = String(currectAnswer).trim();
          const studentAnswerTrimmed = String(choiceId).trim();
          const isSelectedTrue = isStudentAnswerResponse && correctAnswerTrimmed == item?.choice_id;
          const isSelected = isStudentAnswerResponse && correctAnswerTrimmed == studentAnswerTrimmed && item?.choice_id == studentAnswerTrimmed;
          const isSelectedFalse = isStudentAnswerResponse && correctAnswerTrimmed !== studentAnswerTrimmed && item?.choice_id == studentAnswerTrimmed;
          const isVisible = item?.show;
          const isAnswerSubmitted = hasAnswerSubmitted;
          const isCurrentStudentAnswer = isAnswerSubmitted && isVisible && correctAnswerTrimmed == studentChoiceTrimmed;
          const isThisCorrectAnswer = isAnswerSubmitted && correctAnswerTrimmed == valueTrimmed;
          const isThisIncorrectAnswer = isAnswerSubmitted && isVisible && correctAnswerTrimmed !== studentChoiceTrimmed;

          const classList = new Set([
            styles.choiceType,
            isSelectedFalse && styles.red,
            (isSelected || isSelectedTrue) && styles.green,
            isVisible ? styles.selectedChoiceType : styles.prevSelectionAnswerSelection,
            isCurrentStudentAnswer && styles.green,
            isThisIncorrectAnswer && styles.red,
            isThisCorrectAnswer && styles.green,
            (isAnswerSubmitted || isStudentAnswerResponse) && styles.notHoverClass
          ]);

          const className = Array.from(classList).filter(Boolean).join(' ');

          return (

            <div
              className={className}
              key={i}
              onClick={() => handleChoiceSelection(i)}
            >
              <div className={styles.choiceTypeInner}
                style={{ padding: `${item?.choice_image ? 0.5 : 1} rem 1rem` }}

              >
                <div className={` ${styles.circle}`}>
                  {" "}
                  <b>{String.fromCharCode(65 + i)}</b>
                </div>
                <div className={`${styles.choice_text}`}>
                  {item.choices && (
                    <div key={i}>
                      {parse(item.choices, optionSelectStaticMathField)}
                    </div>
                  )}
                  {item?.choice_image && (
                    <div className="choiceImage">
                      <img src={item?.choice_image} />
                    </div>
                  )}
                </div>
              </div>
            </div>

          )
        })}
      </div>
    </>
  )
}
