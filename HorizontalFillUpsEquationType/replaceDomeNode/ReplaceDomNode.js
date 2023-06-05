import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { StaticMathField } from "../../../ExternalPackages";
import styles from "../HorizontalFillUpsEquationType.module.css";
export const optionSelectStaticMathField = {
  replace: (domNode) => {
    if (domNode?.attribs?.class) {
      let clsName = String(domNode?.attribs?.class);
      if (clsName === "mq-selectable")
        return (
          <StaticMathField
            style={{
              display: "inline-block",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
           
            {String(domNode.children[0].data).slice(
              1,
              domNode?.children[0]?.data?.length - 1
            )}
          </StaticMathField>
        );
      else if (clsName.includes("mq-root-block mq-hasCursor")) return <></>;
    }
  },
};
export const mathQuilEditorChecker = (value) => {
  value = String(value);
  if (value.includes("</span>")) return false;
  return true;
};

export const VirtualKeyboard = ({
  inputRef,
  currentInputBox,
  setCurrentVirtualKeyBoard,

  currentBox,
  currentVirtualKeyBoard,
  currentRow,
  currentCol,
  setInputState,
  inputState,
  ref2,
}) => {
  const reference = useRef([]);
  const calcRef = useRef();
  const handlClick = (i) => {
    // inputRef?.children[0]?.children[0]?.children[0]?.focus();
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

   
   
    
    ref2.mathField.cmd(symbolsArray[i]);
    ref2.mathField.focus();
    // inputState[`${currentRow}row${currentCol}col`]=ref2?.props?.latex

    // setInputState({...inputState})
    //   if (inputState[`${currentRow}row${currentCol}col`]) {
    //     let str = reference.current[i].title;
    //     inputState[`${currentRow}row${currentCol}col`] +=
    //       reference.current[i].title;
    //   } else {
    //     inputState[`${currentRow}row${currentCol}col`] =
    //       reference.current[i].title;
    //   }
    //   setInputState({ ...inputState });
    // };
  };
  const handleClose = () => {
    setCurrentVirtualKeyBoard(-1);
    currentBox.current = [];
  };

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
        inputRef.getBoundingClientRect().left - calcRef.current.clientWidth >
        parent?.left
      ) {
        xPosition =
          inputRef.getBoundingClientRect().left -
          calcRef.current.clientWidth +
          parent?.left;
      }
      if (
        inputRef.getBoundingClientRect().top -
          calcRef.current.clientHeight -
          4 >
        parent.top
      ) {
        yPosition =
          inputRef.getBoundingClientRect().top -
          calcRef.current.clientHeight -
          12;
      } else {
        yPosition = inputRef.getBoundingClientRect().bottom + 2;
      }

      calcRef.current.style = `left:${xPosition}px; top:${yPosition}px`;
    }
  }, [currentVirtualKeyBoard]);
  useEffect(() => {
 
    if (
      String(inputState[`${currentRow}row${currentCol}col`]).trim() !==
      String(ref2.props.latex).trim()
    ) {
      inputState[`${currentRow}row${currentCol}col`] = ref2.props.latex;
      setInputState({ ...inputState });
    }
  });
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
          <span className={styles.tooltipClose} onClick={(e) => handleClose()}>
            X&nbsp;
          </span>
        </div>
        <div id={styles.mathToolbar}>
          <div
            className="btn mathsign fractions_cls"
            title="\frac{ }{ }"
            onClick={() => handlClick(0)}
            ref={(el) => (reference.current[0] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/5.png" className="fraction" id={styles.symbolsWidthHeight} />
        
          </div>
          <div
            className="btn mathsign"
            title="\cdot"
            onClick={() => handlClick(1)}
            ref={(el) => (reference.current[1] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/1.png" className="dot1" id={styles.symbolsWidthHeight}/>
            
          </div>
          <div
            className="btn mathsign"
            title="\div"
            onClick={() => handlClick(2)}
            ref={(el) => (reference.current[2] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/4.png" className="divide" id={styles.symbolsWidthHeight}/>
            
          </div>
          <div
            className="btn mathsign"
            title="\times"
            onClick={() => handlClick(3)}
            ref={(el) => (reference.current[3] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/11.png" id={styles.symbolsWidthHeight} />
           
          </div>
          <div
            className="btn mathsign mathquill_cursor_cls"
            title="\sqrt{}"
            onClick={() => handlClick(4)}
            ref={(el) => (reference.current[4] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/10.png" className="sqroot" id={styles.symbolsWidthHeight}/>
        
          </div>
          <div
            className="btn mathsign mathquill_cursor_cls"
            title="^{ }"
            ref={(el) => (reference.current[5] = el)}
            onClick={() => handlClick(5)}
          >
            <img src="/assets/static/media/MathQuillSymbols/12.png" className="exponent" id={styles.symbolsWidthHeight}/>
          
          </div>
          <div
            className="btn mathsign"
            title="\le"
            onClick={() => handlClick(6)}
            ref={(el) => (reference.current[6] = el)}
          >
            <img
src="/assets/static/media/MathQuillSymbols/6.png"
className="lessthanequal" id={styles.symbolsWidthHeight}
/>
        
          </div>
          <div
            className="btn mathsign"
            title="\ge"
            onClick={() => handlClick(7)}
            ref={(el) => (reference.current[7] = el)}
          >
            <img
src="/assets/static/media/MathQuillSymbols/7.png"
className="greaterthanequal" id={styles.symbolsWidthHeight}
/>
       
          </div>
          <div
            className="btn mathsign mathquill_cursor_cls"
            title="\left|\right|"
            onClick={() => handlClick(8)}
            ref={(el) => (reference.current[8] = el)}
          >
            <img src="/assets/static/media/MathQuillSymbols/3.png" className="absolute" id={styles.symbolsWidthHeight}/>
  
          </div>
          <div
            className="btn mathsign"
            title="\prod"
            onClick={() => handlClick(9)}
            ref={(el) => (reference.current[9] = el)}
          >
            <img  src="/assets/static/media/MathQuillSymbols/9.png" className="pi" id={styles.symbolsWidthHeight}/>
    
          </div>
          <div
            className="btn mathsign mathquill_cursor_cls"
            title="\nthroot{}{}"
            onClick={() => handlClick(10)}
            ref={(el) => (reference.current[10] = el)}
          >
            <img  src="/assets/static/media/MathQuillSymbols/8.png" className="nthroot" id={styles.symbolsWidthHeight}/>
          
          </div>
          <div
            className="btn mathsign mathquill_cursor_cls"
            title="_{ }"
            onClick={() => handlClick(11)}
            ref={(el) => (reference.current[11] = el)}
          >
            <img  src="/assets/static/media/MathQuillSymbols/2.png" className="xbase" id={styles.symbolsWidthHeight}/>
        
          </div>
        </div>
      </div>
    </div>
    </Draggable>
  );
};
