import React from 'react';
import HtmlParser from 'react-html-parser';
import styles from "../../OnlineQuiz.module.css";

function DisabledOnlineQuizSelectChoiceOption({
  choices,
}) {
  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
    >
      {choices.map((item, index) => (
        <div
          key={index}
          className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont}`}
        >
          <div>
            <b>({String.fromCharCode(65 + index)})</b>
          </div>
          <div className={styles.paddingRightSolutionItem}>{typeof item=="string"?HtmlParser(item):item}</div>
        </div>
      ))}
    </div>
  );
}
export default DisabledOnlineQuizSelectChoiceOption;
