import React from 'react';
import HtmlParser from "react-html-parser";
import { optionSelectStaticMathField } from './HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode';
import styles from "./OnlineQuiz.module.css";
import parse from "html-react-parser"
import CorrectAnswerDisplay from '../CommonJsxComponent/CorrectAnswerDisplay';
function OnlineQuizSolutionModel(model) {
  let arr = model?.model;
  let obj=model?.obj
  let isAnswerCorrect=model?.isAnswerCorrect

  return (
    <div className={styles.solutionPage}>
 {!isAnswerCorrect&&<CorrectAnswerDisplay obj={obj} />}
    {arr?.length>0&&  <div className={styles.solutionText}><u>Solution: </u></div>}
      {arr?.map((item, i) => (
        <div key={i}>{parse(item?.val??'',optionSelectStaticMathField)}</div>
      ))}
    </div>
  );
}
export default OnlineQuizSolutionModel;
