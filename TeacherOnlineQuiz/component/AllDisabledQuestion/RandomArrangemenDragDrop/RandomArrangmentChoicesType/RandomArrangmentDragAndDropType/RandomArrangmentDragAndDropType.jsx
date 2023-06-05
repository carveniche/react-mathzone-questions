import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import styled from "styled-components";
const elementFinds = (target, xyAxis, dropState) => {
  if (xyAxis[0] == undefined) return false;
  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);
  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      const [row, col] = elem?.getAttribute("id")?.split(" ").map(Number);
      if (!dropState[row][col].show) return elem?.getAttribute("id");
    }
    elem = elem.parentNode;
  }

  return false;
};
const elementFinds2 = (target, xyAxis,dragState) => {
  
  let elem = document?.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    
    if (elem?.className.includes(target)) {
      const index = Number(elem?.getAttribute("id"));
   
      if (!dragState[index].show) return index
    }
    elem = elem.parentNode;
 
  }
  
  return false;
};
const updateState = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  index,
  row,
  col
) => {
  targetState[row][col].dropVal = sourceState[index].val;
  targetState[row][col].show = true;
  // console.log(targetState[row][col])

  updateTargetState([...targetState]);
  sourceState[index] = { ...sourceState[index], show: false };
  
  updateSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  row,
  col,index
) => {
  // targetState.push(sourceState[row][col]?.val);
  targetState[index].val=sourceState[row][col].dropVal
  targetState[index].show=true
  sourceState[row][col].dropVal = "";
  sourceState[row][col].show = false;
   updateTargetState([...targetState]);
   updateSourceState([ ...sourceState ]);

};
export default function RandomArrangmentDragAndDropType({
  content,
  choices,
  inputRef,
  totalEmptyBox,
  totalRows,
  totalCols
}) {
  const hasAnswerSubmitted=true
  let currentIndex = 0;
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const currentDrag = useRef(-1);
  const [xyPosition, setXyPosition] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [isDropActive, setIsDropActive] = useState(false);
  useEffect(() => {
    let arr = [];


    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        let imageArray=[]
        let count=Number(item?.count)||0
        for(let i=0;i<count;i++)
        {
          imageArray?.push(item?.img)
        }
        let obj = { ...item, show: false, dropVal: "",imageArray:[...imageArray] };
        item.row == i && temp.push(obj);
      });
      arr.push(temp);
    }
    let temp = [];
    choices?.map((item) => {
      let obj = { show: true, val: item };
      temp.push({ ...obj });
    });
    setDropState([...arr]);
    setDragState([...temp]);
    
  },[] );
  
  const handleStop1 = (e, i) => {
    setIsDragActive(true);
    let x = e.clientX;
    let y = e.clientY;
    let temp = [...dragState];
    let position = [x, y];
    setXyPosition([...position]);
    setDragState([]);
    currentDrag.current = i;
    setDragState([...temp]);
  };
  useEffect(() => {

    if (xyPosition.length > 0 && isDragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppablehfu", xyPosition, dropState);
        if (val !== false) {
          const [row, col] = val.split(" ").map(Number);
          updateState(
            dropState,
            dragState,
            setDropState,
            setDragState,
            currentDrag.current,
            row,
            col
          );
        }
        clearTimeout(id);
        setXyPosition([]);
        setIsDragActive(false);
        currentDrag.current = -1;
      }, 0);
    }
   
  }, [xyPosition.length]);
  
useEffect(()=>{
  
  if (xyPosition.length>0 && isDropActive) {
    let id = setTimeout(() => {
      let val=elementFinds2("draggablehfu", xyPosition,dragState)
      if (val!==false) {
    
        updateState2(
          dragState,
          dropState,
          setDragState,
          setDropState,
          currentDrop.current[0],
          currentDrop.current[1],val
        );
      }
      clearTimeout(id);
      currentDrop.current = [-1, -1];
      setXyPosition([]);
      setIsDropActive(false);
    }, 0);
  }
},[isDropActive,xyPosition.length])


  const handleStop2 = (e, row, col) => {
    
    let x = e.clientX;
    let y = e.clientY;
    let position = [x, y];
  
    currentDrop.current = [row, col];
    setXyPosition([...position]);
    dropState[row][col].show = false;
    setDropState([ ...dropState] );
    setIsDropActive(true);
    dropState[row][col].show = true;
    setDropState([ ...dropState] );
  };
  inputRef.current=dropState
  const heightRef=useRef([])
  const [currentHeight,setCurrentHeight]=useState(0)
  const [currentWidth,setCurrentWidth]=useState(0)
  useEffect(()=>{
if(currentHeight==0){
  
      let divHeight=[]
      let divWidth=[]
let n=heightRef?.current?.length||0
for(let i=0;i<n;i++)
{
divHeight.push(heightRef?.current[i]?.offsetHeight)
divWidth.push(heightRef?.current[i]?.offsetWidth)
}
let maxHeight=Math.max(...divHeight)
let maxWidth=Math.max(...divWidth)
setCurrentWidth(maxWidth)
setCurrentHeight(maxHeight)
}  },[currentHeight])

  return (
    <>
      {dropState?.map((items, index) => (
        <FlexBox key={index} totalRows={Number(totalCols)}>
          {items?.map((item, i) =>
            item.isMissed === "false" ? (
             <FlexBox3 >
                <ImageBox>{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
                <div><b>{typeof item?.count=="string"?HtmlParser(item?.count):item?.count}</b></div>
             
             </FlexBox3>
            ) : (
            
              <FlexBox3>
               <ImageBox >{item.imageArray?.map((img,i)=><div>{HtmlParser(img)}</div>)}</ImageBox>
               <div>
               <Box
                bgColor={item.show}
                className="droppablehfu"
                id={`${index} ${i}`}
                value={item.count}
                key={i}
                
                // ref={(el) => {
                //   inputRef.current[currentIndex] = el;
                //   if (currentIndex < totalEmptyBox - 1)
                //     currentIndex = currentIndex + 1;
                // }}
              >
                {item.show && (
                  <Draggable onStop={(e) => handleStop2(e, index, i)} disabled={hasAnswerSubmitted}>
                    <div>{typeof item.dropVal=="string"?HtmlParser(item?.dropVal):item?.dropVal}</div>
                  </Draggable>
                )}
              </Box>
               </div>
              
              </FlexBox3>
            )
          )}
        </FlexBox>
      ))}
      <FlexBox2>
        {dragState?.map((items, i) => (
          <Box id={`${i}`} className="draggablehfu" bgColor={items.show} ref={(el)=>heightRef.current[i]=el}>
            {items.show && (
              <Draggable onStop={(e) => handleStop1(e, i)} disabled={hasAnswerSubmitted}>
                <div>{typeof items.val=="string"?HtmlParser(items?.val):items?.val}</div>
              </Draggable>
            )}
          </Box>
        ))}
      </FlexBox2>
    </>
  );
}

export const FlexBox = styled.div`
display: flex;
width:70%;
gap:4rem;

> div{
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
 
`;
const Box = styled.div`
  min-height: 50px;
  height: auto;
  width: auto;
  text-align: center;
  min-width: ${props=>!props.bgColor?96:80}px;
 
  border: ${(props) => (props.bgColor ? "0" : "1")}px solid black;
  > div {
    background-color: ${(props) => (props.bgColor ? "indigo" : "initial")};
    min-width: inherit;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    padding:1rem;
  }
`;

const FlexBox2 = styled.div`
  display: flex;
  margin-top: 2rem;
  //justify-content:center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FlexBox3=styled.div`
width:auto;

margin:1rem 0;
display:flex;
gap:2rem;
flex-direction:column;
justify-content:space-between;
> div{
 
 width:auto;
 justify-content:center;
}
> div{
  display:flex;
  

  
}
`
const ImageBox=styled.div`
display:flex;
gap:1rem;
flex-wrap:wrap;

`