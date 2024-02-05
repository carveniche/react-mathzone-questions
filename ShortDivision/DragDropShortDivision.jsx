import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../CommonFunction/useScrollBar";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../OnlineQuiz.module.css";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";

export default function ShortDivisionDragAndDropType({
  content,
  choices,
  inputRef,
}) {

  const { hasAnswerSubmitted, isStudentAnswerResponse } =
    useContext(ValidationContext);
  const [dropState, setDropState] = useState([]);
  const [dragState, setDragState] = useState([]);
  const [handleDrag, handleDragStart] = useScrollBar();
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);

  // const [redropState, setRedropState] = useState([]);



  useEffect(() => {
    let arr = [];

    arr = Object.assign([], content);
    
    arr = arr.map((item) => {
      return item?.map((items) => {
        return { ...items, show: false,};
      });
      
    });
    console.log(content,"content")

    let temp = [];
   
    choices?.map((item) => {
      
      let obj = { show: true, val: item };
      temp.push({ ...obj });
     
    });



    droppableContainerRef.current = [...Array(arr.length)].map((item) =>
      Array(arr[0].length)
    );
    setDropState([...arr]);
    setDragState([...temp]);
    // console.log( droppableContainerRef.current," droppableContainerRef.current",dropState)
  }, []);



  const handleStop1 = (e, i) => {
   
    let [x, y] = dragdropPointCordinate(e);
    const [row, col] = validateCoordiante(droppableContainerRef.current, {
      x,
      y,
    });

    console.log(x,y,row,col)
    if (
      row > -1 &&
      col > -1 &&
      dropState[row][col].isMissed === "true" &&
      !dropState[row][col].show
    ){
      dropState[row][col].dropVal = dragState[i]?.val || "";
      dragState[i].show = false;
      dropState[row][col].show = true;
      
      setDragState([...dragState]);
      setDropState([...dropState]);
    }else if(    row > -1 &&
      col > -1 &&
      dropState[row][col].re_isMissed === "true" &&
      !dropState[row][col].show) {

        dropState[row][col].re_dropVal = dragState[i]?.val || "";
        dragState[i].show = false;
        dropState[row][col].show = true;
        
        setDragState([...dragState]);
        setDropState([...dropState]);

    } else {
      
      setDragKey(Number(!dragKey));
    }
  };
const rehandleStop2 =(e, row, col)=>{
  let value = dropState[row][col].re_dropVal;
  dropState[row][col].re_dropVal = "";
  for (let item of dragState) {
    if (!item?.show) {
      item.show = true;
      item.val = value;
      break;
    }
  }
  dropState[row][col].show = false;
  setDropState([...dropState]);
  setDragState([...dragState]);
};
  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col].dropVal;
    dropState[row][col].dropVal = "";
    for (let item of dragState) {
      if (!item?.show) {
        item.show = true;
        item.val = value;
        break;
      }
    }
    dropState[row][col].show = false;
    setDropState([...dropState]);
    setDragState([...dragState]);
  };
  inputRef.current = dropState;
  const heightRef = useRef([]);

  return (
    <>
      <div>
    
        <table
          style={{ borderCollapse: "collapse" }}
          className={styles.longDivisonTable}
        >
          <tbody>
            {dropState?.map((items, index) => {
              if(index !==2){
            return(
                <tr key={index} className={content.length > 2?(index==1?`${styles.row_1}`:''):''}
                >
                
                {items?.map((item, i) =>
                
                  item.isMissed !== "true" ? (
                    <td style={{width:'40px',height:'40px'}}
                      key={i}
                      ref={(el) =>
                        (droppableContainerRef.current[index][i] = {
                          el,
                          isMissed: item.isMissed === "true",
                          show: item?.show,
                        })
                      }
                    >
                      <div data-value={`rowssssssssss-${i}`}>
                        <b>
                          <HtmlParserComponent value={item?.value} />
                        </b>
                      </div>
                      {index % 2 == 0 && (
                        <>
                          <BottomBorder
                            width={i == 0 ? "0px" : "100%"}
                          ></BottomBorder>
                        </>
                      )}
                   
                      {index == 1 && i == 0 && (
                        <>
                        <RightPranthesis transform={content.length > 2 ? 'scale(1.4, 5.02)' : 'scale(1.4, 2.65)'}
                           style={{top:content.length > 2 ?'-16px':'9px'}}>

                          |
                        </RightPranthesis>
                            {/* <p style={content.length>2?StraightPranthesis:StraightPranthesisSmall}></p> */}
                        </>
                      )}
                    </td>
                  ) : (
                    <td key={i}>
                      <div
                        className={`droppablehfu ${styles.LongDivisonDragDropBox}`}
                        style={{
                          border: `${
                            item.show || isStudentAnswerResponse ? 0 : 1
                          }px dashed indigo`,
                          minWidth: 40,
                          minHeight: 40,
                        }}
                        id={`${index} ${i}`}
                        value={item.value}
                        ref={(el) =>
                          (droppableContainerRef.current[index][i] = {
                            el,
                            isMissed: item.isMissed === "true",
                            show: item?.show,
                          })
                        }
                      >
                        {(item.show || isStudentAnswerResponse) && (
                          <Draggable
                            onStop={(e) => handleStop2(e, index, i)}
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
                            onDrag={handleDrag}
                            onStart={handleDragStart}
                          >
                            <div
                              style={{
                                backgroundColor: `${
                                  item.show || isStudentAnswerResponse
                                    ? "indigo"
                                    : "initial"
                                }`,
                              }}
                            >
                              {
                                <HtmlParserComponent
                                  value={
                                    isStudentAnswerResponse
                                      ? item[student_answer]
                                      : item?.dropVal
                                  }
                                />
                              }
                            </div>
                          </Draggable>
                        )}
                      </div>
                      {index % 2 == 0 && (
                        <>
                          <BottomBorder
                            width={i == 0 ? "0px" : "100%"}
                          ></BottomBorder>
                        </>
                      )}
                     
                      {index == 1 && i == 0 && (
                        <>
                            <RightPranthesis transform={content.length > 2 ? 'scale(1.4, 5.02)' : 'scale(1.4, 2.65)'}
                           style={{top:content.length > 2 ?'-16px':'9px'}}>|</RightPranthesis>

                             {/* <p style={content.length>2?StraightPranthesis:StraightPranthesisSmall}></p> */}
                        </>
                      )}
                    </td>
                  )
                )}



              </tr>
            )
              }else{
                return (
                <tr key={index} className={`${styles.row_2}`}>
                
                {items?.map((item, i) =>
                
                  item.re_isMissed !== "true" ? (
                    <td
                      key={i}
                      ref={(el) =>
                        (droppableContainerRef.current[index][i] = {
                          el,
                          isMissed: item.re_isMissed === "true",
                          show: item?.show,
                        })
                      }
                      style={{width:'40px',height:'40px'}}
                    >
                      <div data-value={`rowssssssssss-${i}`}>
                        <b>
                          <HtmlParserComponent value={item?.re_value} />
                        </b>
                      </div>
                    
                    </td>
                  ) : (
                    <td key={i}>
                      <div
                        className={`droppablehfu ${styles.LongDivisonDragDropBox}`}
                        style={{
                          border: `${
                            item.show || isStudentAnswerResponse ? 0 : 1
                          }px dashed indigo`,
                          minWidth: 40,
                          minHeight: 40,
                        }}
                        id={`${index} ${i}`}
                        value={item.re_value}
                        ref={(el) =>
                          (droppableContainerRef.current[index][i] = {
                            el,
                            isMissed: item.re_isMissed === "true",
                            show: item?.show,
                          })
                        }
                      >
                        {(item.show || isStudentAnswerResponse) && (
                          <Draggable
                            onStop={(e) => rehandleStop2(e, index, i)}
                            disabled={
                              hasAnswerSubmitted || isStudentAnswerResponse
                            }
                            onDrag={handleDrag}
                            onStart={handleDragStart}
                          >
                            <div
                              style={{
                                backgroundColor: `${
                                  item.show || isStudentAnswerResponse
                                    ? "indigo"
                                    : "initial"
                                }`,
                              }}
                            >
                              {
                                <HtmlParserComponent
                                  value={
                                    isStudentAnswerResponse
                                      ? item[student_answer]
                                      : item?.re_dropVal
                                  }
                                />
                              }
                            </div>
                          </Draggable>
                        )}
                      </div>
                    
                    </td>
                  )
                )}



              </tr>
                )
              }
              
                      })}
          </tbody>
        </table>
      </div>
      
     
     
     




      <div
        className={styles.LongDivisonDragDropFlexBox2}
        key={`drag_key${dragKey}`} 
      >
        {dragState?.map((items, i) => (
          <div
            id={`${i}`}
            className={`draggablehfu ${styles.LongDivisonDragDropBox}`}
            ref={(el) => (heightRef.current[i] = el)}
            style={{
              border: `${items.show ? 0 : 1}px dashed black`,
              minWidth: 40,
              minHeight: 40,
            }}
            key={i}
          >
            {items.show && (
              <Draggable
                onStop={(e) => handleStop1(e, i)}
                disabled={hasAnswerSubmitted || isStudentAnswerResponse}
                onDrag={handleDrag}
                onStart={handleDragStart}
              >
                <div
                  style={{
                    backgroundColor: `${items.show ? "indigo" : "initial"}`,
                    minWidth: 40,
                    minHeight: 40,
                  }}
                >
                  <HtmlParserComponent value={items?.val} />
                </div>
              </Draggable>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export const RightPranthesis = styled.div`
  position: absolute;
  top: 4px;
  transform: ${(props) => props.transform ?? 'scale(1.5, 2.65)'};
  right: -1px;
  color: indigo;
`;
export const TopBorder = styled.div`
  position: absolute;
  width: ${(props) => props.width ?? "100px"};
  top: -3px;
  height: 3px;
  right: 0;
  background: indigo;
`;
export const BottomBorder = styled.div`
  position: absolute;
  width: ${(props) => props.width ?? "100px"};
  bottom: -3px;
  height: 3px;
  right: 0;
  background: indigo;
`;
// const StraightPranthesis={
//   background: 'indigo',
//   position: 'absolute',
//   height: '70px',
//   width: '2px',
//   top: '-43px',
//   right: '-2px',
//   scale:'1.4',
// }

// const StraightPranthesisSmall={
//   background: 'indigo',
//   position: 'absolute',
//   height: '46px',
//   width: '2px',
//   top: '-8px',
//   right: '-2px',
//   scale:'1.4',
// }