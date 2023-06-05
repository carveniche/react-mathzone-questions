import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { EditableMathField, StaticMathField } from "../../ExternalPackages";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import SolveButton from "../SolveButton";
import shuffle from "shuffle-array";
import { ProgressBorder } from "../../Modal2/modal2";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import HtmlParserComponent from "../../CommonJSFiles/HtmlParserComponent";
import { dragdropPointCordinate } from "../../../CommonFunction/dragdropPointCordinate";
import { useScrollBar } from "../../../CommonFunction/useScrollBar";
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
const updateState = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  index,
  row,
  col
) => {
  targetState[row][col].val = sourceState[index];
  targetState[row][col].show = true;
  updateTargetState({ ...targetState });
  sourceState = sourceState.filter((item) => sourceState[index] != item);
  updateSourceState([...sourceState]);
};
const elementFinds2 = (target, xyAxis) => {
  let elem = document?.elementFromPoint(xyAxis[0], xyAxis[1]);
  while (elem?.getAttribute("id") !== "root" && elem?.getAttribute("id")) {
    if (elem?.className.includes(target)) {
      return true;
    }
    elem = elem.parentNode;
  }
  return false;
};
const updateState2 = (
  targetState,
  sourceState,
  updateTargetState,
  updateSourceState,
  row,
  col
) => {
  targetState.push(sourceState[row][col]?.val);
  sourceState[row][col].val = "";
  sourceState[row][col].show = false;
  updateTargetState([...targetState]);
  updateSourceState({ ...sourceState });
  console.log(sourceState[row][col]);
};
function Oprc({ obj, meter }) {

  let currentIndex = 0;
  const inputRef = useRef([]);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
  } = useContext(ValidationContext);
  let hasAnswerSubmit = hasAnswerSubmitted;
  let setHasAnswerSubmit = setHasAnswerSubmitted;
  let setIsAnsweredCorrect = setIsAnswerCorrect;
  const [dropState, setDropState] = useState([]);
  const handleFocus = (i) => {};
  const handleChange = (e, i) => {};
  const [value, setValue] = useState({});
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")||clsName.includes("mathImg")) {
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
  }, []);
  const currentDrag = useRef(-1);
  const [dragActive, setDragActive] = useState(false);
  const [xyPosition, setXyposition] = useState([]);
  const [dropActive, setDropActive] = useState(false);
  const [handleDrag,handleDragStart]=useScrollBar()
  const currentDrop = useRef([-1, -1]);
  const handleStop2 = (e, row, col) => {
    let value=dropState[row][col].val
    if(dropState[row][col].show){
    dragState.push(value)
    dropState[row][col].show = false;
    dropState[row][col].val=""
    setDragState([...dragState])
   
  }
  
  setDropState({ ...dropState });
  };
  const handleStop = (e, i) => {
    setDragActive(true);
    let [x,y]=dragdropPointCordinate(e)
    let temp = [...dragState];
    let position = [x, y];
    setXyposition([...position]);
    setDragState([]);
    currentDrag.current = i;
    setDragState([...temp]);
  };
  useEffect(() => {
    if (xyPosition.length > 0 && dragActive) {
      let id = setTimeout(() => {
        let val = elementFinds("droppableOprc", xyPosition, dropState);
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
        setXyposition([]);
        setDragActive(false);
        currentDrag.current = -1;
      }, 0);
    }
  }, [xyPosition.length]);
  useEffect(() => {
    if (xyPosition.length > 0 && dropActive) {
      let id = setTimeout(() => {
        if (elementFinds2("draggableOprc", xyPosition) != false) {
          updateState2(
            dragState,
            dropState,
            setDragState,
            setDropState,
            currentDrop.current[0],
            currentDrop.current[1]
          );
        }
        clearTimeout(id);
        currentDrop.current = [-1, -1];
        setXyposition(false);
        setDropActive(false);
      }, 0);
    }
  }, [xyPosition.length, dropActive]);
  const handleSubmit = () => {
    if (hasAnswerSubmit) return;
    let n = obj?.orc_oprc_data[0]?.row_headers?.length || 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < dropState[i].length; j++) {
        if (!dropState[i][j].show) {
          setRedAlert(true)
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
  const [redAlert,setRedAlert]=useState(false)
  return (
    <div>
      <SolveButton onClick={handleSubmit} />
      {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className="mathzoneQuestionName">
          {parse(obj?.question_text, optionSelect)}
        </div>
        {obj?.upload_file_name&&<div><img src={obj?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={`${styles.contentParent}`}>
          <div
            className="mathzoneOprcGrid"
            totalCols={
              obj?.orc_oprc_data[0]?.row_headers?.length > 0
                ? obj?.orc_oprc_data[0]?.column_headers?.length + 1
                : obj?.orc_oprc_data[0]?.column_headers?.length + 1
            }
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
                className={`${
                  i + 1 == obj?.orc_oprc_data[0]?.column_headers?.length &&
                  "mathzoneLastChild"
                }`}
              >
                {parse(item, optionSelect)}
              </div>
            ))}
            {obj?.orc_oprc_data[0]?.row_headers?.map((item, i) => (
              <>
                <div>{parse(item, optionSelect)}</div>
                {dropState[i]?.map((item, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    className={`droppableOprc mathzoneOprcGridDivBox`}
                    id={`${i} ${index}`}
                  >
                    {item.show && (
                      <Draggable
                        onStop={(e) => handleStop2(e, i, index)}
                        disabled={hasAnswerSubmit}
                        onDrag={handleDrag} onStart={handleDragStart}
                      >
                        <div>{parse(item.val, optionSelect)}</div>
                      </Draggable>
                    )}
                  </div>
                ))}
              </>
            ))}
          </div>
          <div
            className={`draggableOprc mathzoneOprcGridDivBox2`}
            id="draggableOrc"
          >
            {dragState?.map((item, i) => (
              <div>
                <Draggable
                  onStop={(e) => handleStop(e, i)}
                  disabled={hasAnswerSubmit}
                  onDrag={handleDrag} onStart={handleDragStart}
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
      <div id={styles.fibAfterText}><HtmlParserComponent value={obj?.after_question_text} /></div>
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
    padding:5px;
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
