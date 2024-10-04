import React from "react";
import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import styles from "./OnlineQuiz.module.css";
import { addLazyLoading } from "../CommonJSFiles/gettingResponse";
function DisplayImageCard({
  images,
  indexs,
  className,
  totalImage,
  setImageLoaded,
  className2,
}) {
  const [state, setState] = useState();
  useEffect(() => {
    let id = setTimeout(() => {
      setState(images);
      if (totalImage - 1 === indexs) setImageLoaded(true);
    }, 250 * indexs);
    return () => clearTimeout(id);
  }, []);
  return <div className={`${className} ${className2}`}>{state}</div>;
}

function ContentCountTensframeQuiz({
  content,
  totalRows,
  setImageLoaded,
  studentResponseView,
}) {
  let rows = [];
  let totalImage = content.length;

  for (let i = 1; i <= totalRows; i++) {
    let temp = [];
    content.map((item) => item.row === i && temp.push(HtmlParser(item.image)));
    rows.push(temp);
  }
  let totalColumns = rows[0]?.length;
  console.log("---------------");
  return (
    <div
      column={totalColumns}
      className={styles.CountGridTenframesMultipleContentGrid}
      style={{
        gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
      }}
    >
      {content.map((item, index) => {
        var formattedImage = addLazyLoading(item.image);
        return (
          <DisplayImageCard
            key={index}
            images={HtmlParser(formattedImage)}
            indexs={studentResponseView ? 0 : index}
            className={
              index < totalColumns ? styles.upperBorder : styles.lowerBorder
            }
            totalImage={totalImage}
            setImageLoaded={setImageLoaded}
            className2={index === totalColumns && styles.leftBorder}
          />
        );
      })}
    </div>
  );
}
export default ContentCountTensframeQuiz;
