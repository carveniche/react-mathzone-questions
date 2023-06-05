import React from "react";
import { useRef, useState, useEffect } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styles from "../../../OnlineQuiz.module.css";
import styled from "styled-components";

function DisabledSelectChoiceOptionMultiplePicture({
  choices,
  totalRows,
  
}) {
const [flag,setFlag]=useState()
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let flag=false
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      choices[i]?.map((item, j) => {
        item.row == i + 1 &&
          item.col == j + 1 &&
          rows.push({ ...item, show: false });
          let text=String(item?.value)
          if(text.includes('img')&&text.includes('src'))
          {
            flag=true
         
          }
      });
    }
  setFlag(flag)
    setRows([...rows]);
  }, []);



  return (
    <div>
      <Griding totalRow={flag?1:2}>
        {rows?.map((item, i) => (
          <div  className={`${ item.show
            ? styles.selectedChoiceType
            : styles.prevSelectionAnswerSelection}`}> 
            {HtmlParser(item.value)}
          </div>
        ))}
      </Griding>
    </div>
  );
}
export default DisabledSelectChoiceOptionMultiplePicture;
const Griding = styled.div`
  display: grid;
  width:90%;
  margin-top: 1rem;
  gap: 1rem;
  position:relative;
  grid-template-columns: repeat(${(props) => props.totalRow},1fr);
  max-height:auto;
  > div {
  
    gap: 4px;


    display: flex;
    cursor: pointer;
    flex-wrap: wrap;
    border: 1px solid black;
    padding: 1rem;
    align-items: end;
    border-radius: 5px;
  }
`;
