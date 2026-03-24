/**
 * FractionTick  — handles BOTH fracWhole and fracSub ticks.
 *
 * A single component because both share the same outer shell structure.
 * The only difference is in their answer-input layout (handled by FractionKeyingInput)
 * and their display label (StaticMathField with whole vs fracSection).
 */

import { useContext } from "react";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import { StaticMathField } from "../../CommonJSFiles/ExternalPackages";
import styles from "../../OnlineQuiz.module.css";
import TickShell from "./TickShell";
export default function FractionTick({
  tick,
  choiceType, answered, hasAnswerSubmitted, numsDisplayed,
  inputValues, onInputChange,
  mappingSelected, reviewAnswer,
}) {
     const {
        isStudentAnswerResponse,
      } = useContext(ValidationContext);
  const {
    kind, whole, denom, isNeg, negSuffix, identity, fracId,
    isAnswer, isStart, isEnd,
    fracSection, effectiveN,
  } = tick;
  const isSelected = mappingSelected.includes(identity);
  // Label visibility rules:
  //   fracWhole: always show first tick; show others when numsDisplayed
  //   fracSub:   show when numsDisplayed OR at end OR landing on whole (effectiveN===0)
  const showLabel = kind === "fracWhole"
    ? (numsDisplayed || isStart)
    : (numsDisplayed || isEnd || effectiveN === 0);

  // Minimum width: answer ticks need more space for the input cluster
  const minWidth = whole === 0 ? 40 : isAnswer ? 70 : 45;

  // Shared data-* attributes propagated to all inner elements for mapping click delegation
  const dataAttrs = {
    "data-isneg"       : isNeg,
    "data-fracnum"     : kind === "fracWhole" ? 0 : effectiveN,
    "data-fracstart"   : whole,
    "data-fracinterval": negSuffix,
  };

  // Label rendered for non-answer ticks
  const displayLabel = kind === "fracWhole"
    ? <p className={styles.numMapBox} style={{ display: showLabel ? "block" : "block", top: numsDisplayed ? "10px" : "3px" }}>
        <StaticMathField>{whole}</StaticMathField>
      </p>
    : <p className={effectiveN === 0 ? styles.numMapBox : styles.mapBox}
         style={{ display: showLabel ? "block" : "none", top: numsDisplayed ? "10px" : "3px" }}>
        <StaticMathField>{fracSection}</StaticMathField>
      </p>;

  return (
    <TickShell
      hasAnswerSubmitted={hasAnswerSubmitted || isStudentAnswerResponse}
      answered={answered}
      isSelected={isSelected}
      choiceType={choiceType}
      minWidth={minWidth}
      fracId={fracId}
      dataAttrs={dataAttrs}
    >
      {isAnswer ? (
        choiceType === "keying" ? (
          <FractionKeyingInput
            tick={tick}
            inputValues={inputValues}
            onInputChange={onInputChange}
             hasAnswerSubmitted={hasAnswerSubmitted || isStudentAnswerResponse}
            reviewAnswer={reviewAnswer}
          />
        ) : choiceType === "selectchoice" ? (
          <p className={styles.qMark}>?</p>
        ) : null
      ) : displayLabel}
    </TickShell>
  );
}




// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 ─ FRACTION TICK  (whole + sub unified)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * FractionKeyingInput  — the input cluster for fraction keying positions.
 *
 * Whole-number position (kind="fracWhole"):
 *   One input for the whole number.
 *
 * Sub-fraction position (kind="fracSub"):
 *   [whole input]  (hidden when whole === 0 or −1)
 *   [numerator input] / [denominator input]
 */
function FractionKeyingInput({ tick, inputValues, onInputChange, hasAnswerSubmitted, reviewAnswer }) {
  const { kind, whole, denom, isNeg, identity, ansLength,
          startLength, numLength, intLength, effectiveN } = tick;

    const get = (subKey) => {
      if (reviewAnswer) {
        return getReviewValue(reviewAnswer, subKey) ?? "";
      }
      return inputValues[identity]?.[subKey] ?? "";
    };

  const readOnly = hasAnswerSubmitted 
  if (kind === "fracWhole") {
    return (
      <input
        readOnly={readOnly}
        value={get("whole")}
        onChange={e => onInputChange(identity, e.target.value, "whole")}
        style={{ width: `${Math.max(25, (ansLength ?? 2) * 14)}px` }}
        maxLength={(ansLength ?? 2) + 1}
        className={`${styles.checkNumLine} answers`}
        type="text"
      />
    );
  }

  // fracSub
  // Hide the whole-number part when near zero to avoid showing "0 1/3" as two inputs
  const hideWhole = isNeg ? whole === -1 : whole === 0;

  return (
    <div className={styles.answerNum}>
      {/* Whole number part */}
      <input
        readOnly={readOnly}
        value={get("whole")}
        onChange={e => onInputChange(identity, e.target.value, "whole")}
        style={{ ...fracInputStyle(startLength), display: hideWhole ? "none" : "block" }}
        maxLength={startLength + 1}
        className="answers ansFracNums"
        type="text"
      />
      {/* Numerator / denominator — shown only for genuine sub-tick positions */}
      {effectiveN !== 0 && (
        <div className={styles.answerFrac}>
          <input
            readOnly={readOnly}
            value={get("num")}
            onChange={e => onInputChange(identity, e.target.value, "num")}
            style={fracInputStyle(numLength)}
            maxLength={numLength + 1}
            className="answers ansFracStarts"
            type="text"
          />
          <span style={{ border: "1px solid #858585", width: "-webkit-fill-available" }} />
          <input
            readOnly={readOnly}
            value={get("denom")}
            onChange={e => onInputChange(identity, e.target.value, "denom")}
            style={fracInputStyle(intLength)}
            maxLength={intLength + 1}
            className="answers ansFracInts"
            type="text"
          />
        </div>
      )}
    </div>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 ─ SHARED UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Inline style for fraction keying inputs — sized to content */
const fracInputStyle = (chars = 1) => ({
  width      : `${Math.max(25, chars * 14)}px`,
  minWidth   : "25px",
  height     : "30px",
  paddingTop : "5px",
  fontFamily : "GothamRnd-Book2",
  textAlign  : "center",
  fontWeight : "700",
  fontSize   : "18px",
});



/**
 * getReviewValue(reviewAnswer, identity)
 * Finds the pre-filled value from question.student_answer for a given tick identity.
 * Works for both plain (identity = tick index) and fraction (identity = "w n d" string).
 */
function getReviewValue(reviewAnswer, subKey) {
  if (!reviewAnswer) return null;

  const value = Array.isArray(reviewAnswer)
    ? reviewAnswer[0]
    : reviewAnswer;

  if (!value) return null;

  const parts = String(value).trim().split(" ");

  if (subKey === undefined) return value;
  if (subKey === "whole") return parts[0] ?? "";
  if (subKey === "num") return parts[1] ?? "";
  if (subKey === "denom") return parts[2] ?? "";

  return null;
}

