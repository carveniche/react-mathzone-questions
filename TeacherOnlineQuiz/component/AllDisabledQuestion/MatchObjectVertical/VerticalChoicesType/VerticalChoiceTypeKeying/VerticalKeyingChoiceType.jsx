import React, { useEffect, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
export default function VerticalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  totalEmptyBox,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const handleChange = (e, rows, cols) => {
    row[rows][cols].dropVal = e.target.value;
    if (row[rows][cols].dropVal == "") {
      row[rows][cols].show = false;
    } else row[rows][cols].show = true;
    setRow([...row]);
  };

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
  inputRef.current = row;

  return row?.map((items, index) => (
    <div key={index}>
      {items?.map((item, i) =>
        item.isMissed === "false" ? (
          <FlexBox3>
            <div>{HtmlParser(item?.imgvalue)}</div>
            <div>{typeof item?.numvalue=="string"?HtmlParser(item?.numvalue):item}</div>
          </FlexBox3>
        ) : (
          <FlexBox3>
            <div>{HtmlParser(item.imgvalue)}</div>
            <div>
              <div>
                {
                  <Input
                    value={row[index][i]?.dropVal}
                    onChange={(e) => {
                      handleChange(e, index, i);
                    }}
                    disabled={hasAnswerSubmitted}
                  />
                }
              </div>
            </div>
          </FlexBox3>
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
const FlexBox3 = styled.div`
  width: 80%;
  margin: 1rem 0;
  display: flex;
  column-gap:4rem;
  row-gap:1rem;
  align-items: center;
  flex-wrap:wrap;
  > div {
   
    min-width: 90px;
    width: auto;
    font-weight:600;
  }
  > div {
    display: flex;
    justify-content: left;
  }
`;
