import React from "react";
import styled from "styled-components";

import styles from "./../OnlineQuiz.module.css";
function DisplayImageCard({ className, images }) {
  return (
    <div className={`${className ?? ""} tensframe-image-container`}>
      {images}
    </div>
  );
}

export default function TensframeContent({
  totalColumns,
  images,
  currentIndex,
}) {
  let boxesArray = new Array(10).fill("");
  for (let i = 0; i < 10; i++) {
    if (i < currentIndex) boxesArray[i] = images;
  }
  return (
    <Grid
      column={totalColumns}
      className={styles.TensframeContentGrid}
      style={{
        gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
      }}
    >
      {boxesArray.map((el, index) => (
        <DisplayImageCard
          key={index}
          className={
            index < totalColumns ? styles.upperBorder : styles.lowerBorder
          }
          images={el}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  margin: 20px 0;
  border: 1px solid black;
  width: 80%;
  grid-template-columns: repeat(${(props) => props.column}, 1fr);
  text-align: center;
  > div {
    border: 1px solid black;
    height: 80px;
    border-top: 0px;
  }
  > .lower-border {
    border-bottom: 0px;
  }
  > div {
    border-right: 0px;
  }
  > div:nth-child(1) {
    border-left: 0px;
  }
  > div:nth-child(${(props) => props.column}n+1) {
    border-left: 0px;
  }
`;
