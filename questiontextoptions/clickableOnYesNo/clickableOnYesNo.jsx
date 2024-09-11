import { useContext, useState } from "react";
import styles from "./clickableOnYesNo.module.css";
import styles2 from "../../OnlineQuiz.module.css";

import { Pattern } from "./pattern";
import SolveButton from "../../SolveButton";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../../CommonJSFiles/CustomAlertBoxMathZone";
import ConditionOnProgressBar from "../../../CommonJsxComponent/ConditionOnProgressBar";
import { student_answer } from "../../../CommonJSFiles/ManupulateJsonData/oneDto2D";
export const ClickableOnYesNo = ({ data, meter }) => {
  meter = Number(meter) || 0;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer,
  } = useContext(ValidationContext);

  const handleClick = (val) => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    if (data.answer === val) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

    setChoices(val);
  };
  const [choices, setChoices] = useState("");
  const [redAlert, setRedAlert] = useState(false);
  const handleSubmit = () => {
    if (hasAnswerSubmitted || isStudentAnswerResponse) return;
    if (choices === "") {
      setRedAlert(true);
      return;
    }
    setQuestionWithAnswer({ ...data, [student_answer]: choices });
    setHasAnswerSubmitted(true);
  };
  const fontSizeDynamic = (text) => {
    const length = text.length;

    if (length > 10) {
      return "12px";
    } else if (length > 5) {
      return "18px";
    } else {
      return "24px";
    }
  };
  return (
    <div>
      {!isStudentAnswerResponse && <SolveButton onClick={handleSubmit} />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles2.questionName}>
          {HtmlParser(data?.questionName)}
        </div>
        {data?.upload_file_name && (
          <div>
            <img src={data?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4rem",
              margin: "2rem 0",
            }}
          >
            {data.questionContent[0].map((e, i) => {
              return (
                <div className={styles.frame} key={i}>
                  <Pattern
                    count={data.questionContent[0][i].count}
                    imgUrl={data.questionContent[0][i].img}
                  />
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
           
            <div
              //   ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
              onClick={() => {
                handleClick("yes");
              }}
              className={styles2.choiceItem}
              style={{
                position: "relative",
                cursor: "pointer",
                outline: choices === "yes" ? "4px solid yellow" : "none",
                borderRadius: "50%",
                padding: "0",
              }}
            >
              <img
                src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
                alt="Mushroom"
                className={styles2.choiceImage}
              />
              <div
                className={styles2.choiceText}
                style={{ fontSize: fontSizeDynamic("Yes") }}
              >
                Yes
              </div>
            </div>
            <div
              //   ref={(el) => (selectOptionsChoiceRef.current[index] = el)}
              onClick={() => {
                handleClick("no");
              }}
              className={styles2.choiceItem}
              style={{
                position: "relative",
                cursor: "pointer",
                outline: choices === "no" ? "4px solid yellow" : "none",
                borderRadius: "50%",
                padding: "0",
              }}
            >
              <img
                src="https://d325uq16osfh2r.cloudfront.net/games/Mushroom.gif"
                alt="Mushroom"
                className={styles2.choiceImage}
              />
              <div
                className={styles2.choiceText}
                style={{ fontSize: fontSizeDynamic("No") }}
              >
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
