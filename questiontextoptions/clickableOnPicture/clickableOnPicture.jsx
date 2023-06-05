import { Pattern } from "./pattern";
import styles from "./clickableOnPicture.module.css";
import styles2 from "../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import SolveButton from "../../SolveButton";
import styled from "styled-components";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
// let data = {
//   operation: "addition",
//   type: "questiontextoptions",
//   questionName: "Which picture shows 6?",
//   row: 1,
//   col: 2,
//   questionContent: [
//     [
//       {
//         row: 1,
//         col: 1,
//         value:
//           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/10-Camel.png"\u003e',
//         count: "8",
//         selected: "true",
//       },
//       {
//         row: 1,
//         col: 2,
//         value:
//           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/04-Zebra.png"\u003e',
//         count: "7",
//         selected: "false",
//       },
//     ],
//   ],
//   solution: { model: [] },
//   arrangement: "regular",
//   answerValue: "true",
// };

export const ClickableOnPic = ({ data, meter }) => {
  meter = Number(meter) || 0;
  const [questionContent, setQuestionContent] = useState([]);
  const [selectedAnswer,setSelectedAnswer]=useState("")
 
  useEffect(() => {
    let totalRows = Number(data?.row) || 0;
    let arr = [];
    let studentAnswer=""
    for (let i = 0; i < totalRows; i++) {
      data?.questionContent[i]?.map((item, j) => {
        if(item?.selected==="true"){
studentAnswer=item[student_answer]
        }
        item?.row == i + 1 &&
          item.col == j + 1 &&
          arr.push({ ...item, show: false });
      });
    }
    
    setQuestionContent([...arr]);
  }, []);
  const [redAlert,setRedAlert]=useState(false)
  const [prevStatus, setPrevStatus] = useState(-1);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer
  } = useContext(ValidationContext);
  const handleClick = (index) => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    setPrevStatus(index);
   
    setSelectedAnswer(questionContent[index]?.count)
  };

  const checkAnswer = () => {
    if (hasAnswerSubmitted||isStudentAnswerResponse) return;
    if (prevStatus == -1) {
      setRedAlert(true)
      return;
    }
    if (questionContent[prevStatus].selected == "true")
      setIsAnswerCorrect(true);
    else setIsAnswerCorrect(false);
    setQuestionWithAnswer({...data,[student_answer]:selectedAnswer})
    setHasAnswerSubmitted(true);
  };

  return (
    <div>
     {!isStudentAnswerResponse&& <SolveButton onClick={checkAnswer} />}
      {redAlert&&!hasAnswerSubmitted&& <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles2.questionName}>{parse(data?.questionName)}</div>
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
         <ConditionOnProgressBar meter={meter} />
        </div>
        <div>
          <div
            totalCols={Number(data?.col) || 0}
            className={styles2.QuestiontextoptionsGrid}
            style={{
              gridTemplateColumns: `repeat(${Number(data?.col) || 1}, 1fr)`,
            }}
          >
            {questionContent?.map((e, i) => {
              return (
                <div
                  className={styles.frame}
                  style={{
                    background:(isStudentAnswerResponse&&String(e?.count)===String(data[student_answer])?.trim())?"blue": prevStatus == i ? "blue" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClick(i);
                  }}
                >
                  <Pattern
                    count={questionContent[i]?.count}
                    imgUrl={questionContent[i]?.value}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  max-width: 90%;
  gap: 1rem;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
`;
