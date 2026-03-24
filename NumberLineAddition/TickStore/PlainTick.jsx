// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 ─ PLAIN TICK
// ─────────────────────────────────────────────────────────────────────────────

import { useContext } from "react";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import TickShell from "./TickShell";
import styles from "../../OnlineQuiz.module.css";
/**
 * PlainTick  — one tick on an integer or decimal number line.
 *
 * If isAnswer:
 *   keying      → controlled <input>
 *   selectchoice → "?" label
 *   mapping     → (nothing extra — bar colour handles it)
 * Else:
 *   show numeric label (visibility driven by numsDisplayed / isFirst / isLast)
 */
export default function PlainTick({
  tick,
  choiceType, answered, hasAnswerSubmitted, numsDisplayed,onInputChange,
  mappingSelected,reviewInputValue
}) {

  const {
    isStudentAnswerResponse,
  } = useContext(ValidationContext);

  const { value, label, index, isAnswer, isFirst, isLast } = tick;

  const showLabel  = numsDisplayed || isFirst || isLast;
  const isSelected = mappingSelected.includes(value);

  return (
    <TickShell
      hasAnswerSubmitted={hasAnswerSubmitted}
      answered={answered}
      isSelected={isSelected}
      choiceType={choiceType}
      minWidth={45}
      fracId={`pBox_${index}`}
      dataAttrs={{ "data-option": index }}
    >
      {isAnswer ? (
        choiceType === "keying" ? (
          <input
            readOnly={(hasAnswerSubmitted || isStudentAnswerResponse)}
            defaultValue={isStudentAnswerResponse ? reviewInputValue[index] : ""}
            onChange={e => onInputChange(index, e.target.value)}
            style={{ width: `${Math.max(20, label.length * 14)}px`, margin: "2px" }}
            maxLength={label.length + 2}
            className={`${styles.checkNumLine} answers para_text`}
            id={`pValBox_${index}`}
            type="text"
          />
        ) : choiceType === "selectchoice" ? (
          <p className={styles.qMark}>?</p>
        ) : null
      ) : (
        <p
          className={styles.mapBox}
          id={`pValBox_${index}`}
          style={{ display: showLabel ? "block" : "none" }}
        >
          {label}
        </p>
      )}
    </TickShell>
  );
}