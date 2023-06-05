import React from 'react';
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import styles from "../../OnlineQuiz.module.css";

function DisabledHorizontalPreviewContent({ content, totalRows }) {
  const [count, setCount] = useState(1);
  let rows = [];
  const refImagePreview = useRef([]);
  
  const previewImageClickHandler = (index) => {
    //console.log(refImagePreview.current[index].id, index);
    if (!refImagePreview.current[index].textContent) {
      refImagePreview.current[index].textContent = count;
      setCount(count + 1);
refImagePreview.current[index].className=styles.selectCount
    }
  };
  for (let i = 1; i <= totalRows; i++) {
    rows.push(
      <div
        className={`${styles.flex} ${styles.flexDirectionRow} ${styles.flexGap2rem}`}
        key={`row${i}`}
      >
        {content?.map(
          (item, index) =>
            item.row === i && (
              <div key={index} className={styles.imageBoxes}>
                <div
                  ref={(el) => (refImagePreview.current[index] = el)}
                  id={index}
                ></div>
                <div >
                  {HtmlParser(item.value)}
                </div>
              </div>
            )
        )}
      </div>
    );
  }

  return <div>{rows.map((item) => typeof item=="string"?HtmlParser(item):item)}</div>;
}
export default DisabledHorizontalPreviewContent;
