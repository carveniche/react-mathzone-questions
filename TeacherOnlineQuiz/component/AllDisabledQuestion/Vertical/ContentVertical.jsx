import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import HtmlParser from "react-html-parser";
export default function ContentVertical({
  content,
  totalRows,
  totalCols,
  hasAnswerSubmitted,
  totalEmptyBox,
  inputRef,
}) {
  let array2D = new Array(Number(totalRows) || 0);
  let temp = new Array(totalCols);
  for (let i = 0; i < array2D?.length; i++) {
    array2D[i] = [...temp];
  }
  let focusRef = useRef([...array2D]);

  const [state, setState] = useState({});

  const handleChange = (e, rows, cols) => {
    
    let str = "" + rows + cols;
    state[str] = e.target.value;
    setState({...state})
    if (!String(state[str]).trim()) {
      return;
    }

    let temp = focusRef?.current;
    let n = temp?.length || 0;
    let m=temp[0]?.length||0
    for(let j=cols;j>-1;j--)
    {
      let x=rows+1
      if(j!=cols)
      x=0
      for(let i=x;i<n;i++)
      {
        console.log(i,)
        if(temp[i][j]!==undefined)
        {
          console.log(i,j)
          temp[i][j]?.children[0]?.focus();
          return
        }
      }
    }
  };
  let currentIndex = 0;
  useEffect(() => {
    firstTimeFocus();
  }, []);
  const firstTimeFocus = () => {
    let temp=focusRef?.current
    let n=focusRef.current?.length||0;
    let m=focusRef.current[0]?.length||0
    for(let j=m-1;j>0;j--)
    {
      for(let i=0;i<n;i++)
      {
      if(temp[i][j]!==undefined)
      {
        temp[i][j]?.children[0]?.focus();
        return
      }
      }
    }
  };

  return (
    <div>
      <div style={{ marginTop: "4rem" }}>
        {content?.map((items, index) => (
          <FlexBox
            key={index}
            border={index === totalRows - 1 && "2px"}
            totalWidth={totalCols}
          >
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <div key={i} value={item.value}>
                  {typeof item.value=="string"?HtmlParser(item?.value):item?.value}
                </div>
              ) : (
                <div
                  value={item.value}
                  key={i}
                  ref={(el) => {
                    focusRef.current[index][i] = el;
                    inputRef.current[currentIndex] = el;
                    if (currentIndex < totalEmptyBox - 1)
                      currentIndex = currentIndex + 1;
                  }}
                >
                  <Input
                    value={state[`${index}${i}`] ? state[`${index}${i}`] : ""}
                    onChange={(e) => {
                      handleChange(e, index, i);
                    }}
                    maxLength={1}
                    disabled={hasAnswerSubmitted}
                  />
                </div>
              )
            )}
          </FlexBox>
        ))}
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  border-top: ${(props) => (props.border ? props.border : 0)} solid black;
  width: ${(props) => props.totalWidth * 35}px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
  }
`;
const Input = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
`;
