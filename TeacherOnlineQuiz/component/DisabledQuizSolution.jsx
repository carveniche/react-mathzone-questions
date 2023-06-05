import React from 'react';
import HtmlParser from "react-html-parser";
import styles from "../../OnlineQuiz.module.css";
function DisabledQuizSolution(model) {
  let arr = model.model;

  return (
    <div style={{margin:"1rem 0"}}>
      <div className={styles.solutionText}>Solution</div>
      {arr?.map((item, i) => (
        <div key={i}>{HtmlParser(item.val)}</div>
      ))}
    </div>
  );
}
export default DisabledQuizSolution;
