import { useContext, useEffect, useState } from "react";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import { makeBond } from "../GlobalBond/MakeBond";
import styles from "../NumberBond.module.css";
const RenderBinaryTree = ({ node, state, onClick }) => {
  const { left, right, element } = node;
  const {hasAnswerSubmitted,isStudentAnswerResponse}=useContext(ValidationContext)
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  //let [row,setRow]=useState([element?.row,element?.col])

  useEffect(() => {
    let rowElem = element?.row;
    let colElem = element?.col;
    let leftRow = left?.element?.row;
    let leftCol = left?.element?.col;
    let rightRow = right?.element?.row;
    let rightCol = right?.element?.col;

    if (
      rowElem !== undefined &&
      colElem !== undefined &&
      leftRow !== undefined &&
      leftCol !== undefined
    )
      makeBond(
        `bottom${rowElem}row${colElem}col`,
        `top${leftRow}row${leftCol}col`,
        `canva1${rowElem}row${colElem}col`,
        `root1row${element?.row}col${element?.col}`
      );
    if (
      rowElem !== undefined &&
      colElem !== undefined &&
      rightRow !== undefined &&
      rightCol !== undefined
    )
      makeBond(
        `bottom${rowElem}row${colElem}col`,
        `top${rightRow}row${rightCol}col`,
        `canva2${rowElem}row${colElem}col`,
        `root1row${element?.row}col${element?.col}`
      );
  }, []);
  let str = `${element?.row} ${element?.col}`;
  return (
   element?.value ?<div className={styles.root1} id={`root1row${element?.row}col${element?.col}`}>
      <div className={styles.element}>
        <div
          id={`row${element?.row}col${element?.col}`}
          className={styles.circles1}
          style={{
            border: `${element?.value ? 1 : 0}px solid black`,
            backgroundColor: `${element?.value&&element?.isMissed==="false" ? "indigo" : "initial"}`,
            color: `${element?.isMissed === "true" ? "black" : "white"}`,
          }}
        >
          <div
            className={`${styles.point} ${styles.top}`}
            id={`top${element?.row}row${element?.col}col`}
          ></div>
          <div
            className={`${styles.point} ${styles.bottom}`}
            id={`bottom${element?.row}row${element?.col}col`}
          ></div>
          {element?.isMissed == "true" ? (
            <input
              className={styles.InputBox}
              type="text"
              onChange={(e) => onClick(e, element?.row, element?.col)}
              value={isStudentAnswerResponse?element[student_answer]:state[str] ? String(state[str]).trim() : ""}
              disabled={hasAnswerSubmitted||isStudentAnswerResponse}
            />
          ) : (
            element?.value
          )}
        </div>
      </div>

      {(left || right) && (
        <div className={styles.nodeChildren}>
          <div className={styles.leftChild}>
            {left && (
              <RenderBinaryTree node={left} state={state} onClick={onClick} />
            )}
          </div>
          <div className={styles.rightChild}>
            {right && (
              <RenderBinaryTree node={right} state={state} onClick={onClick} />
            )}
          </div>
        </div>
      )}

      <>
        {" "}
        {left?.element?.row !== undefined &&
          left?.element?.col !== undefined &&
          left?.element?.value && (
            <div className={styles.fixed}>
              <canvas
                id={`canva1${element?.row}row${element?.col}col`}
                className={`${element?.row}_${element?.col} ${left?.element?.row}_${left?.element?.col}`}
              ></canvas>
            </div>
          )}
        {right?.element?.row !== undefined &&
          right?.element?.col !== undefined &&
          right?.element?.value && (
            <div className={styles.fixed}>
              <canvas
                id={`canva2${element?.row}row${element?.col}col`}
                className={`${element?.row}_${element?.col} ${right?.element?.row}_${right?.element?.col}`}
              ></canvas>
            </div>
          )}
      </>
    </div>:""
  );
};

function insertLevelOrder(arr, root, i) {
  // Base case for recursion
  if (i < arr.length) {
    let temp = {
      element: { ...arr[i] },
      left: null,
      right: null,
    };
    root = { ...temp };

    // insert left child
    root.left = { ...insertLevelOrder(arr, root.left, 2 * i + 1) };

    // insert right child
    root.right = { ...insertLevelOrder(arr, root.right, 2 * i + 2) };
  }
  return { ...root };
}
function NumberBondKeyingChoiceType({ datas, inputRef }) {
  let [obj3, setObj3] = useState({});
  const [line, setLine] = useState("");
  const [inputState, setInputState] = useState({});
  const handleInputChange = (e, row, col) => {
    if (isNaN(Number(e.target.value))) return;
    let str = `${row} ${col}`;
    let temp = { ...inputState };
    temp[str] = e.target.value;
    setInputState({ ...temp });
  };
  useEffect(() => {
    manupulatingData(datas?.questionContent);
  }, []);
  inputRef.current = { ...inputState };
  const [resize, setResize] = useState(true);
  const manupulatingData = (obj) => {
    if (!obj && obj?.length < 5) return;
    let firstFiveElement = [];
    firstFiveElement[0] = { ...obj[4] };
    let j = 1;
    for (let i = 0; i < 4; i += 2) {
      firstFiveElement[j] = { ...obj[i] };
      j++;
      let restElement = [...obj];
      restElement = restElement.filter((item, i) => i > 4);
      for (let i = 1; i < restElement.length; i += 3) {
        let temp = { ...restElement[i] };
        temp.value = null;
        restElement[i] = { ...temp };
      }
      restElement = restElement.filter((item) => item.value !== null);
      restElement = [...firstFiveElement, ...restElement];
      let root = {};
      root = insertLevelOrder(restElement, root, 0);
      console.log(root)
      setObj3({ ...root });
    }

    //swapping
  };
  const handleResize = () => {
    setResize(false);
    let id = setTimeout(() => {
      setResize(true);
      clearTimeout(id);
    }, 0);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.tree} id="numberbondtree">
      {resize && Object.keys(obj3).length > 0 && (
        <RenderBinaryTree
          node={obj3}
          state={inputState}
          onClick={handleInputChange}
        />
      )}
    </div>
  );
}

export default NumberBondKeyingChoiceType;
