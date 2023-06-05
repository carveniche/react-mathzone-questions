import React from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import styles from "../OnlineQuiz.module.css";
export default function ContentVerticalSymbols({
  content,
  contentText,
  totalCols,
}) {
  return (
    <div>
      {content?.map((items, index) => (
        <div key={index} className={styles.VerticalWithSymbolsFlexBox}>
          {items?.map((item, i) => (
            <div key={i}>{HtmlParser(item.value)}</div>
          ))}
        </div>
      ))}
      {contentText && <div>{HtmlParser(contentText)}</div>}
    </div>
  );
}
const FlexBox = styled.div`
  display: flex;

  align-items: center;
  gap: 1.2rem;
  margin: 2rem 0;

  > div {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    justify-content: center;
  }
`;
