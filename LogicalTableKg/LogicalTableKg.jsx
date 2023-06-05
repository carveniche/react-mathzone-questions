import parse from "html-react-parser";
import styles from "./custom.module.css";
import { useContext, useState } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SolveButton from "../SolveButton";
import styles2 from "../OnlineQuiz.module.css";
import { serializeResponse } from "../../CommonJSFiles/gettingResponse";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { logicalTableKgQuestionContent } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
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
function LogicalTableKg({data, meter }) {
  meter = Number(meter) || 0;
  const [objdata, setObjdata] = useState({});
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,setQuestionWithAnswer
  } = useContext(ValidationContext);
  const handleClick = (row, col) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    for (let i = 0; i < Object.keys(objdata).length; i++) {
      if (Object.keys(objdata)[i][1] === `${col}`) {
        delete objdata[Object.keys(objdata)[i]];
      }
    }
    setObjdata({ ...objdata, [`${row}${col}`]: true });
  };
  const handleSubmit = () => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    if (Object.keys(objdata).length !== data.questionContent.length - 1) {
      setRedAlert(true)
      return;
    }
    let arr = [];
    for (let i = 0; i < data.questionContent.length; i++) {
      for (let j = 0; j < data.questionContent[i].length; j++) {
        if (data.questionContent[i][j].isMissed === true) {
          arr.push(
            `${data.questionContent[i][j].row}${data.questionContent[i][j].col}`
          );
        }
      }
    }

    if (
      JSON.stringify(arr.sort()) === JSON.stringify(Object.keys(objdata).sort())
    ) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    let result=logicalTableKgQuestionContent(data?.questionContent,objdata)
    setQuestionWithAnswer({...data,questionContent:result})
    let jsonData = serializeResponse("studentAnswerResponse");
    setStudentAnswerQuestion(jsonData);
    setHasAnswerSubmitted(true);
  };
  const [redAlert,setRedAlert]=useState(false)
  return (
    <div className={styles.student_answer_mathzone}>
      {!isStudentAnswerResponse&&<SolveButton
        onClick={handleSubmit}
        answerHasSelected={hasAnswerSubmitted}
      />}
        {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles2.questionName}>{parse(data.questionName)}</div>
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <table>
         
          {data.questionContent.map((e, i) => (
          <tr>
              
              {e.map((item, index) => {
                return (
                  <td>
                    <div>
                    {(item.isMissed===""||item.isMissed===undefined)? (
                      <div className={styles.inner} style={{flexDirection:'column',color:'indigo'}}>
                       
                        <div>{parse(item?.image)} </div>
                        <div>{parse(item?.text)}</div>
                      </div>
                    ) : (
                      <div className={styles.inner}>
                        <div
                          className={styles.circle}
                          onClick={() => {
                            handleClick(i, index);
                          }}
                        >
                          {(Object.keys(objdata).includes(`${i}${index}`)||(isStudentAnswerResponse&&item[student_answer])) ? (
                            <div className={styles.green}></div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                  </td>
                );
              })}
          
          </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default LogicalTableKg;
