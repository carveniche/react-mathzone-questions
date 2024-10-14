import shuffle from "shuffle-array";
import React, { useRef, useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";
import {
  EditableMathField,
  StaticMathField,
} from "../../../../../ExternalPackages";
import { ProgressBorder } from "../../../../../Modal2/modal2";

const ifElementFind = (target, xyAxis) => {
  if (xyAxis[0] == undefined) return;
  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target))
      return Number(elem?.getAttribute("id"));
    elem = elem.parentNode;
  }

  return false;
};
const collectTextInputField = () => {
  let parent = document.getElementById("orcTextParent");
  if (!parent) {
    return;
  }

  let inputBoxes = parent.querySelectorAll("input");

  for (let input of inputBoxes) {
    if (input.value == "") {
      alert("please fill all the field");
      return false;
    }
  }
  let temp = [];
  for (let input of inputBoxes) {
    temp.push(input.value);
  }
  return temp;
};
const ifElementFind2 = (target, xyAxis) => {
  if (xyAxis[0]) return;
  let elem = document.elementFromPoint(xyAxis[0], xyAxis[1]);

  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.getAttribute("id").includes(target)) return true;
    elem = elem.parentNode;
  }
  return false;
};
const updateState1 = (
  targetState,
  sourceState,
  setTargetState,
  setSourceState,
  index,
  val
) => {
  targetState[val].push(sourceState[index]);
  setTargetState([...targetState]);
  sourceState = sourceState.filter((item) => sourceState[index] != item);
  setSourceState([...sourceState]);
};
const updateState2 = (
  targetState,
  sourceState,
  setTargetState,
  setSourceState,
  index
) => {
  targetState.push(sourceState[index[0]][index[1]]);
  setTargetState([...targetState]);

  let temp = [];
  for (let i = 0; i < sourceState[index[0]].length; i++) {
    if (sourceState[index[0]][i] != sourceState[index[0]][index[1]])
      temp.push(sourceState[index[0]][i]);
  }
  sourceState[index[0]] = [...temp];
  let arr2d = [];
  for (let i = 0; i < sourceState.length; i++) {
    let temp = sourceState[i].map((item) => item);
    arr2d.push(temp);
  }

  setSourceState([...arr2d]);
};
const refreshPageLoad = (parent, setInputText) => {
  let inputBoxes = parent?.querySelectorAll("input");
  if (!parent) return;
  let temp = [];
  for (let inputs of inputBoxes) {
    temp.push(inputs.value);
    inputs.value = "";
  }
  setInputText([...temp]);
};

const compareArrayText = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    let item1 = arr1[i];
    let item2 = arr2[i];
    if (item1 != item2) return false;
  }
  return true;
};
function ORC({ obj, question_text, meter }) {
  let [dragState, setDragState] = useState([]);
  meter = Number(meter) || 0;
  const [xyAxis, setXyAxis] = useState([]);
  let [dropState, setDropState] = useState([]);
  const currentDrop = useRef([-1, -1]);
  const [dragActive, setDragActive] = useState(false);
  const [dropActive, setDropActive] = useState(false);

  useEffect(() => {
    let temp = [];
    obj?.orc_oprc_data[0]?.response?.map((items) =>
      items.map((item) => temp.push(item))
    );

    temp = shuffle(temp);
    setDragState([...temp]);
    temp = [];
    obj?.orc_oprc_data[0]?.column_headers?.map((item) => temp.push([]));
    setDropState([...temp]);
  }, []);
  const draggableRef = useRef();
  const handleStop1 = (e, i) => {
    let x = e.clientX;
    let y = e.clientY;

    setDragActive(true);
    currentDrag.current = i;
    let temp = [...dragState];
    let position = [x, y];
    setXyAxis([...position]);
    setDragState([]);
    setDragState([...temp]);
  };
  const currentDrag = useRef(-1);
  const droppableRef = useRef([]);
  const handleStop2 = (e, row, col) => {
    setDropActive(true);
    let x = e.clientX;
    let y = e.clientY;
    let position = [x, y];
    setXyAxis([...position]);
    currentDrop.current = [row, col];
    setDropState([[]]);
    setDropState([...dropState]);
  };
  useEffect(() => {
    var id;
    if (xyAxis.length > 0 && dragActive) {
      id = setTimeout(() => {
        let val = ifElementFind("droppableOrc", xyAxis);
        if (val !== false) {
          updateState1(
            dropState,
            dragState,
            setDropState,
            setDragState,
            currentDrag.current,
            val
          );
        }

        clearTimeout(id);
        currentDrag.current = -1;
      }, 0);
      setDragActive(false);
      setXyAxis([]);
    }
  }, [xyAxis.length]);
  const [value, setValue] = useState({});
  let currentIndex = 0;
  const handleChange = (e, i) => {
    setValueState(e.latex(), i);
  };
  const handleFocus = (e, y) => {
    setCurrentVirtualKeyBoard(y);
  };
  const [refresh, setRefresh] = useState(true);
  const inputRef = useRef([]);
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            let y = currentIndex;
            currentIndex = currentIndex + 1;
            return (
              <div
                ref={(el) => (inputRef.current[y] = el)}
                style={{
                  display: "inline-block",
                  height: "fit-content",
                  width: "fit-content",
                  position: "relative",
                }}
                onFocus={(e) => handleFocus(e, y)}
              >
                <EditableMathField
                  latex={value[y] ? value[y] : ""}
                  onChange={(e) => handleChange(e, y)}
                />
              </div>
            );
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };
  const calcRef = useRef([]);
  const ref = useRef([]);

  useEffect(() => {
    var id;
    if (xyAxis.length > 0 && dropActive) {
      id = setTimeout(() => {
        let val = ifElementFind2("draggableOrc", xyAxis);
        if (val !== false) {
          updateState2(
            dragState,
            dropState,
            setDragState,
            setDropState,
            currentDrop.current
          );
        }
        currentDrop.current = [-1, -1];
        setDropActive(false);
        setXyAxis(0);
        clearTimeout(id);
      }, 0);
    }
  }, [xyAxis.length]);
  const [inputText, setInputText] = useState([]);
  useEffect(() => {
    let parent = document.getElementById("orcTextParent");
    if (parent) refreshPageLoad(parent, setInputText);
    setRefresh(false);
  }, []);
  const [currentVirtualKeyBoard, setCurrentVirtualKeyBoard] = useState(-1);
  const handleClose = () => {
    setCurrentVirtualKeyBoard(-1);
  };
  useEffect(() => {
    let xPosition = 0;
    let yPosition = 0;

    if (currentVirtualKeyBoard > -1) {
      if (
        inputRef.current[currentVirtualKeyBoard].getBoundingClientRect().left -
          calcRef.current.clientWidth -
          16 >
        -1
      ) {
        xPosition =
          inputRef.current[currentVirtualKeyBoard].getBoundingClientRect()
            .left -
          calcRef.current.clientWidth -
          16;
      }
      if (
        inputRef.current[currentVirtualKeyBoard].getBoundingClientRect().top -
          calcRef.current.clientHeight -
          21 >
        -1
      ) {
        yPosition =
          inputRef.current[currentVirtualKeyBoard].getBoundingClientRect().top -
          calcRef.current.clientHeight -
          21;
      } else {
        yPosition =
          inputRef.current[currentVirtualKeyBoard].getBoundingClientRect()
            .bottom;
      }

      calcRef.current.style = `left:${xPosition}px; top:${yPosition}px`;
    }
  }, [currentVirtualKeyBoard]);
  let hasAnswerSubmiited = true;

  const handlClick = (i) => {
    if (currentVirtualKeyBoard > -1) {
      inputRef?.current[
        currentVirtualKeyBoard
      ]?.children[0]?.children[0]?.children[0]?.focus();
      let tempText = value[currentVirtualKeyBoard]
        ? value[currentVirtualKeyBoard] + ref.current[i].title
        : ref.current[i].title;
      setValueState(tempText, currentVirtualKeyBoard);
    }
  };
  const setValueState = (text, i) => {
    value[i] = text;
    setValue({ ...value });
  };
  return (
    <div className={styles.MainApp}>
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {parse(question_text, optionSelect)}
        </div>
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <>
            {obj?.orc_oprc_data[0]?.column_headers &&
              obj?.orc_oprc_data[0]?.column_headers?.length > 0 && (
                <Grid totalCols={obj?.orc_oprc_data[0]?.column_headers?.length}>
                  {obj?.orc_oprc_data[0]?.column_headers?.map((item, i) => (
                    <div key={i} className="flexbox">
                      {parse(item, optionSelect)}
                    </div>
                  ))}
                  {dropState?.map((items, i) => (
                    <DivBox
                      className="droppableOrc"
                      id={i}
                      ref={(el) => (droppableRef.current[i] = el)}
                      style={{ paddingBottom: "6rem" }}
                    >
                      {items?.map((item, index) => (
                        <Draggable
                          onStop={(e) => handleStop2(e, i, index)}
                          defaultPosition={{ x: 0, y: 0 }}
                          axis="both"
                          disabled={hasAnswerSubmiited}
                        >
                          <div style={{ cursor: "pointer" }}>
                            {parse(item, optionSelect)}
                          </div>
                        </Draggable>
                      ))}
                    </DivBox>
                  ))}
                </Grid>
              )}
            {
              <DivBox2 id="draggableOrc" ref={draggableRef}>
                {dragState?.map((items, i) => (
                  <Draggable
                    handle=".handle"
                    onStop={(e) => handleStop1(e, i)}
                    defaultPosition={{ x: 0, y: 0 }}
                    axis="both"
                    disabled={hasAnswerSubmiited}
                  >
                    <div style={{ cursor: "pointer" }} className="handle">
                      {parse(items, optionSelect)}
                    </div>
                  </Draggable>
                ))}
              </DivBox2>
            }
          </>
          {obj?.text && (
            <TextBox id="orcTextParent">
              {refresh ? parse(obj?.text) : parse(obj?.text, optionSelect)}
            </TextBox>
          )}
        </div>
      </div>
      {/* virtual Keyboard */}
      {currentVirtualKeyBoard > -1 && (
        <div
          id={styles.mathToolbarContainer}
          className="ui-draggable mathquill-rendered-math mathquill-rendered-math_position"
          style={{ zIndex: 999950 }}
          ref={calcRef}
        >
          <div className="tooltip-wrapper">
            <div className="tooltip-top-bar" id={styles.tooltipTopBar}>
              <span className="tooltip-handle">&nbsp;</span>
              <span
                className={styles.tooltipClose}
                onClick={(e) => handleClose()}
              >
                X&nbsp;
              </span>
            </div>
            <div id={styles.mathToolbar}>
              <div
                className="btn mathsign fractions_cls"
                title="\frac{ }{ }"
                onClick={() => handlClick(0)}
                ref={(el) => (ref.current[0] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="fraction" /> */}
                frac
              </div>
              <div
                className="btn mathsign"
                title="\cdot"
                onClick={() => handlClick(1)}
                ref={(el) => (ref.current[1] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="dot" /> */}
                cdot
              </div>
              <div
                className="btn mathsign"
                title="\div"
                onClick={() => handlClick(2)}
                ref={(el) => (ref.current[2] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="divide" /> */}
                dvd
              </div>
              <div
                className="btn mathsign"
                title="\times"
                onClick={() => handlClick(3)}
                ref={(el) => (ref.current[3] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="multiply" /> */}
                tms
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="\sqrt{}"
                onClick={() => handlClick(4)}
                ref={(el) => (ref.current[4] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="sqroot" /> */}
                srt
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="^{ }"
                ref={(el) => (ref.current[5] = el)}
                onClick={() => handlClick(5)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="exponent" /> */}
                exp
              </div>
              <div
                className="btn mathsign"
                title="\le"
                onClick={() => handlClick(6)}
                ref={(el) => (ref.current[6] = el)}
              >
                {/* <img
          src="/assets/new_home/mathquill_p.gif"
          className="lessthanequal"
        /> */}
                Lte
              </div>
              <div
                className="btn mathsign"
                title="\ge"
                onClick={() => handlClick(7)}
                ref={(el) => (ref.current[7] = el)}
              >
                {/* <img
          src="/assets/new_home/mathquill_p.gif"
          className="greaterthanequal"
        /> */}
                Gte
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="\left|\right|"
                onClick={() => handlClick(8)}
                ref={(el) => (ref.current[8] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="absolute" /> */}
                Abs
              </div>
              <div
                className="btn mathsign"
                title="\prod"
                onClick={() => handlClick(9)}
                ref={(el) => (ref.current[9] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="pi" /> */}
                PI
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="\nthroot{}{}"
                onClick={() => handlClick(10)}
                ref={(el) => (ref.current[10] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="nthroot" /> */}
                Ntr
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="_{ }"
                onClick={() => handlClick(11)}
                ref={(el) => (ref.current[11] = el)}
              >
                {/* <img src="/assets/new_home/mathquill_p.gif" className="xbase" /> */}
                Xbs
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ORC;

export const Grid = styled.div`
  display: Grid;
  width:80%;
  min-width:100px;
  margin: 2rem;

  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
 
  height:auto;
  > div:nth-child(even) {
    border: 1px solid black;
  
  }
  > div {
    
    border: 1px solid black;
    display: flex;
    padding:1rem;
  
    padding
    justify-content: center;
    align-items: center;
    word-break:break;
  }
  > div:nth-child(${(props) => props.totalCols + 1}) {
    min-height: 100px;

    height: auto;
  }
  > div > div{
      display:flex;
      justify-content: center;
    align-items: center;
  }
  > .flexbox{
    display:flex;
    justify-content:center;
    font-weight:bold;
  }
`;

export const DivBox = styled.div`
    display: flex;
    gap: 0.4rem;
  postion:relative;
    flex-wrap: wrap;
    z-index:4;
    
  height:auto;
    > div {

      margin: 0 0.21rem;
      border: 1px solid black;
      padding:5px;
      min-height: 30px;
     min-width: 30px;
     widht:auto;
     height:auto
     display:flex;
     
     justify-content: center;
     align-items: center;
    }
  `;
export const DivBox2 = styled.div`
  width: calc(100% - 2rem);

  position: relative;

  min-height: 80px;
  z-index: 5;
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 2rem;

  height: auto;
  border: 1px solid black;
  margin-bottom: 1rem;
  > div {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
  }
  * .react-draggable react-draggable-dragged {
    transform: translate(0, 0);
  }
`;
export const TextBox = styled.div`
  width: 92%;
  margin: 1rem auto;
`;

// {showExplation&&<button onClick={handleExplation} className={styles.checkButton3}>Hide Details</button>}
// {showExplation&&<OrcAnswered obj={obj} />}

// {hasAnswerSubmiited&&<div class={styles.modalOuterBox}>
//               <div>
//                 <button
//                   className={styles.modalButton}
//                   onClick={handleExplation}
//                 >
//                   {"View Details"}
//                 </button>
//               </div>
//               {
//                 <div className={styles.modalsParent}>
//                   <div class={`${styles.modal} ${isAnsweredCorrect ? styles.green : styles.red}`}>
//                 <div><div>
//                   {isAnsweredCorrect ? "Well Done" : "Correct Solution"}
//                 </div>
//                   {!isAnsweredCorrect && <div style={{ color: 'black' }}>
//                     <b>{"No"}</b>
//                   </div>}
//                   <div>

//                   </div>
//                 </div>
//               </div>
//                 </div>
//               }
//             </div>}
