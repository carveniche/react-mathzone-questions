import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "../../../OnlineQuiz.module.css";
export default function DisabledDropBoxes({
  content,
  totalRows,
  state,
  isAnswerSubmitted,
  totalCols
}) {
  let [rows, setRows] = useState([])
  const [dragState, setDragState] = useState([])
  useEffect(() => {
    let rows = []
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content.map((item, ind) => String(item.row) == String(i) && temp.push({ ...item, show: false, dropValue: '' }));
      rows.push(temp);
    }
    let arr = []
    state?.choices.map((item) => arr.push({ show: true, value: item.value }))
    setDragState(arr)
    setRows(rows)
  }, [])
  return (
    <div >
      <div>
        {/* drop field */}
        {rows?.map((items, i) => (
          <FlexBox2 key={i} totalCols={totalCols}>
            {items?.map((item, index) =>
              item.isMissed === "false" ? (
                <div
                  key={index}
                  name={item.isMissed}
                  
                >
                  {item.value}
                </div>
              ) : isAnswerSubmitted ?
                (
                  item?.show ? 
                  <Draggable disabled>
                    <div
                    style={{ background: "indigo",color:"white",cursor:'pointer' }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    id="missedBox"

                  >
                     {item?.dropValue}
                      
                        
                     
                  </div> 
                  </Draggable>:
                    <div
                      style={{ border: "1px solid indigo" }}
                      value={item?.value}
                      name={item.isMissed}
                      key={index}
                      id="missedBox"
                    >
                    </div>
                ) :
                (
                  item?.show ? <div
                    style={{ background: "indigo",color:'white' }}
                    value={item?.value}
                    name={item.isMissed}
                    key={index}
                    id="missedBox"

                  >
                    
                        {item?.dropValue}
                      
                    
                  </div> :
                    <div
                      style={{ border: "1px solid indigo" }}
                      value={item?.value}
                      name={item.isMissed}
                      key={index}
                      id="missedBox"
                    >
                    </div>
                )
            )}
          </FlexBox2>
        ))}
        <FlexBox
          
        >
        {/* drag field */}
          {state.choices.map((items, i) => (
            isAnswerSubmitted ? dragState[i]?.show ?  <Draggable disabled>
                <div key={i} className={styles.bgIndigo} style={{cursor:'pointer'}}>
                  {dragState[i]?.value}
                </div>
              </Draggable>
              
            : <div key={i} >
              
            </div> : dragState[i]?.show ? 
                <div key={i} className={styles.bgIndigo}>
                  {dragState[i]?.value}
                </div>

              
             : <div key={i} ></div>
          ))}
        </FlexBox>
      </div>
    </div>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 1rem;
  flex-wrap:wrap;

  > div {
  min-width:94px;
  min-height:50px;
  width:auto;
  max-width:50%;
  height:auto;
  word-break: break-word;
  padding:10px;
    border-radius: 10px;
    flex-wrap:wrap;
    border:1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    border: ${(props) => props.border};
  }
`;
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0.2rem;
  gap: 0.6rem;
  flex-wrap:wrap;

  > div {
    min-width:64px;
    padding:10px;
    width:auto;
    min-height:50px;
    height:auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    border: ${(props) => props.border};
  }
  > #missedBox{
  min-width:120px;
    padding:10px;
    width:auto;
    min-height:50px;
    height:auto;
  }
`;
