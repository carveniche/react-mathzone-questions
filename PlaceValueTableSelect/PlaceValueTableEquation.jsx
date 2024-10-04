import React, { useContext, useRef, useState } from "react";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SolveButton from "../SolveButton";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
import ContentPlaceValueTableSelect from "./ContentPlaceValueTableSelect";
import PlaceValueTableDragDrop from "./PlaceValueTableChoiceType/PlaceValueTableDragDrop/PlaceValueTableDragDrop";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import PlaceValueTableSelectChoice from "./PlaceValueTableChoiceType/PlaceValueTableSelectChoice/PlaceValueTableSelectChoice";
import {
  findSelectedValue,
  manupulateEquationTypeQuestion1D,
  manupulateQuestionContent1Darray,
  manupulateQuestionContentHorizontal,
} from "../../CommonJSFiles/ManupulateJsonData/commonManupulateJsonData";
import {
  addLazyLoading,
  removeUnwantedTags,
  serializeResponse,
} from "../../CommonJSFiles/gettingResponse";
import CompareTwoValue from "../compareTwoValue";
import ContentPlaceValueTableSelectEquation from "./ContentPlaceValueTableSelectEquation";

import { useEffect } from "react";
import { collectDataAtCompileTimed } from "./CollectAnswerdataplacevalueequation";
import compareLatexData from "../../CommonJSFiles/compareLatexData";
import {
  manupulateEquationTypeQuestion2Darr,
  manupulateQuestionContent1Darrayed,
} from "../commonScript/commonScript";

const changeAnswerStatus = (
  val,
  setIsAnswerCorrect,
  setHasAnswerSubmitted,
  setStudentAnswerQuestion,
  setRedAlert
) => {
  if (val === 0) {
    setRedAlert(true);
    return;
  } else if (val === 1) setIsAnswerCorrect(false);
  else setIsAnswerCorrect(true);
  let jsonData = serializeResponse("studentAnswerResponse");
  setStudentAnswerQuestion(jsonData);
  setHasAnswerSubmitted(true);
};

const ValidationForDragDrop = (content) => {
  for (let rows of content) {
    for (let items of rows) {
      if (items.isMissed == "true") {
        if (!items.show) return 0;
      }
    }
  }
  for (let rows of content) {
    for (let items of rows) {
      if (items.isMissed == "true") {
        if (String(items.dropVal).trim() != String(items.value).trim())
          return 1;
      }
    }
  }
  return 2;
};

const ValidationForSelectChoice = (choices) => {
  let val = null;
  for (let items of choices) {
    if (items?.show) {
      if (items?.show) {
        if (items?.option == "true") return 2;
        else return 1;
      }
    }
  }
  return 0;
};

export default function PlaceValueTableEquation({ state, totalRows, meter }) {
  const equationKeyingRef = useRef({});
  const [newData, setNewData] = useState({});

  meter = Number(meter) || 0;
  let totalEmptyBox = 0;
  console.log("this is state", state);

  state.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );

  const inputRef = useRef(new Array(totalEmptyBox));
  const inputRefs = useRef([]);
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  const input2Ref = useRef();

  const validationForKeying = (newData, choices, equationObj) => {
    console.log("this is equationtype", equationObj);
    for (let key in newData) {
      if (newData[key]) {
        if (!choices[key]) return 0;
      }
    }
    for (let key in newData) {
      console.log(newData[key]);
      if (newData[key]) {
        if (!choices[key]) return 0;
      }
    }
    for (let key in equationObj) {
      if (equationObj[key].includes("\\ "))
        equationObj[key] = equationObj[key].replaceAll("\\ ", "");
    }

    for (let key in newData) {
      if (newData[key]) {
        if (!choices[key]) return 0;
        else if (equationObj?.hasOwnProperty(key)) {
          if (
            !compareLatexData(
              String(newData[key]).trim()?.toLowerCase(),
              String(equationObj[key]).trim()?.toLowerCase()
            )
          )
            return 1;
        } else if (
          String(newData[key]).trim()?.toLowerCase() !==
          String(choices[key]).trim()?.toLowerCase()
        ) {
          return 1;
        }
      }
    }
    return 2;
  };

  const changeStateAfterValidation = (
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    val,
    setRedAlert
  ) => {
    if (val === 0) {
      setRedAlert(true);
      return;
    } else if (val === 1) {
      setIsAnswerCorrect(false);
    } else setIsAnswerCorrect(true);
    setHasAnswerSubmitted(true);
  };

  function removeFalseValues(obj) {
    const newObj = {}; // Create a new object to store filtered key-value pairs
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== false) {
        newObj[key] = obj[key]; // Copy key-value pair to new object if value is not false
      }
    }
    return newObj; // Return the new object with filtered key-value pairs
  }

  const handleSubmitAnswer = () => {
    if (hasAnswerSubmitted) return;
    setRedAlert(false);

    if (state?.choiceType == "keying") {
      console.log("inside keying");
      console.log("this is actual new Data", newData);
      console.log("input ref", inputRef.current);
      console.log("equationkeyingref", equationKeyingRef.current);
      const filteredData = removeFalseValues(newData);
      console.log("this is filterdata", filteredData);

      let inputslengths = Object.keys(inputRef.current).length;
      let filteredDataLength = Object.keys(filteredData).length;

      if (inputslengths !== filteredDataLength) {
        setRedAlert(true);
        return;
      }

      let isValid = true;
      // Check if every key has a non-empty value
      for (const key in inputRef.current) {
        if (inputRef.current.hasOwnProperty(key)) {
          if (inputRef.current[key].trim() === "") {
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) {
        setRedAlert(true);
        return;
      }

      let status = validationForKeying(
        newData,
        inputRef.current,
        equationKeyingRef.current
      );
      console.log("this is status", status);

      changeStateAfterValidation(
        setHasAnswerSubmitted,
        setIsAnswerCorrect,
        status,
        setRedAlert
      );

      if (status != 0) {
        console.log("this is state", state);
        console.log(
          "this is state questioncontent",
          JSON.parse(JSON.stringify(state?.questionContent))
        );
        console.log(
          "this is state questioncontent old",
          state?.questionContent
        );

        console.log("this is inputRef current", inputRef?.current);

        let result = manupulateEquationTypeQuestion2Darr(
          state?.questionContent,
          inputRef?.current,
          "value"
        );
        console.log("this is first result", result);
        result = manupulateQuestionContent1Darrayed(result);

        console.log("this is second result", result);
        setQuestionWithAnswer({ ...state, questionContent: result });
      }

      {
        //  console.log('this is input2Ref.current ',input2Ref.current);
        setHasAnswerSubmitted(true);
        // setQuestionWithAnswer({...state,questionContent:input2Ref.current})
        return;
      }

      setQuestionWithAnswer({ ...state, questionContent: input2Ref.current });
      setIsAnswerCorrect(true);
      setHasAnswerSubmitted(true);
      return;
    } else if (state?.choiceType == "dragdrop") {
      let val = ValidationForDragDrop(inputRef?.current);
      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if (val !== 0) {
        let result = manupulateQuestionContentHorizontal(
          inputRef?.current,
          "dropVal"
        );
        setQuestionWithAnswer({ ...state, questionContent: result });
      }
    } else if (state?.choiceType == "selectchoice") {
      let val = ValidationForSelectChoice(inputRef?.current);
      changeAnswerStatus(
        val,
        setIsAnswerCorrect,
        setHasAnswerSubmitted,
        setStudentAnswerQuestion,
        setRedAlert
      );
      if (val !== 0) {
        let value = findSelectedValue(inputRef?.current, "value");
        setQuestionWithAnswer({ ...state, [student_answer]: value });
      }
    }
  };

  const [redAlert, setRedAlert] = useState(false);

  useEffect(() => {
    let arr = collectDataAtCompileTimed(state?.questionContent);
    console.log("this is  new data ", arr);
    setNewData({ ...arr });
  }, []);

  var questionTextFormatted = removeUnwantedTags(state?.questionName);
  questionTextFormatted = addLazyLoading(questionTextFormatted);
  console.log("questionTextFormatted", { questionTextFormatted });
  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {/* {parse(state?.questionName, optionSelectStaticMathField)} */}
          {parse(questionTextFormatted, optionSelectStaticMathField)}
        </div>
        {state?.upload_file_name && (
          <div>
            <img  loading="lazy" src={state?.upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div className={styles.contentParent}>
          {state?.choiceType == "keying" ? (
            <ContentPlaceValueTableSelectEquation
              inputRefs={inputRefs}
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              input2Ref={input2Ref}
              equationKeyingRef={equationKeyingRef}
            />
          ) : state?.choiceType == "dragdrop" ? (
            <PlaceValueTableDragDrop
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
            />
          ) : state?.choiceType == "selectchoice" ? (
            <PlaceValueTableSelectChoice
              content={state.questionContent}
              totalRows={Number(totalRows)}
              inputRef={inputRef}
              totalEmptyBox={totalEmptyBox}
              hasAnswerSubmitted={hasAnswerSubmitted}
              questionHead={state.questiontbHead}
              totalCols={Number(state?.cols)}
              choices={state?.choices}
              studentAnswer={state[student_answer] || ""}
            />
          ) : (
            <h1>Coming soon</h1>
          )}
        </div>
      </div>
    </div>
  );
}
