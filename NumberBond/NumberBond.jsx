import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./NumberBond.module.css";
import parse from "html-react-parser";
import styles2 from "../OnlineQuiz.module.css";
import NumberBondKeyingChoiceType from "./ChoiceType/NumberBondKeyingChoiceType";
import NumberBondSelctChoice from "./ChoiceType/NumberBondSelctChoice";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { ProgressBorder } from "../../Modal2/modal2";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import { findSelectedValue,numberQuestionContentQuestionContent  } from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
const validationForKeyingType = (arr1, arr2) => {
  for (let item of arr2) {
    if (item?.isMissed == "true") {
      if (
        !arr1[`${item?.row} ${item?.col}`] ||
        !String(arr1[`${item?.row} ${item?.col}`]).trim()
      ) {
        return 0;
      } else if (
        !CompareTwoValue(arr1[`${item?.row} ${item?.col}`], item?.value)
      )
        return 1;
    }
  }
  return 2;
};
const changeAnswerStatus = (
  val,
  setIsAnswerCorrect,
  setHasAnswerSubmitted,
  setRedAlert
) => {
  if (val === 0) {
    setRedAlert(true);
    return;
  } else if (val === 1) setIsAnswerCorrect(false);
  else setIsAnswerCorrect(true);
  setHasAnswerSubmitted(true);
};
const ValidationForSelectChoice = (arr2, choices) => {
  let val = null;
  for (let item of choices) {
    if (item.show) {
      val = item.value;
      break;
    }
  }
  if (val === null) return 0;

  for (let item of arr2) {
    if (item?.isMissed == "true") {
      if (item?.value == val) return 2;
      else return 1;
    }
  }
};
export default function NumberBond({ obj, meter }) {
  meter = Number(meter) || 0;
  const [redAlert, setRedAlert] = useState(false);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    isStudentAnswerResponse,
    setQuestionWithAnswer
  } = useContext(ValidationContext);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (hasAnswerSubmitted) {
      return;
    }
    if (obj?.choiceType == "keying") {
      let val = validationForKeyingType(
        inputRef?.current,
        obj?.questionContent
      );

      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setRedAlert
      );
      if(val!==0){
        let result=numberQuestionContentQuestionContent(obj?.questionContent,inputRef.current)
        console.log(result)
        setQuestionWithAnswer({...obj,questionContent:result})
      }
      return;
    } else if (obj?.choiceType == "selectchoice") {
      let val = ValidationForSelectChoice(
        obj?.questionContent,
        inputRef?.current
      );
      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setRedAlert
      );
      if(val!==0){
        let value=findSelectedValue(inputRef?.current,"value")
        setQuestionWithAnswer({...obj,[student_answer]:value})
      }
      return;
    } else {
      console.log("unsupported files types");
    }
  };

  return (
    <div className={styles.MainTree} answerHasSelected={hasAnswerSubmitted}>
     {!isStudentAnswerResponse&& <SolveButton onClick={handleSubmit} />}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        {String(obj?.questionName).trim() && (
          <div className={styles2.questionName}>{parse(obj?.questionName)}</div>
        )}
        {obj?.upload_file_name && (
          <div>
            <img src={obj?.upload_file_name} alt="image not found" />
          </div>
        )}
        {Boolean(String(obj?.questionContentText).trim()) && (
          <div className={styles2.questionName} style={{ marginTop: "0.2rem" }}>
            {parse(obj?.questionContentText)}
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter}/>
        </div>

        {obj?.isTableView === "true" && (
          <div className={styles.tableFlex}>
            {obj?.questionContent?.map(
              (item, i) =>
                i < 5 && (
                  <div>
                    {item?.isMissed === "false" ? (
                      item?.value
                    ) : (
                      <input disabled={true} />
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {obj?.choiceType === "keying" ? (
          <NumberBondKeyingChoiceType datas={obj} inputRef={inputRef} />
        ) : obj?.choiceType === "selectchoice" ? (
          <NumberBondSelctChoice datas={obj} inputRef={inputRef} studentAnswer={obj[student_answer]}/>
        ) : (
          <h1>Coming Soon...</h1>
        )}
      </div>
    </div>
  );
}
