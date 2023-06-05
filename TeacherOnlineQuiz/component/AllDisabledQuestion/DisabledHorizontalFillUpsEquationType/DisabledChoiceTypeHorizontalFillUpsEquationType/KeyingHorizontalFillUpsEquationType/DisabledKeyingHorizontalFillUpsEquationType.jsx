import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import styles from "../../DisabledHorizontalFillUpsEquationType.module.css";
import parse from "html-react-parser";

import { EditableMathField, StaticMathField } from "react-mathquill";
import { optionSelectStaticMathField } from "../../../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
export default function DisabledKeyingHorizontalFillUpsEquationType({
  inputRef,
  content,
  totalRows,
  totalEmptyBox,
  totalCols,
}) {
  const temp = new Array(Number(totalRows) || 1).fill(0);

  let array = temp.map((item) => {
    item = [];
    let temp2 = new Array(totalCols).fill(0);
    item.push(temp2);
    return item;
  });
  const inputBoxRef = useRef([...array]);
  const [row, setRow] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        item.row == i && temp.push(item);
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);

  return (
    <div>
      {row?.map((items, index) => (
        <div className={styles.HorizontalPictureKeyingFlexBox} key={index} style={{margin:"1rem 0"}}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
              <div key={i} style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>{parse(item.value,optionSelectStaticMathField)}</div>
            ) : (
              <div ref={(el) => (inputBoxRef.current[index][i] = el)}>
                <input readOnly={true} style={InlineCss.Input} />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
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
  width: 80px;
`;
const InlineCss = {
  Input: {
    height: "50px",
    textAlign: "center",
    width: "80px",
    borderRadius: 5,
  },
};
