import React, { useEffect, useRef } from "react"
import Draggable from "react-draggable";
import styles from "../tooltip.module.css"
export const CkeditorVirtualKeyboard = ({
    inputRef,
    
    currentVirtualKeyBoard,
  onClick,
    currentInputBox,
    setCurrentVirtualKeyBoard,
    editableRef
   
  }) => {
    const reference = useRef([]);
    const calcRef = useRef();
  const handlClick=(i)=>{
    let symbolsArray = [
      "\\frac",
      "\\cdot",
      "\\div",
      "\\times",
      "\\sqrt",
      "^",
      "\\le",
      "\\ge",
      "|",
      "prod",
      "\\nthroot",
      "_",
    ];
    editableRef?.mathField.cmd(symbolsArray[i])
    editableRef?.mathField.focus()

  }
  const handleClose = () => {
    setCurrentVirtualKeyBoard(-1);
  };
  const ref=useRef([])
  useEffect(() => {
    let parent = document
        .getElementById("studentAnswerResponse")
        ?.getBoundingClientRect();
        let xPosition = parent.left || 0;
        let yPosition = 0;
    if (currentVirtualKeyBoard > -1) {
      //
      // calcRef.current[currentVirtualKeyBoard].style=`left:${inputRef.current[currentInputBox].getBoundingClientRect().left-calcRef.current[currentVirtualKeyBoard].clientWidth}px; top:${inputRef.current[currentInputBox].getBoundingClientRect().top-calcRef.current[currentVirtualKeyBoard].clientHeight}px`;
      // // calcRef.current[currentVirtualKeyBoard].style=``;

      if (
        inputRef.current[currentInputBox].getBoundingClientRect().left -
          calcRef.current.clientWidth  > parent?.left
        -1
      ) {
        xPosition =
          inputRef.current[currentInputBox].getBoundingClientRect().left -
          calcRef.current.clientWidth  +parent?.left;;
      }
      if (
        inputRef.current[currentInputBox].getBoundingClientRect().top -
          calcRef.current.clientHeight -
          4 >
          parent?.top
      ) {
        yPosition =
          inputRef.current[currentInputBox].getBoundingClientRect().top -
          calcRef.current.clientHeight -
          12;
      } else {
        yPosition =
          inputRef.current[currentInputBox].getBoundingClientRect().bottom+2;
      }
      
      calcRef.current.style = `left:${xPosition}px; top:${yPosition}px`;
    }
  }, [currentVirtualKeyBoard]);
  useEffect(()=>{
    onClick(editableRef?.props?.latex)
  })
    return (
      <Draggable>
      <div
        id={styles.mathToolbarContainer}
        className="ui-draggable mathquill-rendered-math mathquill-rendered-math_position"
        style={{ zIndex: 50, position: "relative" }}
        ref={calcRef}
      >
        <div className="tooltip-wrapper">
          <div className="tooltip-top-bar" id={styles.tooltipTopBar}>
            <span className="tooltip-handle">&nbsp;</span>
            <span className={styles.tooltipClose} onClick={(e) => handleClose()} onTouchStart={(e) => handleClose()} on>
              X&nbsp;
            </span>
          </div>
          <div id={styles.mathToolbar}>
            <div
              className="btn mathsign fractions_cls"
              title="\frac{ }{ }"
              onClick={() => handlClick(0)}
              onTouchStart={() => handlClick(0)}
              
              ref={(el) => (reference.current[0] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/5.png" className="fraction" id={styles.symbolsWidthHeight} />
          
            </div>
            <div
              className="btn mathsign"
              title="\cdot"
              onClick={() => handlClick(1)}
              onTouchStart={() => handlClick(1)}
              ref={(el) => (reference.current[1] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/1.png" className="dot1" id={styles.symbolsWidthHeight}/>
              
            </div>
            <div
              className="btn mathsign"
              title="\div"
              onClick={() => handlClick(2)}
              onTouchStart={() => handlClick(2)}
              ref={(el) => (reference.current[2] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/4.png" className="divide" id={styles.symbolsWidthHeight}/>
              
            </div>
            <div
              className="btn mathsign"
              title="\times"
              onClick={() => handlClick(3)}
              onTouchStart={() => handlClick(3)}
              ref={(el) => (reference.current[3] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/11.png" id={styles.symbolsWidthHeight} />
             
            </div>
            <div
              className="btn mathsign mathquill_cursor_cls"
              title="\sqrt{}"
              onClick={() => handlClick(4)}
              onTouchStart={() => handlClick(4)}
              ref={(el) => (reference.current[4] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/10.png" className="sqroot" id={styles.symbolsWidthHeight}/>
          
            </div>
            <div
              className="btn mathsign mathquill_cursor_cls"
              title="^{ }"
              ref={(el) => (reference.current[5] = el)}
              onClick={() => handlClick(5)}
              onTouchStart={() => handlClick(5)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/12.png" className="exponent" id={styles.symbolsWidthHeight}/>
            
            </div>
            <div
              className="btn mathsign"
              title="\le"
              onClick={() => handlClick(6)}
              onTouchStart={() => handlClick(6)}

              ref={(el) => (reference.current[6] = el)}
            >
              <img
  src="/assets/staticmedia/MathQuillSymbols/6.png"
  className="lessthanequal" id={styles.symbolsWidthHeight}
  />
          
            </div>
            <div
              className="btn mathsign"
              title="\ge"
              onClick={() => handlClick(7)}
              onTouchStart={() => handlClick(7)}
              ref={(el) => (reference.current[7] = el)}
            >
              <img
  src="/assets/staticmedia/MathQuillSymbols/7.png"
  className="greaterthanequal" id={styles.symbolsWidthHeight}
  />
         
            </div>
            <div
              className="btn mathsign mathquill_cursor_cls"
              title="\left|\right|"
              onClick={() => handlClick(8)}
              onTouchStart={() => handlClick(8)}
              ref={(el) => (reference.current[8] = el)}
            >
              <img src="/assets/staticmedia/MathQuillSymbols/3.png" className="absolute" id={styles.symbolsWidthHeight}/>
    
            </div>
            <div
              className="btn mathsign"
              title="\prod"
              onClick={() => handlClick(9)}
              onTouchStart={() => handlClick(9)}
              ref={(el) => (reference.current[9] = el)}
            >
              <img  src="/assets/staticmedia/MathQuillSymbols/9.png" className="pi" id={styles.symbolsWidthHeight}/>
      
            </div>
            <div
              className="btn mathsign mathquill_cursor_cls"
              title="\nthroot{}{}"
              onClick={() => handlClick(10)}
              onTouchStart={() => handlClick(10)}
              ref={(el) => (reference.current[10] = el)}
            >
              <img  src="/assets/staticmedia/MathQuillSymbols/8.png" className="nthroot" id={styles.symbolsWidthHeight}/>
            
            </div>
            <div
              className="btn mathsign mathquill_cursor_cls"
              title="_{ }"
              onClick={() => handlClick(11)}
              onTouchStart={() => handlClick(11)}
              ref={(el) => (reference.current[11] = el)}
            >
              <img  src="/assets/staticmedia/MathQuillSymbols/2.png" className="xbase" id={styles.symbolsWidthHeight}/>
          
            </div>
          </div>
        </div>
      </div>
      </Draggable>
    );
  };