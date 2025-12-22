import React, { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shuffle from "shuffle-array";
import { EditableMathField, StaticMathField } from "../CommonJSFiles/ExternalPackages";
import styled from "styled-components";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import ProgressBorder from "../CommonJsxComponent/ProgressBorder";
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
function Ol({ obj, meter }) {
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    studentAnswerQuestion,
  } = useContext(ValidationContext);
  meter = Number(meter) || 0;
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      questionContent,
      result.source.index,
      result.destination.index
    );
    setQuetionContent([...items]);
  };
  const [questionContent, setQuetionContent] = useState([]);

  const [inputState, setInputState] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [redAlert, setRedAlert] = useState(false);
  const removeAllInputType = () => {
    let parent = document.getElementById("studentAnswerResponse");
    let inputType = parent.querySelectorAll("input");
    var inputField = [];
    var selectTag = [];
    for (let item of inputType) {
      if (item.required) inputField.push(item.value);
    }
    for (let item of inputType) {
      item.maxLength = item.value.length;
      item.style.textAlign = "center";
      item.value = item.required ? "" : item.value;
      item.checked = false;
    }
    setInputState([...inputField]);

    let selectOption = parent.querySelectorAll("select");
    for (let select of selectOption) {
      for (let option of select) {
        select.addEventListener("change", (e) => {
          for (let option of e.target.options) {
            option.selected
              ? option.setAttribute("selected", "selected")
              : option.removeAttribute("selected");
          }
        });
        if (option.selected) selectTag.push(option.value);
      }
    }
    for (let select of selectOption) {
      for (let option of select) {
        option.selected = false;
      }
    }
    setSelectState([...selectTag]);
  };
  useEffect(() => {
    let temp = [...obj?.questionContent];
    temp = shuffle(temp);
    setQuetionContent([...temp]);
    removeAllInputType();
  }, []);
  const inputRef = useRef([]);
  let currentIndex = 0;
  const handleFocus = (i) => {};
  const handleChange = (e, i) => {};
  const [value, setValue] = useState({});
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
                onFocus={() => handleFocus(y)}
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

  const handleSubmit = () => {
    console.log({ selectState, inputState });
    if (hasAnswerSubmitted) return;
    let parent = document.getElementById("studentAnswerResponse");
    let inputType = parent.querySelectorAll("input");
    let selectOption = parent.querySelectorAll("select");
    var i = 0;
    var s = 0;
    var isWrong = false;
    for (let item of inputType) {
      if (item.value == "") {
        setHasAnswerSubmitted(false);
        setRedAlert(true);
        return;
      } else {
        setRedAlert(false);
        console.log(item.value, "-", i, "-", inputState[i]);
        if (item.required) {
          if (item.value !== inputState[i]) {
            isWrong = true;
          }
          i++;
        }
      }
    }

    for (let items of selectOption) {
      for (let item of items) {
        if (item.value === "Select" && item.selected) {
          setHasAnswerSubmitted(false);
          setRedAlert(true);
          return;
        } else {
          setRedAlert(false);
          if (item.selected) {
            console.log(item.value, "-", s, "-", selectState[s]);
            if (item.value !== selectState[s]) isWrong = true;
            s++;
          }
        }
      }
    }
    console.log({ isWrong });

    for (let i = 0; i < questionContent?.length; i++) {
      let items1 = questionContent[i];
      let items2 = obj?.questionContent[i];
      if (items1 != items2) {
        setHasAnswerSubmitted(true);
        setIsAnswerCorrect(false);
        return;
      }
    }
    if (isWrong) {
      setHasAnswerSubmitted(true);
      setIsAnswerCorrect(false);
      return;
    }
    setHasAnswerSubmitted(true);
    setIsAnswerCorrect(true);
  };

  return (
    <div>
      <SolveButton
        onClick={handleSubmit}
        answerHasSelected={hasAnswerSubmitted}
      />
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div>
          <div className="mathzoneQuestionName">
            {parse(obj?.questionName, optionSelect)}
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
          <div className={`${styles.contentParent}`}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="mathzoneMainOlBox"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {questionContent.map((item, index) => (
                      <Draggable
                        isDragDisabled={hasAnswerSubmitted}
                        key={String(index)}
                        draggableId={String(index)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {parse(item, optionSelect)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div id="mathzoneFibAfterText">
              {parse(obj?.text, optionSelect)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ol;

export const Box = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  width: 86%;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 5px;
  > div {
    border-bottom: 1px solid black;
    width: 80%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
