import React from 'react';
import HtmlParser from "react-html-parser";
import styles from "../OnlineQuiz.module.css";
function ContentHorizontalNotSymbols({ content, totalRows }) {
  let rows = [];
  for (let i = 1; i <= totalRows; i++) {
    rows.push(
      <div
        className={`${styles.flex} ${styles.flexDirectionRow} ${styles.flexGap2rem} ${styles.imageBoxes}`}
        key={`row${i}`}
        style={{margin:"1.4rem 0"}}
      >
        {content?.map(
          (item) => (
              item?.map((items,index)=>items.row===i&&<div key={index} style={{display:'flex',flexWrap:'wrap'}}>{HtmlParser(items.value)}</div>)
            )
        )}
      </div>
    );
  }
  return <div>{rows.map((item) =>typeof  item=="string"?HtmlParser(item):item)}</div>;
}
export default ContentHorizontalNotSymbols;
