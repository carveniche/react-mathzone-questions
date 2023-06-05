import React from "react";
import HtmlParser from "react-html-parser";
import styles from "../../../OnlineQuiz.module.css";
import styled from "styled-components";
export default function DisabledSelectVerticalSymbols({ choices }) {
  return (
    <div
      className={`${styles.flex} ${styles.flexGap2rem} ${styles.flexWrap} ${styles.boxChoices}`}
    >
      {choices.map((item, i) => (
        <div
          className={`${styles.flex} ${styles.choiceType} ${styles.selectChoicesFont}`}
          key={i}
        >
          <div>
            <b>{String.fromCharCode(65 + i)}</b>
          </div>
          <div>{HtmlParser(item)}</div>
        </div>
      ))}
    </div>
  );
}

const FlexBox = styled.div`
margin:1rem;
display:flex;
border:1px solid black;
width:400px;
height:80px;
align-items:Center;
background-color:${(props) =>
  props.backgroundColor ? props.backgroundColor : "initial"};
gap:1rem;
> div{
    padding-left:1rem;
}
> div:nth-child(2){
    padding-left
}
`;
