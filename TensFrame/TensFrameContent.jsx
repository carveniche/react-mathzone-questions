import React from "react"
import styled from "styled-components"
import {useRef} from "react";
import styles from "./../OnlineQuiz.module.css"
function DisplayImageCard({className,images}) { 
    return <div className={`${className??""} tensframe-image-container`}>
        {images}
        </div>;
  }

export default function TensframeContent({totalColumns,images,currentIndex})
{
    let  boxesArray=new Array(10).fill('')
for(let i=0;i<10;i++)
{
    if(i<currentIndex)
    boxesArray[i]=images
   
}
    return <Grid column={totalColumns} className={styles.TensframeContentGrid} style={{
      gridTemplateColumns: `repeat(${totalColumns}, 1fr)`
    }}>
        {boxesArray.map((el,index)=><DisplayImageCard  key={index} className={index < totalColumns ? styles.upperBorder : styles.lowerBorder} images={el} />)}
        </Grid>
}







// import React from 'react';
// import { useEffect, useState } from "react";
// import HtmlParser from "react-html-parser";

// function DisplayImageCard({ images, indexs,className,totalImage,setImageLoaded }) {
//   const [state, setState] = useState();
//   useEffect(() => {
//     let id = setTimeout(() => {
      
//       setState(images);
//       if(totalImage-1===indexs)
//       setImageLoaded(true)
//     }, 1000 * indexs);
//     return () => clearTimeout(id);
//   }, []);
//   return <div className={className}>{state}</div>;
// }

// function ContentCountTensframeQuiz({ content, totalRows,setImageLoaded }) {
//   let rows = [];
//   let totalImage=content.length

//   for (let i = 1; i <= totalRows; i++) {
//     let temp = [];
//     content.map((item) => item.row === i && temp.push(HtmlParser(item.image)));
//     rows.push(temp);
//   }
//   let totalColumns = rows[0]?.length;
  

//   return (

//       {
//         content.map((item, index) => (
//           <DisplayImageCard
//             key={index}
//             images={HtmlParser(item.image)}
//             indexs={index}
//            
//             totalImage={totalImage} setImageLoaded={setImageLoaded}
//           />
//         ))
//       }

//   );
// }
// export default ContentCountTensframeQuiz;

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
