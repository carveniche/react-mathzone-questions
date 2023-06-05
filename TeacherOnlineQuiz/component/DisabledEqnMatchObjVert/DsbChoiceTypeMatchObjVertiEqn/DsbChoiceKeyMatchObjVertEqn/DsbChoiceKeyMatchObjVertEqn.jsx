import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import styles from "../../../../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function DsbChoiceKeyMatchObjVertEqn({ content, totalRows }) {
  const [row, setRow] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        item.row == i && temp.push({ ...item, show: false, dropVal: "" });
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);

  return row?.map((items, index) => (
    <div key={index}>
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <div className={styles.MatchObjectVerticalKeyingFlexBox3}>
            <div style={{ fontSize: 16, fontWeight: "bold", gap: "1rem" }}>
              {parse(item?.imgvalue, optionSelectStaticMathField)}
            </div>
            <div style={{ fontSize: 16, fontWeight: "bold", gap: "1rem" }}>
              {parse(item?.numvalue, optionSelectStaticMathField)}
            </div>
          </div>
        ) : (
          <div className={styles.MatchObjectVerticalKeyingFlexBox3}>
            <div style={{ fontSize: 16, fontWeight: "bold", gap: "1rem" }}>
              {parse(item.imgvalue, optionSelectStaticMathField)}
            </div>
            <div>
              <div>
                <input readOnly={true} style={InlineCss.Input} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  ));
}

export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Input = styled.input`
  height: 50px;
  text-align: center;
  width: 100px;
`;
const StylesInline = {
  Input: { height: "50px", textAlign: "center", width: "100px" },
};
const FlexBox3 = styled.div`
  width: 80%;
  margin: 1rem 0;
  display: flex;
  gap: 4rem;
  align-items: center;
  > div {
    max-width: calc(50% - 2rem);
    min-width: 90px;
    width: auto;
    font-weight: 600;
  }
  > div {
    display: flex;
    justify-content: left;
  }
`;
const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "80px",
    borderRadius: 5,
  },
};
