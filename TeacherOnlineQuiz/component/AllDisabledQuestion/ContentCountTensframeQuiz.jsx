import React from 'react';
import { useEffect, useState } from "react";
import HtmlParser from 'react-html-parser';
import styled from "styled-components"
function DisplayImageCard({ images, indexs,className,totalImage,setImageLoaded }) {
  const [state, setState] = useState();
  useEffect(() => {
    let id = setTimeout(() => {
      
      setState(images);
      if(totalImage-1===indexs)
      setImageLoaded(true)
    }, 1000 * indexs);
    return () => clearTimeout(id);
  }, []);
  return <div className={className}>{state}</div>;
}

function ContentCountTensframeQuiz({ content, totalRows,setImageLoaded }) {
  let rows = [];
  let totalImage=content.length

  for (let i = 1; i <= totalRows; i++) {
    let temp = [];
    content.map((item) => item.row === i && temp.push(HtmlParser(item.image)));
    rows.push(temp);
  }
  let totalColumns = rows[0]?.length;
  

  return (
    <Grid column={totalColumns}>
      {
        content.map((item, index) => (
          <DisplayImageCard
            key={index}
            images={HtmlParser(item.image)}
            indexs={index}
            className={index < totalColumns ? "upper-border" : "lower-border"}
            totalImage={totalImage} setImageLoaded={setImageLoaded}
          />
        ))
      }
    </Grid>
  );
}
export default ContentCountTensframeQuiz;

const Grid = styled.div`
  display: grid;
  margin: 20px 0;
  border: 1px solid black;
  width: 80%;
  height:auto;
  grid-template-columns: repeat(${(props) => props.column}, 1fr);
  text-align: center;
  > div {
    border: 1px solid black;
   
    border-top: 0px;
    width:auto;
    
    height:60px;
    max-width:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    

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
