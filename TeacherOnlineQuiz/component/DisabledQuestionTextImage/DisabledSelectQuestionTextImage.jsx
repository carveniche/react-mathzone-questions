import React from "react";
import HtmlParser from "react-html-parser";
import styles from "../../../OnlineQuiz.module.css";
export default function DisabledSelectQuestionTextImage({ choices }) {
  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
    >
      {choices.map((item, i) => (
        <div
          className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont}`}
          key={i}
          name={item.option}
        >
          <div>
            <b>{String.fromCharCode(65 + i)}</b>
          </div>
          <div>{HtmlParser(item.image)}</div>
        </div>
      ))}
    </div>
  );
}
