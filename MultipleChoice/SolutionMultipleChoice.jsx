import React from "react";
import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import {
  addLazyLoading,
  removeUnwantedTags,
} from "../../CommonJSFiles/gettingResponse";
function SolutionMultipleChoice({ model, type, hideSolutionText }) {
  var formattedmodel = removeUnwantedTags(model);
  formattedmodel = addLazyLoading(formattedmodel);
  console.log("formattedmodel", formattedmodel);
  return (
    <div
      className={`${styles.solutionPage} ${styles.solutionPage2}`}
      style={{
        fontWeight: "initial",
        fontSize: "initial",
        lineHeight: "initial",
      }}
    >
      {!hideSolutionText && (
        <div className={styles.solutionText}>
          <u>Solution: </u>
        </div>
      )}
      {formattedmodel?.map(
        (item, i) =>
          (item.correct ||
            String(type).trim() == "Fill in the blanks ".trim()) && (
            <React.Fragment key={i}>
              <div key={i}>
                {parse(item.choices, optionSelectStaticMathField)}
              </div>
              {item?.solution && (
                <div>{parse(item?.solution, optionSelectStaticMathField)}</div>
              )}
              {item?.solution_image && (
                <div>{<img loading="lazy" src={item?.solution_image} />}</div>
              )}
              {item?.solution1 && (
                <div>{parse(item?.solution1, optionSelectStaticMathField)}</div>
              )}
              {item?.solution1_image && (
                <div>{<img loading="lazy" src={item?.solution1_image} />}</div>
              )}
              {item?.solution2 && (
                <div>{parse(item?.solution2, optionSelectStaticMathField)}</div>
              )}
              {item?.solution2_image && (
                <div>{<img loading="lazy" src={item?.solution2_image} />}</div>
              )}
            </React.Fragment>
          )
      )}
    </div>
  );
}
export default SolutionMultipleChoice;
