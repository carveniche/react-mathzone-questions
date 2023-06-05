import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from "../../../OnlineQuiz.module.css";
import styled from "styled-components";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
function DisabledOptMultPicChoiceSelectEqn({ choices, totalRows, inputRef }) {
  const [flag, setFlag] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let flag = false;
    let rows = [];
    for (let i = 0; i < Number(totalRows); i++) {
      choices[i]?.map((item, j) => {
        item.row == i + 1 &&
          item.col == j + 1 &&
          rows.push({ ...item, show: false });
        let text = String(item?.value);
        if (text.includes("img") && text.includes("src")) {
          flag = true;
        }
      });
    }
    setFlag(flag);
    setRows([...rows]);
  }, []);

  inputRef.current = rows;
  return (
    <div>
      <div
        totalRow={flag ? 1 : 2}
        style={{
          display: "grid",
          width: "90%",
          marginTop: "1rem",
          gap: "1rem",
          position: "relative",
          gridTemplateColumns: `repeat(${flag ? 1 : 2},1fr)`,
        }}
      >
        {rows?.map((item, i) => (
          <div
            style={{
              gap: "4px",

              display: "flex",
              cursor: "pointer",
              flexWrap: "wrap",
              border: " 1px solid black",
              padding: "1rem",
              alignItems: "center",
              borderRadius: "5px",
            }}
            className={`${
              item.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
          >
            {parse(item.value, optionSelectStaticMathField)}
          </div>
        ))}
      </div>
    </div>
  );
}
export default DisabledOptMultPicChoiceSelectEqn;

const Grid = styled.div`
  display: grid;
  width: 90%;
  margin-top: 1rem;
  gap: 1rem;
  position: relative;
  grid-template-columns: repeat(${(props) => props.totalRow}, 1fr);
  max-height: auto;
  > div {
    gap: 4px;

    display: flex;
    cursor: pointer;
    flex-wrap: wrap;
    border: 1px solid black;
    padding: 1rem;
    align-items: center;
    border-radius: 5px;
  }
`;
const InlineStyles = {
  Grid: {
    display: "grid",
    width: "90%",
    marginTop: "1rem",
    gap: "1rem",
    position: "relative",
    "& > div": {
      background: "red",
      width: "300px",
      height: "400px",
    },
  },
};
