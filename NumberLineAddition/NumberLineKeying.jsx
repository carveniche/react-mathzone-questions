/**
 * NumberLineKeying.jsx
 *
 * Handles every number-line question variant:
 *   • Plain integer        start="0"   end="10"  interval="1"
 *   • Decimal 1dp          start="14.5" end="15" interval="0.1"
 *   • Decimal 2dp          start="0.5"  end="1"  interval="0.01"
 *   • Fraction positive    start="0"   end="3"   interval="3"  isFraction=true
 *   • Fraction negative    start="-2"  end="0"   interval="2"  isFraction=true
 *   • Fraction neg→pos     start="-1"  end="2"   interval="4"  isFraction=true
 *
 * choiceType:  "keying" | "mapping" | "selectchoice"
 * Modes:       live answering | review (isStudentAnswerResponse=true)
 *
 * Zero DOM access — all state is in React.
 */

import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../CommonJsxComponent/ConditionOnProgressBar";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { StaticMathField } from "../CommonJSFiles/ExternalPackages";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
import SelectChoiceHorizontalFillUpsEquationType from "../HorizontalFillUpsEquationType/ChoiceTypeHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType";
import LineDesign from "./LineDesign";
import PlainTick from "./TickStore/PlainTick";
import FractionTick from "./TickStore/FractionTick";
import buildTicks from "./TickStore/buildTicks";
import validateAnswer from "./TickStore/validateAnswer";






// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 ─ TICK DISPATCHER
// ─────────────────────────────────────────────────────────────────────────────
/** Routes each tick descriptor to the right renderer. */
function Tick(props) {
  const { tick } = props;
  if (tick.kind === "plain") return <PlainTick {...props} />;
  return <FractionTick {...props} />;  // fracWhole + fracSub both use FractionTick
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 ─ MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function NumberLineKeying({ question, meter }) {
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    readQuestionText,
    setCurrectAnswer,
  } = useContext(ValidationContext);

  const choiceType = question.choiceType;
  const numsDisplayed = question.numbersDisplayed;
  const choices = question.choices?.map(c => c.toString());
  const ansArray = question?.ansArray
  const inputRef = useRef(null)

  // In review/response mode the correct answer is already on the question object
  const reviewAnswer = isStudentAnswerResponse
    ? (question.student_answer ?? null)
    : null;

  // ── state ───────────────────────────────────────────────────────────────────
  /*
    inputValues  — controlled inputs for keying mode
      plain:    { [tickIndex]: "14.7" }
      fraction: { [identity]: { whole:"1", num:"2", denom:"3" } }

    studAns      — mapping selections  OR  [selectedOption] for selectchoice
    answered     — true once submit succeeds (drives answer highlight styles)
    redAlert     — true when student tries to submit an empty answer
  */
  const [inputValues, setInputValues] = useState({});
  const [studAns, setStudAns] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [redAlert, setRedAlert] = useState(false);

  // Register the correct answer text for the progress / result context
  useEffect(() => {
    setCurrectAnswer(question.ansArray.join(""));
  }, [question.question_id]);

  // Tick descriptors — memoised, only recalculates when question changes
  const ticks = useMemo(() => buildTicks(question), [question]);

  // ── handlers ────────────────────────────────────────────────────────────────

  /**
   * handleInputChange — called by PlainTick and FractionKeyingInput on every keystroke.
   *   key    = tick index (plain) or identity string (fraction)
   *   value  = new string value
   *   subKey = undefined (plain) | "whole" | "num" | "denom" (fraction)
   */
  function handleInputChange(key, value, subKey) {
    setInputValues(prev => ({
      ...prev,
      [key]: subKey
        ? { ...(prev[key] || {}), [subKey]: value }
        : value,
    }));
  }

  /**
   * handleMappingClick — click-event delegation for mapping mode.
   * Walks up the DOM to the nearest element that carries data-fracnum or data-option,
   * then toggles that answer in studAns.
   */
  function handleMappingClick(e) {
    if (hasAnswerSubmitted) return;

    let el = e.target;
    while (el && el.dataset?.fracnum === undefined && el.dataset?.option === undefined) {
      el = el.parentElement;
    }
    if (!el) return;

    let answer;
    if (el.dataset.option !== undefined) {
      const t = ticks[Number(el.dataset.option)];
      if (!t) return;
      answer = t.value;
    } else {
      const { fracstart, fracnum, fracinterval } = el.dataset;
      answer = `${fracstart} ${fracnum} ${fracinterval}`;
    }

    setStudAns(prev =>
      prev.includes(answer) ? prev.filter(a => a !== answer) : [...prev, answer]
    );
    setRedAlert(false);
  }

  /**
   * handleSubmitAnswer — validates the current answer state and stores the result.
   */
  function handleSubmitAnswer() {
    if (hasAnswerSubmitted) return;

    const { isWrong, isEmpty, studentFinalAnswer } = validateAnswer({
      choiceType, ticks, inputValues, studAns, question, inputRef
    });

    if (isEmpty) {
      setRedAlert(true);
      return;
    }

    setRedAlert(false);
    setIsAnswerCorrect(!isWrong);
    setHasAnswerSubmitted(true);
    setAnswered(true);
    setQuestionWithAnswer({ ...question, student_answer: studentFinalAnswer });
  }


  const reviewInputValue = []
  ticks.forEach((item, i) => {
    if (ansArray.includes(item.value) && reviewAnswer?.length > 0) {
      // getting value reverse
      reviewInputValue.push(reviewAnswer?.pop())
    } else {
      reviewInputValue.push(null)
    }
  })

 
  // ── shared props passed into every Tick ─────────────────────────────────────
  const tickProps = {
    choiceType,
    answered,
    hasAnswerSubmitted,
    numsDisplayed,
    inputValues,
    onInputChange: handleInputChange,
    mappingSelected: studAns,
    reviewAnswer,
    ansArray,
    reviewInputValue
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Solve button — hidden in review mode */}
      {!isStudentAnswerResponse && (
        <SolveButton onClick={handleSubmitAnswer} answerHasSelected={hasAnswerSubmitted} />
      )}

      {/* Empty-answer alert */}
      {redAlert && <CustomAlertBoxMathZone />}

      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div style={{ maxWidth: "100%" }}>

          {/* Question text (may contain MathML / LaTeX via html-react-parser) */}
          <div className={styles.questionName} style={{ display: "flex" }}>
            {readQuestionText && (
              <SpeakQuestionText readText={question?.questionName} />
            )}
            {parse(question?.questionName?.trim(), optionSelectStaticMathField)}
          </div>

          {/* Optional question image */}
          {question?.upload_file_name && (
            <img src={question.upload_file_name} alt="question illustration" />
          )}

          {/* Progress bar */}
          {/* <div className={styles.borderTopBottomMargin}>
            <ConditionOnProgressBar meter={meter} />
          </div> */}

          {/* ── Number line ── */}
          <div
            className={styles.contentParent}
            onClick={choiceType === "mapping" ? handleMappingClick : undefined}
          >
            <LineDesign
              lines={ticks.map((tick, i) => (
                <Tick
                  key={tick.identity ?? `plain-${tick.index ?? i}`}
                  tick={tick}
                  ticks={ticks}
                  {...tickProps}
                />
              ))}
            />

            {/* Keying hint text */}
            {choiceType === "keying" && (
              <p style={{ padding: "20px 0" }}>
                {`Enter the ${question.ansArray.length > 1 ? "answers" : "answer"} in the ${question.ansArray.length > 1 ? "boxes." : "box."}`}
              </p>
            )}

            {/* Select-choice option strip */}
            {choiceType == "selectchoice" && (
              <SelectChoiceHorizontalFillUpsEquationType
                type="number_line_addition"
                inputRef={inputRef}
                content={question?.questionContent}
                isFraction={question.isFraction}
                totalRows={question.rows}
                answerHasSelected={hasAnswerSubmitted}
                choices={choices}
                studentAnswer={studAns}
                choiceType={choiceType}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
