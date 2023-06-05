import React from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
import styles from "../OnlineQuiz.module.css";
export default function BlockBaseQuestionContent({ questionContent }) {
  return (
    <>
      <div style={Styles.FlexBox}>
        {questionContent.map((items, i) => (
          <div style={Styles.FlexBox} key={i}>
            {items.map((item, index) => (
              <div className={styles.blockBaseBoxes} key={index}>
                {HtmlParser(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;
const Styles = {
  FlexBox: {
    display: "flex",
    gap: "1rem",
    margin: "1rem 0",
    flexWrap: "wrap",
  },
};
const Boxes = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  * img {
    display: block;
  }
`;
