import React from 'react';
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import HtmlParserComponent from '../CommonJSFiles/HtmlParserComponent';
import styles from "./OnlineQuiz.module.css";

function OnlineQuizQuestionContent({ content, totalRows }) {
  console.log(content, "check content")
  const [count, setCount] = useState(1);
  let rows = [];
  const refImagePreview = useRef([]);

  const addStylesToImg = (htmlString, styles) => {
    const styleString = Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(' ');
    return htmlString.replace(/<img(.*?)\/?>/g, `<img$1 style="${styleString}" />`);
  };
const imgStyles = {
  width: "100px",  // Set desired width
  height: "100px", // Set desired height
  borderRadius: "10px", // Example additional style
};
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
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }} // Use rgba to control transparency
       
      >
        {content?.map(
          (item, index) =>
            item.row === i && (
              <div key={index} className={styles.imageBoxes}  >
                <div
                  ref={(el) => (refImagePreview.current[index] = el)}
                  id={index}
                 
                ></div>
                 <div onClick={() => previewImageClickHandler(index)}>
                  {HtmlParser(addStylesToImg(item.value, imgStyles))}
                </div>
              </div>
            )
        )}
      </div>
    );
  }
  return <div style={{marginBottom:"1rem"}}>{rows.map((item) =><HtmlParserComponent value={item}/>)}</div>;
}
export default OnlineQuizQuestionContent;
