import React from "react";
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import HtmlParserComponent from "../CommonJSFiles/HtmlParserComponent";
import styles from "./OnlineQuiz.module.css";
import {
  addLazyLoading,
  removeUnwantedTags,
} from "../CommonJSFiles/gettingResponse";

function OnlineQuizQuestionContent({ content, totalRows }) {
  const [count, setCount] = useState(1);
  let rows = [];
  const refImagePreview = useRef([]);

  const previewImageClickHandler = (index) => {
    //console.log(refImagePreview.current[index].id, index);
    if (!refImagePreview.current[index].textContent) {
      refImagePreview.current[index].textContent = count;
      setCount(count + 1);
      refImagePreview.current[index].className = styles.selectCount;
    }
  };
  for (let i = 1; i <= totalRows; i++) {
    rows.push(
      <div
        className={`${styles.flex} ${styles.flexDirectionRow} ${styles.flexGap2rem}`}
        key={`row${i}`}
      >
        {content?.map((item, index) => {
          var questionTextFormatted = removeUnwantedTags(item.value);
          questionTextFormatted = addLazyLoading(questionTextFormatted);
          console.log("questionTextFormatted", questionTextFormatted);
          return (
            item.row === i && (
              <div key={index} className={styles.imageBoxes}>
                <div
                  ref={(el) => (refImagePreview.current[index] = el)}
                  id={index}
                ></div>
                <div onClick={() => previewImageClickHandler(index)}>
                  {HtmlParser(questionTextFormatted)}
                </div>
              </div>
            )
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ marginBottom: "1rem" }}>
      {rows.map((item) => (
        <HtmlParserComponent value={item} />
      ))}
    </div>
  );
}
export default OnlineQuizQuestionContent;
