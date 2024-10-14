import shuffle from "shuffle-array";
import React, { useRef, useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";

import { EditableMathField, StaticMathField } from "../../ExternalPackages";
import SolveButton from "../SolveButton";
import { ProgressBorder } from "../../Modal2/modal2";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import HtmlParser from "react-html-parser";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";

const collectTextInputField = () => {
  let parent = document.getElementById("orcTextParent");
  if (!parent) {
    return;
  }

  let inputBoxes = parent.querySelectorAll("input");

  for (let input of inputBoxes) {
    if (input.value == "") {
      // setRedAlert(true);
      return false;
    }
  }
  let temp = [];
  for (let input of inputBoxes) {
    temp.push(input.value);
  }
  return temp;
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
const disabledSelectChoice = (arr) => {
  let parents = document.querySelector("#orc_question_type");
  let selectBox = parents?.querySelectorAll("select");
  for (let i = 0; i < selectBox.length; i++) {
    let options = selectBox[i]?.querySelectorAll("option");
    for (let j = 0; j < options.length; j++) {
      let values = options[j]?.value;
      if (arr[i]?.includes(values)) {
        options[j].setAttribute("selected", "true");
      } else {
        options[j]?.removeAttribute("selected");
      }
    }
  }
};
const disabledCkeditor = () => {
  let parents = document.querySelector("#orc_question_type");
  let inputBox = parents?.querySelectorAll("select") || [];
  for (let item of inputBox) {
    if (item) {
      item.setAttribute("disabled", true);
    }
  }
  inputBox = parents?.querySelectorAll("input") || [];
  for (let item of inputBox) {
    if (item) {
      item.setAttribute("disabled", true);
    }
  }
};
function ORC({ obj, question_text, meter }) {
  const [redAlert, setRedAlert] = useState(false);
  let [dragState, setDragState] = useState([]);
  meter = Number(meter) || 0;
  let [dropState, setDropState] = useState([]);
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setStudentAnswerQuestion,
  } = useContext(ValidationContext);
  useEffect(() => {
    let whitePage = document.getElementById("quizWhitePage");
    try {
      whitePage.style = "z-index:auto";
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    disabledSelectChoice();
    disabledCkeditor();
  }, []);
  useEffect(() => {
    document.querySelectorAll(".AfterQstAns").forEach((inp) => {
      if (hasAnswerSubmitted) inp.setAttribute("readonly", true);
    });
  }, [hasAnswerSubmitted]);
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
    let [x, y] = dragdropPointCordinate(e);
    const [row, col] = validateCoordiante(droppableContainerRef.current, {
      x,
      y,
    });

    if (row > -1 && col > -1) {
      let value = dragState[i];

      let temp = dragState.filter((_, index) => index != i);
      setDragState([...temp]);
      dropState[col].push(value);
      setDropState([...dropState]);
      setDragKey(Number(!dragKey));
    } else {
      setDragKey(Number(!dragKey));
    }
  };
  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col];
    dragState.push(value);
    setDragState([...dragState]);
    dropState[row] = dropState[row].filter((_, i) => i !== col);
    setDropState([...dropState]);
  };

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
        if (
          clsName.includes("mathquill-rendered-math") ||
          clsName.includes("mathImg")
        ) {
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
  let setIsAnsweredCorrect = setIsAnswerCorrect;

  function afterQstnTextHtmlParser(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body;
  }
  var afterQstTextInp = [];
  var afterQstTxt = afterQstnTextHtmlParser(obj?.after_question_text || "");
  const inputs = afterQstTxt.querySelectorAll("input");
  inputs.forEach((input) => {
    afterQstTextInp.push(input.value);
    input.classList.toggle("AfterQstAns");
    input.setAttribute("value", "");
  });

  const handleSubmit = () => {
    if (hasAnswerSubmitted) return;
    if (inputText.length > 0) {
      let temp = collectTextInputField(inputText);
      //testing for empty field
      if (temp === false) {
        return;
      }
    }
    var afterQstnTxtAns = document.querySelectorAll(".AfterQstAns");
    if (afterQstnTxtAns.length > 0) {
      var afterQstnTxtAnsValues = [];
      afterQstnTxtAns.forEach((ans) => {
        if (ans.value) afterQstnTxtAnsValues.push(ans.value);
      });

      if (
        afterQstnTxtAnsValues.length == 0 ||
        afterQstTextInp.length == 0 ||
        afterQstnTxtAnsValues.length !== afterQstTextInp.length
      ) {
        setRedAlert(true);
        return;
      } else setRedAlert(false);

      for (let ans of afterQstnTxtAnsValues) {
        if (!afterQstTextInp.includes(ans)) {
          setIsAnsweredCorrect(false);
        }
      }
    }
    for (let i = 0; i < dropState.length; i++) {
      if (dropState[i].length < 1) {
        setRedAlert(true);
        return;
      }
    }

    //testing correctIncorrect

    let temp = collectTextInputField();
    if (!compareArrayText(inputText, temp)) {
      let jsonData = serializeResponse("studentAnswerResponse");
      setStudentAnswerQuestion(jsonData);
      setIsAnsweredCorrect(false);
      setHasAnswerSubmitted(true);
      return;
    }

    for (let i = 0; i < dropState.length; i++) {
      if (dropState[i]?.length != obj?.orc_oprc_data[0]?.response[i]?.length) {
        let jsonData = serializeResponse("studentAnswerResponse");
        setStudentAnswerQuestion(jsonData);
        setIsAnsweredCorrect(false);
        setHasAnswerSubmitted(true);
        return;
      }
      for (let item1 of dropState[i]) {
        let flag = false;
        for (let item2 of obj?.orc_oprc_data[0]?.response[i]) {
          if (item1 == item2) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          let jsonData = serializeResponse("studentAnswerResponse");
          setStudentAnswerQuestion(jsonData);
          setIsAnsweredCorrect(false);
          setHasAnswerSubmitted(true);
          return;
        }
      }
    }
    let jsonData = serializeResponse("studentAnswerResponse");
    setStudentAnswerQuestion(jsonData);
    setIsAnsweredCorrect(true);
    setHasAnswerSubmitted(true);
  };

  let hasAnswerSubmiited = hasAnswerSubmitted;

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
    <div>
      {
        <SolveButton
          onClick={handleSubmit}
          hasAnswerSubmitted={hasAnswerSubmiited}
        />
      }
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className="mathzoneQuestionName" id="orc_question_type">
          {parse(question_text, optionSelect)}
        </div>
        {obj?.upload_file_name && (
          <div>
            <img src={obj?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={`${styles.contentParent} ${styles.orc_dragdrop}`}>
          <>
            {obj?.orc_oprc_data[0]?.column_headers &&
              obj?.orc_oprc_data[0]?.column_headers?.length > 0 && (
                <div
                  className="mathzoneOrcGrid"
                  style={{
                    gridTemplateColumns: `repeat(${
                      Number(obj?.orc_oprc_data[0]?.column_headers?.length) || 1
                    }, 1fr)`,
                  }}
                >
                  {obj?.orc_oprc_data[0]?.column_headers?.map((item, i) => (
                    <div
                      key={i}
                      className={`mathzoneFlexbox ${
                        i == obj?.orc_oprc_data[0]?.column_headers?.length &&
                        "mathzoneEvenChild"
                      }`}
                      style={{
                        border: 0,
                        borderBottom: "1px solid black",
                        borderRight: `${
                          i < obj?.orc_oprc_data[0]?.column_headers?.length - 1
                            ? 1
                            : 0
                        }px solid black`,
                      }}
                    >
                      {parse(item, optionSelect)}
                    </div>
                  ))}
                  {dropState?.map((items, i) => (
                    <div
                      className={`droppableOrc mathzoneOrcDivBox`}
                      id={i}
                      key={i}
                      ref={(el) =>
                        (droppableContainerRef.current[i] = {
                          el,
                          show: false,
                          isMissed: true,
                        })
                      }
                      style={{
                        paddingBottom: "6rem",
                        border: 0,
                        borderRight: `${
                          i < dropState?.length - 1 ? 1 : 0
                        }px solid black`,
                      }}
                    >
                      {items?.map((item, index) => (
                        <Draggable
                          onStop={(e) => handleStop2(e, i, index)}
                          defaultPosition={{ x: 0, y: 0 }}
                          axis="both"
                          disabled={hasAnswerSubmiited}
                          key={index}
                        >
                          <div style={{ cursor: "pointer" }}>
                            {parse(item, optionSelect)}
                          </div>
                        </Draggable>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            {
              <div
                id="draggableOrc"
                ref={draggableRef}
                className="mathzoneOrcDivBox2"
                key={`drag${dragKey}`}
              >
                {dragState?.map((items, i) => (
                  <Draggable
                    handle=".handle"
                    onStop={(e) => handleStop1(e, i)}
                    defaultPosition={{ x: 0, y: 0 }}
                    axis="both"
                    disabled={hasAnswerSubmiited}
                    key={i}
                  >
                    <div style={{ cursor: "pointer" }} className="handle">
                      {parse(items, optionSelect)}
                    </div>
                  </Draggable>
                ))}
              </div>
            }
          </>
          <div>
            {/* <div id="mathzoneFibAfterText">
              {typeof obj?.after_question_text == "string"
                ? HtmlParser(obj?.after_question_text)
                : obj?.after_question_text}
            </div> */}
            <div id="mathzoneFibAfterText">
              {typeof obj?.after_question_text == "string"
                ? parse(afterQstTxt.innerHTML)
                : obj?.after_question_text}
            </div>
            {/* <div id="mathzoneFibAfterText">
              {
              typeof obj?.after_question_text == "string"
                ? 
                HtmlParser(obj?.after_question_text) 
                // parse(afterQstTxt.innerHTML) 
                :
                obj?.after_question_text
                 }
            </div> */}
          </div>
          {obj?.text && (
            <div id="orcTextParent" style={InlineCss.TextBox}>
              {refresh ? parse(obj?.text) : parse(obj?.text, optionSelect)}
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "1rem",
            visibility: "hidden",
          }}
        >
          hello
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
                {/* <img src="https://www.begalileo.com/assets/new_home/mathquill_p.gif" className="nthroot" /> */}
                Ntr
              </div>
              <div
                className="btn mathsign mathquill_cursor_cls"
                title="_{ }"
                onClick={() => handlClick(11)}
                ref={(el) => (ref.current[11] = el)}
              >
                <img
                  src="https://www.begalileo.com/assets/new_home/mathquill_p.gif"
                  className="xbase"
                  alt="xbase"
                />
                {/* Xbs */}
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
  width: 80%;
  min-width: 100px;
  margin: 2rem;

  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
  height: auto;
  > div:nth-child(even) {
    border: 1px solid black;
  }
  > div {
    border: 1px solid black;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    word-break: break;
  }
  > div:nth-child(${(props) => props.totalCols + 1}) {
    min-height: 100px;

    height: auto;
  }
  > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .flexbox {
    display: flex;
    justify-content: center;
    font-weight: bold;
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
      padding:5px;
      border: 1px solid black;
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

const InlineCss = {
  TextBox: {
    width: "92%",
    margin: "1rem auto",
  },
};
