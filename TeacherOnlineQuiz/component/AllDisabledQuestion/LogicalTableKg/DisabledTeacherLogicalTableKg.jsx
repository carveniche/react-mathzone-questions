import parse from "html-react-parser";
import styles from "./custom.module.css";
import { useContext, useEffect, useState } from "react";
import styles2 from "../OnlineQuiz.module.css";
import { ProgressBorder } from "../../../../../Modal2/modal2";
// let data = {
//   operation: "addition",
//   type: "logical_table_kg",
//   rows: "5",
//   cols: "5",
//   questionName:
//     "\u003cdiv\u003eLisa, John, Sara, and Tom played baseball after school. In what\u003c/div\u003e\u003cdiv\u003eorder was each child up to bat?\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\u003cdiv\u003eClue 1: A girl was not the first or last child to bat.\u003c/div\u003e\u003cdiv\u003eClue 2: Lisa was up to bat before Sara but after Tom.\u003c/div\u003e",
//   questionContent: [
//     [
//       { row: 0, col: 0, image: "", text: "", isMissed: "" },
//       { row: 0, col: 1, image: "", text: "", isMissed: "" },
//       { row: 0, col: 2, image: "", text: "", isMissed: "" },
//       { row: 0, col: 3, image: "", text: "", isMissed: "" },
//       { row: 0, col: 4, image: "", text: "", isMissed: "" },
//     ],
//     [
//       { row: 1, col: 0, image: "", text: "", isMissed: "" },
//       { row: 1, col: 1, image: "", text: "", isMissed: false },
//       { row: 1, col: 2, image: "", text: "", isMissed: false },
//       { row: 1, col: 3, image: "", text: "", isMissed: false },
//       { row: 1, col: 4, image: "", text: "", isMissed: true },
//     ],
//     [
//       { row: 2, col: 0, image: "", text: "", isMissed: "" },
//       { row: 2, col: 1, image: "", text: "", isMissed: true },
//       { row: 2, col: 2, image: "", text: "", isMissed: false },
//       { row: 2, col: 3, image: "", text: "", isMissed: false },
//       { row: 2, col: 4, image: "", text: "", isMissed: false },
//     ],
//     [
//       { row: 3, col: 0, image: "", text: "", isMissed: "" },
//       { row: 3, col: 1, image: "", text: "", isMissed: false },
//       { row: 3, col: 2, image: "", text: "", isMissed: false },
//       { row: 3, col: 3, image: "", text: "", isMissed: true },
//       { row: 3, col: 4, image: "", text: "", isMissed: false },
//     ],
//     [
//       { row: 4, col: 0, image: "", text: "", isMissed: "" },
//       { row: 4, col: 1, image: "", text: "", isMissed: false },
//       { row: 4, col: 2, image: "", text: "", isMissed: true },
//       { row: 4, col: 3, image: "", text: "", isMissed: false },
//       { row: 4, col: 4, image: "", text: "", isMissed: false },
//     ],
//   ],
//   solution: {
//     model: [
//       {
//         val: '\u003cspan style="font-size: 20px;"\u003eLisa - 4th, John - 1st, Sara - 3rd, and Tom - 2nd\u003c/span\u003e',
//       },
//     ],
//     sidebyside: [],
//     srows: null,
//     scols: null,
//   },
// };
function DisabledTeacherLogicalTableKg({ data,meter }) {
  meter = Number(meter) || 0;
  const [objdata, setObjdata] = useState({});
  const hasAnswerSubmitted = true;
  const handleClick = (row, col) => {
    if (hasAnswerSubmitted) return;
    for (let i = 0; i < Object.keys(objdata).length; i++) {
      if (Object.keys(objdata)[i][1] === `${col}`) {
        delete objdata[Object.keys(objdata)[i]];
      }
    }
    setObjdata({ ...objdata, [`${row}${col}`]: true });
  };
  return (
    <div>
      <div>
        <div className={styles2.questionName}>{parse(data.questionName)}</div>
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div>
          {data.questionContent.map((e, i) => (
            <div className={styles.basic}>
              {e.map((item, index) => {
                return (
                  <div>
                    {item.isMissed === "" ? (
                      <div></div>
                    ) : (
                      <div className={styles.inner}>
                        <div
                          className={styles.circle}
                          onClick={() => {
                            handleClick(i, index);
                          }}
                        >
                          {Object.keys(objdata).includes(`${i}${index}`) ? (
                            <div className={styles.green}></div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisabledTeacherLogicalTableKg;
