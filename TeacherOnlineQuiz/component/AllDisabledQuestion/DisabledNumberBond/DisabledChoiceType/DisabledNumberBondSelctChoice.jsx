import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
import { disabledMakeBond } from "../DisabledGlobalBond/disabledMakeBond";
import styles2 from "../../OnlineQuiz.module.css";
import styles from "../DisabledNumberBond.module.css";
const RenderBinaryTree = ({ node }) => {
  const { left, right, element } = node;
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
    disabledMakeBond(
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
      disabledMakeBond(
        `bottom${rowElem}row${colElem}col`,
        `top${rightRow}row${rightCol}col`,
        `canva2${rowElem}row${colElem}col`,
        `root1row${element?.row}col${element?.col}`
      );
  }, []);

  return (
    element?.value?<div
      className={styles.root1}
      id={`root1row${element?.row}col${element?.col}`}
    >
      <div className={styles.element}>
        <div
          id={`row${element?.row}col${element?.col}`}
          className={styles.circles1}
          style={{
            border: `${element?.value ? 1 : 0}px solid black`,
            backgroundColor: `${element?.value &&element?.isMissed==="false"? "indigo" : "initial"}`,
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
            <input className={styles.InputBox} readOnly={true} type="text" />
          ) : (
            element?.value
          )}
        </div>
      </div>

      {((left && left?.element?.value) || (right && right?.element?.value)) && (
        <div className={styles.nodeChildren}>
          <div className={styles.leftChild}>
            {left && left?.element?.value && <RenderBinaryTree node={left} />}
          </div>
          <div className={styles.rightChild}>
            {right && right?.element?.value && (
              <RenderBinaryTree node={right} />
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
              ></canvas>
            </div>
          )}
        {right?.element?.row !== undefined &&
          right?.element?.col !== undefined &&
          right?.element?.value && (
            <div className={styles.fixed}>
              <canvas
                id={`canva2${element?.row}row${element?.col}col`}
              ></canvas>
            </div>
          )}
      </>
    </div>:''
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
function DisabledNumberBondSelctChoice({ datas }) {
  let [obj3, setObj3] = useState({});
  
  useEffect(() => {
    manupulatingData(datas?.questionContent);
  }, []);
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
    let arr = [];
    datas?.choices?.map((item) => {
      let obj = { value: item, show: false };
      arr.push({ ...obj });
    });
    setChoicesState([...arr]);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [choicesState, setChoicesState] = useState([]);

  return (
    <div className={styles.tree} id="tree">
      {resize && Object.keys(obj3).length > 0 && (
        <RenderBinaryTree node={obj3} />
      )}
      <div className={styles2.NumberBondSelectChoiceFlexBox2}>
        {choicesState?.map((value, i) => (
          <div
            className={`${styles2.flex}  ${
              value.show
                ? styles2.selectedChoiceType
                : styles2.prevSelectionAnswerSelection
            }`}
            style={{ padding: `${value?.choice_image ? 0.5 : 1}rem 1rem` }}
            key={i}
          >
            <div>
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div>{<div key={i}>{HtmlParser(value?.value)}</div>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisabledNumberBondSelctChoice;
