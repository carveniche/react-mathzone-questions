import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { EditableMathField, StaticMathField } from "../../ExternalPackages";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import SolveButton from "../SolveButton";
import shuffle from "shuffle-array";
import { ProgressBorder } from "../../Modal2/modal2";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
import { validateCoordiante } from "../ChoicesType/validateCoordinates";

function Oprc({ obj, meter }) {
  let currentIndex = 0;
  const inputRef = useRef([]);
  const { hasAnswerSubmitted, setHasAnswerSubmitted, setIsAnswerCorrect } =
    useContext(ValidationContext);
  let hasAnswerSubmit = hasAnswerSubmitted;
  let setHasAnswerSubmit = setHasAnswerSubmitted;
  let setIsAnsweredCorrect = setIsAnswerCorrect;
  const [dropState, setDropState] = useState([]);
  const handleFocus = (i) => {};
  const handleChange = (e, i) => {};
  const [value, setValue] = useState({});
  const [dragKey, setDragKey] = useState(0);
  const droppableContainerRef = useRef([]);
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
  const [dragState, setDragState] = useState([]);
  useEffect(() => {
    let temp = [];
    obj?.orc_oprc_data[0]?.response.map((item) =>
      item?.map((items) => temp.push(items))
    );
    temp = shuffle(temp);
    setDragState([...temp]);
    let temp2 = {};
    let n = obj?.orc_oprc_data[0]?.row_headers?.length || 1;
    for (let i = 0; i < n; i++) {
      let temp = [];
      obj?.orc_oprc_data[0]?.column_headers?.map((_, index) => {
        let item = {};
        item.show = false;
        item.value = "";
        temp.push({ ...item });
      });
      temp2[i] = temp;
    }
    setDropState({ ...temp2 });
    droppableContainerRef.current = [...Array(Object.keys(temp2).length)].map(
      (item) => Array(temp2[0].length)
    );
  }, []);
  const handleStop2 = (e, row, col) => {
    let value = dropState[row][col].val;
    if (dropState[row][col].show) {
      dragState.push(value);
      dropState[row][col].show = false;
      dropState[row][col].val = "";
      setDragState([...dragState]);
    }

    setDropState({ ...dropState });
  };
  const handleStop1 = (e, i) => {
    let [x, y] = dragdropPointCordinate(e);
    const [row, col] = validateCoordiante(droppableContainerRef.current, {
      x,
      y,
    });
    if (row > -1 && col > -1 && !dropState[row][col].show) {
      dropState[row][col].val = dragState[i];
      dropState[row][col].show = true;

      let temp = dragState.filter((_, index) => index != i);
      setDragState([...temp]);
      setDropState({ ...dropState });
      setDragKey(Number(!dragKey));
    } else {
      setDragKey(Number(!dragKey));
    }
  };

  const handleSubmit = () => {
    if (hasAnswerSubmit) return;
    let n = obj?.orc_oprc_data[0]?.row_headers?.length || 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < dropState[i].length; j++) {
        if (!dropState[i][j].show) {
          setRedAlert(true);
          return;
        }
      }
    }
    let temp = [];
    for (let i = 0; i < n; i++) {
      dropState[i].map((item) => temp.push(item.val));
    }
    for (let i = 0; i < obj?.orc_oprc_data[0]?.response?.length; i++) {
      let items1 = obj?.orc_oprc_data[0]?.response[i][0];
      let items2 = temp[i];
      if (items1 != items2) {
        setIsAnsweredCorrect(false);
        setHasAnswerSubmit(true);
        return;
      }
    }
    setIsAnsweredCorrect(true);
    setHasAnswerSubmit(true);
    return;
  };

  meter = Number(meter) || 0;
  const [redAlert, setRedAlert] = useState(false);
  return (
    <div>
      <SolveButton onClick={handleSubmit} />
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className="mathzoneQuestionName">
          {parse(obj?.question_text, optionSelect)}
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
          <div
            className="mathzoneOprcGrid"
            style={{
              gridTemplateColumns: `repeat(${
                Number(
                  obj?.orc_oprc_data[0]?.row_headers?.length > 0
                    ? obj?.orc_oprc_data[0]?.column_headers?.length + 1
                    : obj?.orc_oprc_data[0]?.column_headers?.length + 1
                ) || 1
              }, 1fr)`,
            }}
          >
            {obj.orc_oprc_data[0]?.row_headers?.length > 0 && <div></div>}
            {obj?.orc_oprc_data[0]?.column_headers?.map((item, i) => (
              <div
                key={i}
                className={`${
                  i + 1 == obj?.orc_oprc_data[0]?.column_headers?.length &&
                  "mathzoneLastChild"
                }`}
              >
                {parse(item, optionSelect)}
              </div>
            ))}
            {obj?.orc_oprc_data[0]?.row_headers?.map((item, i) => (
              <React.Fragment key={i}>
                <div>{parse(item, optionSelect)}</div>
                {dropState[i]?.map((item, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    className={`droppableOprc mathzoneOprcGridDivBox`}
                    id={`${i} ${index}`}
                    ref={(el) =>
                      (droppableContainerRef.current[i][index] = {
                        el,
                        isMissed: true,
                        show: item.show,
                      })
                    }
                    key={index}
                  >
                    {item.show && (
                      <Draggable
                        onStop={(e) => handleStop2(e, i, index)}
                        disabled={hasAnswerSubmit}
                      >
                        <div>{parse(item.val, optionSelect)}</div>
                      </Draggable>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div
            className={`draggableOprc mathzoneOprcGridDivBox2`}
            id="draggableOrc"
            key={`dragKey${dragKey}`}
          >
            {dragState?.map((item, i) => (
              <div key={i}>
                <Draggable
                  onStop={(e) => handleStop1(e, i)}
                  disabled={hasAnswerSubmit}
                >
                  <div style={{ cursor: "pointer" }}>
                    {parse(item, optionSelect)}
                  </div>
                </Draggable>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id={styles.fibAfterText}>
        <HtmlParserComponent value={obj?.after_question_text} />
      </div>
    </div>
  );
}
export default Oprc;
export const Grid = styled.div`
  display: Grid;
  max-width: 90%;

  box-sizing: border-box;
  margin: 2rem auto;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);

  > div:nth-child(even) {
    box-sizing: border-box;
  }
  > div {
    border: 1px solid black;
    padding: 1rem;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  > div:nth-child(n + ${(props) => props.totalCols + 1}) {
    min-height: 100px;

    height: auto;
    box-sizing: border-box;
  }
  > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
`;
export const DivBox = styled.div`
  display: flex;
  gap: 0.4rem;
  postion: relative;
  flex-wrap: wrap;
  box-sizing: border-box;
  z-index: 4;

  height: auto;
  > div {
    margin: 0.51rem;

    border: 1px solid black;
    padding: 5px;
    min-height: 30px;
    min-width: 30px;
    widht: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    word-break: break;
    justify-content: center;
    align-items: center;
  }
`;
export const DivBox2 = styled.div`
  width: calc(60% - 2rem);
  position: relative;
  height: auto;
  z-index: 5;
  display: flex;

  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 2rem;
  min-height: 60px;
  height: auto;
  border: 1px solid black;
  > div {
    min-width: 30px;
    height: auto;
    width: auto;
    padding: 0rem 0;

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
