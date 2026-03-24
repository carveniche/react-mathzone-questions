
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 ─ SHARED TICK SHELL
// ─────────────────────────────────────────────────────────────────────────────
/**
 * TickShell  — the outer wrapper every tick shares:
 *   • section class (answered vs live)
 *   • botline
 *   • ticktext container
 *   • vertical bar (keyVertBar / vertBar / ansSelected / answeredVertBar)
 *   • data-* attributes for mapping click delegation
 *
 * Children are rendered BELOW the vertical bar.
 */
import styles from "../../OnlineQuiz.module.css";
export default function TickShell({
  hasAnswerSubmitted, answered, isSelected, choiceType,
  minWidth, dataAttrs = {}, fracId, children,
}) {
  const barClass = answered
    ? isSelected ? styles.ansSelected : styles.answeredVertBar
    : choiceType === "mapping" ? styles.vertBar : styles.keyVertBar;

  return (
    <div
      className={hasAnswerSubmitted ? styles.answeredSection : styles.section}
      style={{ minWidth }}
      {...dataAttrs}
    >
      <div className={styles.botline} {...dataAttrs} />
      <div className={styles.ticktext} {...dataAttrs}>
        <div className={barClass} id={fracId} {...dataAttrs} />
        {children}
      </div>
    </div>
  );
}
