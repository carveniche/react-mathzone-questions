import React, { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from"../CommonJsxComponent/ConditionOnProgressBar";
import SelectChoice from "../ChoicesType/SelectChoice/SelectChoice";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { StaticMathField } from "../CommonJSFiles/ExternalPackages";
import SelectChoiceHorizontalFillUpsEquationType from "../HorizontalFillUpsEquationType/ChoiceTypeHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType/SelectChoiceHorizontalFillUpsEquationType";
import SpeakQuestionText from "../CommonFiles/PatternMatchers/SpeakQuestionText";
import LineDesign from "./LineDesign";

export default function NumberLineMapping({ question, meter }) {
  var choiceType = question.choiceType;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    readQuestionText,
    setCurrectAnswer
  } = useContext(ValidationContext);
  
  const [studAns, setStudAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [redAlert, setRedAlert] = useState(false);
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);
  var isDecimal =
    parseFloat(question.interval) % 1 > 0 &&
    parseFloat(question.interval) % 1 < 1;
  var start = isDecimal ? parseFloat(question.start) : parseInt(question.start);
  var end = isDecimal ? parseFloat(question.end) : parseInt(question.end);
  var interval = isDecimal
    ? parseFloat(question.interval)
    : parseInt(question.interval);
  var choices = question.choices?.map((choice) => choice.toString());

  const [lines, setLines] = useState([]);
  var answers = [];

  const inputRef = useRef(new Array(totalEmptyBox));
  var numsDisplayed = question.numbersDisplayed;

  function handleSubmitAnswer() {
    var isWrong = false;
    var isEmpty = false;
    var student_answer ;
     if (choiceType == "mapping" && !isWrong && !isEmpty) {
      if (studAns.length != question.ansArray.length) isEmpty = true;
      studAns.forEach((ans) => {
        if (!question.ansArray.includes(ans)) {
          isWrong = true;
        }
      });
    } 

    if (isEmpty) {
      setRedAlert(true);
      return;
    } else setRedAlert(false);
    if (hasAnswerSubmitted) return;
    if (isWrong) setIsAnswerCorrect(false);
    else setIsAnswerCorrect(true);
    setHasAnswerSubmitted(true);
    setAnswered(true);
    const studentFinalAnswer = studAns.length > 0 ? studAns : student_answer;
    setQuestionWithAnswer({ ...question, "student_answer": studentFinalAnswer });
  }

    function generateNumberLine(start, end, interval,isFraction) {

      if(isFraction){
        return fracGenerateNumberLine(start, end, interval, true);
      }
        const decimals = getDecimalPlaces(Number(interval)); // ✅ ONLY interval
        const scale = Math.pow(10, decimals);

        const s = Math.round(start * scale);
        const e = Math.round(end * scale);
        const step = Math.round(interval * scale);
        const result = [];

        for (let i = s; i <= e; i += step) {
            const value = i / scale;
            const isDecimalVal = isDecimalNumber(value);

            result.push({
                value,                       // numeric (logic)
                label: isDecimalVal ? value.toFixed(decimals) : value.toString() // string (display)
            });
        }

        return result;
    }

       function fracGenerateNumberLine(start, end, interval, isFraction) {
        const result = [];

        start = Number(start);
        end = Number(end);
        interval = Number(interval);

        let step;

        if (isFraction) {
            step = 1 / interval;        // ✅ critical fix
        } else {
            step = interval;
        }

        let current = start;

        while (current <= end + 0.000001) {
            const rounded = Number(current.toFixed(6));

            result.push({
                value: rounded,
                label: rounded.toString()
            });

            current += step;
        }

        return result;
    }
    
   

    function isDecimalNumber(num) {
        return num % 1 !== 0;
    }

    function getDecimalPlaces(num) {
        const str = num.toString();
        return str.includes(".") ? str.split(".")[1].length : 0;
    }


  function setFractionsSelected(e) {
    if (choiceType !== "mapping") return;
    if (hasAnswerSubmitted) return;
    let currentElement = e.target;
    var dataSetElement;
    if (currentElement.dataset && currentElement.dataset.fracnum)
      dataSetElement = currentElement;
    else {
      while (currentElement) {
        if (currentElement.dataset["fracnum"]) {
          dataSetElement = currentElement;
          break;
        }
        currentElement = currentElement.parentElement;
      }
    }
    var isNEG = dataSetElement.dataset.isneg || false;
    var pointer = document.getElementById(
      `pBox_${dataSetElement.dataset["fracstart"]} ${dataSetElement.dataset["fracnum"]} ${dataSetElement.dataset["fracinterval"]}`
    );
    {
      choiceType == "mapping" &&
        !answered &&
        Array.from(pointer.classList).forEach((cla) => {
          cla.includes("vertBar")
            ? pointer.classList.add(`${styles.selected}`)
            : pointer.classList.add(`${styles.vertBar}`);
          pointer.classList.remove(cla);
        });
    }

    var answer = `${dataSetElement.dataset["fracstart"]} ${dataSetElement.dataset["fracnum"]} ${dataSetElement.dataset["fracinterval"]}`;

    if (answers.includes(answer))
      answers = answers.filter((item) => !(item === answer));
    else answers.push(answer);

    if (answers.length == 0) setRedAlert(true);
    else setRedAlert(false);
    setStudAnswers(answers);
  }

  function setSelected(e) {
    if (choiceType != "mapping" || hasAnswerSubmitted) return;
    var idOpt = e.target.dataset.option;
    var pointer = document.getElementById(`pBox_${idOpt}`);
    var ansVal = document.getElementById(`pValBox_${idOpt}`);
    {
      choiceType == "mapping" &&
        !answered &&
        Array.from(pointer.classList).forEach((cla) => {
          cla.includes("vertBar")
            ? pointer.classList.add(`${styles.selected}`)
            : pointer.classList.add(`${styles.vertBar}`);
          pointer.classList.remove(cla);
        });
    }
    var sol = isDecimal
      ? parseFloat(ansVal.textContent)
      : parseInt(ansVal.textContent);
    if (answers.includes(sol)) {
      answers = answers.filter((ans) => ans != sol);
    } else {
      answers.push(sol);
    }
    if (answers.length == 0) setRedAlert(true);
    else setRedAlert(false);
    setStudAnswers(answers);
  }
  
  useEffect(() => {
    var lineBlocks = [];
    var index = 0;
    var inp = 0;
    var endIsThere = false;
    setCurrectAnswer(question.ansArray.join(''))
    var fracInterval = parseInt(question.interval);
    var fracStart = parseInt(question.start);
    if (question.isFraction) interval = 1;

         let mark = ""
        let ansLength = 0;
    const numberLineArray = generateNumberLine(question?.start, question?.end, question?.interval,question?.isFraction)
    numberLineArray.forEach(({ value, label }, index) => {
      mark = value;
      let displayVal = label;

        var idddd = `pBox_${index}`;
      var idddd2 = `pValBox_${index}`;
      var num = isDecimal
        ? Number(parseFloat(mark).toFixed(1))
        : parseInt(mark);
      var ansSelected = studAns.includes(num);
      var ansLength = isDecimal
        ? parseFloat(mark).toFixed(1).length
        : parseInt(mark).toString().length;
      if (question.isFraction) {
        if (mark < 0) {
          var fracNum = fracInterval;
          if (mark == start || fracNum == fracInterval) {
            fracNum--;
            var identity = `${fracStart} 0 -${fracInterval}`;
            var fracId = `pBox_${mark} 0 -${fracInterval}`;
            var ptick = (
              <div
                className={` ${`${
                  hasAnswerSubmitted ? styles.answeredSection : styles.section
                }`}`}
                style={{ minWidth: `${fracStart == 0 ? 40 : 45}px` }}
                data-isneg={mark < 0}
                data-fracnum={0}
                data-fracstart={fracStart}
                data-fracinterval={`-${fracInterval}`}
                onClick={(e) => setFractionsSelected(e)}
                key={index}
              >
                <div
                  className={styles.botline}
                  data-isneg={mark < 0}
                  data-fracnum={0}
                  data-fracstart={fracStart}
                  data-fracinterval={`-${fracInterval}`}
                ></div>
                <div
                  className={styles.ticktext}
                  style={{
                    padding:
                      choiceType === "keying" &&
                      question.ansArray.includes(
                        isDecimal
                          ? Number(parseFloat(mark).toFixed(1))
                          : parseInt(mark)
                      )
                        ? 0
                        : "0 .5rem",
                  }}
                  data-isneg={mark < 0}
                  data-fracnum={0}
                  data-fracstart={fracStart}
                  data-fracinterval={`-${fracInterval}`}
                >
                  <div
                    data-isneg={mark < 0}
                    data-fracnum={0}
                    data-fracstart={fracStart}
                    data-fracinterval={`-${fracInterval}`}
                    className={
                      answered
                        ? ansSelected
                          ? styles.ansSelected
                          : styles.answeredVertBar
                        : choiceType == "mapping"
                        ? styles.vertBar
                        : styles.keyVertBar
                    }
                    id={fracId}
                  ></div>
                  {question.ansArray.includes(identity) ? (
                    choiceType === "keying" ? (
                      <input
                        readOnly={hasAnswerSubmitted}
                        style={{ width: `${ansLength * 14}px` }}
                        data-fracinterval={`${fracInterval}`}
                        maxLength={ansLength}
                        className={`${styles.checkNumLine}   ansFracNumsInteger answers`}
                        id={idddd2}
                        type="text"
                      />
                    ) : choiceType == "selectchoice" ? (
                      <p className={styles.qMark}>{`?`}</p>
                    ) : (
                      <p
                        value={mark}
                        className={styles.numMapBox}
                        style={{
                          display: `${
                            numsDisplayed || mark == start ? "block" : "block"
                          }`,
                          top: `${numsDisplayed ? "10px" : "3px"}`,
                        }}
                        id={idddd2}
                      >
                        {" "}
                        <StaticMathField>{mark}</StaticMathField>
                      </p>
                    )
                  ) : (
                    <p
                      className={styles.numMapBox}
                      style={{
                        display: `${
                          numsDisplayed || mark == start ? "block" : "block"
                        }`,
                        top: `${numsDisplayed ? "10px" : "3px"}`,
                      }}
                      id={idddd2}
                    >
                      <StaticMathField>{mark}</StaticMathField>
                    </p>
                  )}
                </div>
              </div>
            );
            lineBlocks.push(ptick);
          }
          while (fracNum >= 1 && fracStart < parseInt(question.end)) {
            var fracSection;
            var idddd;
            var whole;
            var identity;

            if (fracNum == fracInterval) {
              fracSection = `${
                fracStart == -1 ? (fracStart == 0 ? "" : "-") : fracStart
              }`;
              whole = 0;
              identity = `${fracStart} ${whole} -${fracInterval}`;
              idddd = `pBox_${identity}`;
            } else {
              fracSection = `${
                fracStart == -1 ? (fracStart == 0 ? "" : "") : fracStart + 1
              } \\frac{${
                fracStart == -1 ? `-${fracNum}` : fracNum
              }}{${fracInterval}}`;
              identity = `${fracStart + 1} ${fracNum} -${fracInterval}`;
              idddd = `pBox_${identity}`;
            }

            fracNum--;

            var startLength = fracStart.toString().length;
            var numLength = fracNum.toString().length;
            var numLength =
              fracStart == -1
                ? fracNum.toString().length + 1
                : fracNum.toString().length;
            var intLength = fracInterval.toString().length;
            var ptick = (
              <div
                className={`${
                  hasAnswerSubmitted ? styles.answeredSection : styles.section
                }`}
                style={{
                  minWidth: `${
                    fracStart == 0
                      ? 40
                      : question.ansArray.includes(identity)
                      ? 70
                      : 45
                  }px`,
                }}
                data-isneg={mark < 0}
                data-fracnum={(fracNum % fracInterval) + 1}
                data-fracstart={fracStart + 1}
                data-fracinterval={`-${fracInterval}`}
                onClick={(e) => {
                  setFractionsSelected(e);
                }}
                key={index}
              >
                <div
                  className={styles.botline}
                  data-isneg={mark < 0}
                  data-fracnum={(fracNum % fracInterval) + 1}
                  data-fracstart={fracStart + 1}
                  data-fracinterval={`-${fracInterval}`}
                ></div>
                <div
                  className={styles.ticktext}
                  style={{
                    padding:
                      choiceType === "keying" &&
                      question.ansArray.includes(
                        isDecimal
                          ? Number(parseFloat(mark).toFixed(1))
                          : parseInt(mark)
                      )
                        ? 0
                        : "0 .5rem",
                  }}
                  data-isneg={mark < 0}
                  data-fracnum={(fracNum % fracInterval) + 1}
                  data-fracstart={fracStart + 1}
                  data-fracinterval={`-${fracInterval}`}
                >
                  <div
                    data-isneg={mark < 0}
                    data-fracnum={(fracNum % fracInterval) + 1}
                    data-fracstart={fracStart + 1}
                    data-fracinterval={`-${fracInterval}`}
                    className={
                      answered
                        ? ansSelected
                          ? styles.ansSelected
                          : styles.answeredVertBar
                        : choiceType == "mapping"
                        ? styles.vertBar
                        : styles.keyVertBar
                    }
                    id={idddd}
                  ></div>
                  {question.ansArray.includes(identity) ? (
                    choiceType === "keying" ? (
                      <div className={styles.answerNum}>
                        <input
                          readOnly={hasAnswerSubmitted}
                          style={{
                            width: `${startLength * 14}px`,
                            display: fracStart == -1 ? "none" : "block",
                            minWidth: "25px",
                            height: "30px",
                            paddingTop: "5px",
                            fontFamily: "GothamRnd-Book2",
                            textAlign: "center",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "18px",
                          }}
                          maxLength={startLength}
                          className={`answers ansFracNums`}
                          id={"ansFracNum"}
                          type="text"
                        />
                        <div
                          className={styles.answerFrac}
                          style={{
                            display:
                              (fracNum % fracInterval) + 1 == 0 ? "none" : "",
                          }}
                        >
                          <input
                            readOnly={hasAnswerSubmitted}
                            style={{
                              width: `${numLength * 14}px`,
                              minWidth: "26px",
                              height: "30px",
                              paddingTop: "5px",
                              fontFamily: "GothamRnd-Book2",
                              textAlign: "center",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                            maxLength={numLength}
                            className={`answers ansFracStarts`}
                            id={"ansFracStart"}
                            type="text"
                          />
                          <span
                            style={{
                              border: "1px solid #858585",
                              width: "-webkit-fill-available",
                            }}
                          ></span>
                          <input
                            readOnly={hasAnswerSubmitted}
                            style={{
                              width: `${intLength * 14}px`,
                              minWidth: "26px",
                              height: "30px",
                              paddingTop: "5px",
                              fontFamily: "GothamRnd-Book2",
                              textAlign: "center",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                            maxLength={intLength}
                            className={`answers ansFracInts`}
                            id={"ansFracInt"}
                            type="text"
                          />
                        </div>
                      </div>
                    ) : choiceType == "selectchoice" ? (
                      <p className={styles.qMark}>{`?`}</p>
                    ) : (
                      <p
                        value={mark}
                        className={`${
                          fracNum == 0 ? styles.numMapBox : styles.mapBox
                        }       `}
                        style={{
                          display: `${
                            numsDisplayed ||
                            fracStart == end ||
                            (fracNum % fracInterval) + 1 == 0
                              ? "block"
                              : "none"
                          }`,
                          top: `${numsDisplayed ? "3px" : "3px"}`,
                        }}
                        id={idddd2}
                      >
                        <StaticMathField>{fracSection}</StaticMathField>
                      </p>
                    )
                  ) : (
                    <p
                      className={`${
                        fracNum == fracInterval
                          ? styles.numMapBox
                          : styles.mapBox
                      } `}
                      id={idddd2}
                      style={{
                        display: `${
                          numsDisplayed ||
                          fracStart == end ||
                          (fracNum % fracInterval) + 1 == 0
                            ? "block"
                            : "none"
                        }`,
                        top: `${numsDisplayed ? "3px" : "3px"}`,
                      }}
                    >
                      <StaticMathField>{fracSection}</StaticMathField>
                    </p>
                  )}
                </div>
              </div>
            );
            if (fracStart != 0 || fracNum != fracInterval)
              lineBlocks.push(ptick);
          }
          fracStart++;
        } else {
          var fracNum = 1;
          if (mark == start || mark == 0) {
            var identity = `${mark} 0 ${fracInterval}`;
            var fracId = `pBox_${identity}`;
            var ptick = (
              <div
                className={` ${`${
                  hasAnswerSubmitted ? styles.answeredSection : styles.section
                }`}`}
                style={{ minWidth: `${fracStart == 0 ? 40 : 45}px` }}
                data-isneg={mark < 0}
                data-fracnum={0}
                data-fracstart={`${fracStart}`}
                data-fracinterval={fracInterval}
                onClick={(e) => setFractionsSelected(e)}
                key={index}
              >
                <div
                  className={styles.botline}
                  data-isneg={mark < 0}
                  data-fracnum={0}
                  data-fracstart={`${fracStart}`}
                  data-fracinterval={fracInterval}
                ></div>
                <div
                  className={styles.ticktext}
                  style={{
                    padding:
                      choiceType === "keying" &&
                      question.ansArray.includes(
                        isDecimal
                          ? Number(parseFloat(mark).toFixed(1))
                          : parseInt(mark)
                      )
                        ? 0
                        : "0 .5rem",
                  }}
                  data-isneg={mark < 0}
                  data-fracnum={0}
                  data-fracstart={`${fracStart}`}
                  data-fracinterval={fracInterval}
                >
                  <div
                    data-isneg={mark < 0}
                    data-fracnum={0}
                    data-fracstart={`${fracStart}`}
                    data-fracinterval={fracInterval}
                    className={
                      answered
                        ? ansSelected
                          ? styles.ansSelected
                          : styles.answeredVertBar
                        : choiceType == "mapping"
                        ? styles.vertBar
                        : styles.keyVertBar
                    }
                    id={fracId}
                  ></div>
                  {question.ansArray.includes(identity) ? (
                    choiceType === "keying" ? (
                      <input
                        readOnly={hasAnswerSubmitted}
                        style={{ width: `${ansLength * 14}px` }}
                        maxLength={ansLength}
                        className={`${styles.checkNumLine} ansFracNumsInteger  answers  `}
                        id={idddd2}
                        type="text"
                      />
                    ) : choiceType == "selectchoice" ? (
                      <p className={styles.qMark}>{`?`}</p>
                    ) : (
                      <p
                        value={mark}
                        className={styles.numMapBox}
                        style={{
                          display: `${
                            numsDisplayed || mark == start ? "block" : "block"
                          }`,
                          top: `${numsDisplayed ? "10px" : "3px"}`,
                        }}
                        id={idddd2}
                      >
                        {" "}
                        <StaticMathField>{mark}</StaticMathField>
                      </p>
                    )
                  ) : (
                    <p
                      className={styles.numMapBox}
                      style={{
                        display: `${
                          numsDisplayed || mark == start ? "block" : "block"
                        }`,
                        top: `${numsDisplayed ? "10px" : "3px"}`,
                      }}
                      id={idddd2}
                    >
                      <StaticMathField>{mark}</StaticMathField>
                    </p>
                  )}
                </div>
              </div>
            );
            lineBlocks.push(ptick);
          }
          while (
            fracNum <= fracInterval &&
            fracStart < parseInt(question.end)
          ) {
            var fracSection;
            var idddd;
            var whole;
            var identity;

            if (fracNum == fracInterval) {
              fracStart++;
              fracSection = `${fracStart == 0 ? "" : fracStart}`;
              whole = 0;
              identity = `${fracStart} ${whole} ${fracInterval}`;
              idddd = `pBox_${identity}`;
            } else {
              fracSection = `${
                fracStart == 0 ? "" : fracStart
              } \\frac{${fracNum}}{${fracInterval}}`;
              identity = `${fracStart} ${fracNum} ${fracInterval}`;
              idddd = `pBox_${identity}`;
            }

            var startLength = fracStart.toString().length;
            var numLength = fracNum.toString().length;
            var intLength = fracInterval.toString().length;
            var ptick = (
              <div
                className={`${
                  hasAnswerSubmitted ? styles.answeredSection : styles.section
                }`}
                style={{
                  minWidth: `${
                    fracStart == 0
                      ? 40
                      : question.ansArray.includes(identity)
                      ? 70
                      : 45
                  }px`,
                }}
                data-isneg={mark < 0}
                data-fracnum={fracNum % fracInterval}
                data-fracstart={`${fracStart}`}
                data-fracinterval={fracInterval}
                onClick={(e) => {
                  setFractionsSelected(e);
                }}
                key={index}
              >
                <div
                  className={styles.botline}
                  data-fracnum={fracNum % fracInterval}
                  data-isneg={mark < 0}
                  data-fracstart={`${fracStart}`}
                  data-fracinterval={fracInterval}
                ></div>
                <div
                  className={styles.ticktext}
                  data-isneg={mark < 0}
                  style={{
                    padding:
                      choiceType === "keying" &&
                      question.ansArray.includes(
                        isDecimal
                          ? Number(parseFloat(mark).toFixed(1))
                          : parseInt(mark)
                      )
                        ? 0
                        : "0 .5rem",
                  }}
                  data-fracnum={fracNum % fracInterval}
                  data-fracstart={`${fracStart}`}
                  data-fracinterval={fracInterval}
                >
                  <div
                    data-isneg={mark < 0}
                    data-fracnum={fracNum % fracInterval}
                    data-fracstart={`${fracStart}`}
                    data-fracinterval={fracInterval}
                    className={
                      answered
                        ? ansSelected
                          ? styles.ansSelected
                          : styles.answeredVertBar
                        : choiceType == "mapping"
                        ? styles.vertBar
                        : styles.keyVertBar
                    }
                    id={idddd}
                  ></div>
                  {question.ansArray.includes(identity) ? (
                    choiceType === "keying" ? (
                      <div className={styles.answerNum}>
                        <input
                          readOnly={hasAnswerSubmitted}
                          style={{
                            width: `${startLength * 14}px`,
                            display:
                              mark == 0 && fracStart == 0 ? "none" : "block",
                            minWidth: "25px",
                            height: "30px",
                            paddingTop: "5px",
                            fontFamily: "GothamRnd-Book2",
                            textAlign: "center",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "18px",
                          }}
                          maxLength={startLength}
                          className={`answers  ansFracNums`}
                          id={"ansFracNum"}
                          type="text"
                        />
                        <div
                          className={styles.answerFrac}
                          style={{
                            display: fracNum % fracInterval == 0 ? "none" : "",
                          }}
                        >
                          <input
                            readOnly={hasAnswerSubmitted}
                            style={{
                              width: `${numLength * 14}px`,
                              minWidth: "26px",
                              height: "30px",
                              paddingTop: "5px",
                              fontFamily: "GothamRnd-Book2",
                              textAlign: "center",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                            maxLength={numLength}
                            className={`answers ansFracStarts`}
                            id={"ansFracStart"}
                            type="text"
                          />
                          <span
                            style={{
                              border: "1px solid #858585",
                              width: "-webkit-fill-available",
                            }}
                          ></span>
                          <input
                            readOnly={hasAnswerSubmitted}
                            style={{
                              width: `${intLength * 14}px`,
                              minWidth: "26px",
                              height: "30px",
                              paddingTop: "5px",
                              fontFamily: "GothamRnd-Book2",
                              textAlign: "center",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "18px",
                            }}
                            maxLength={intLength}
                            className={`answers ansFracInts`}
                            id={"ansFracInt"}
                            type="text"
                          />
                        </div>
                      </div>
                    ) : choiceType == "selectchoice" ? (
                      <p className={styles.qMark}>{`?`}</p>
                    ) : (
                      <p
                        value={mark}
                        className={`${
                          fracNum == 0 ? styles.numMapBox : styles.mapBox
                        }       `}
                        style={{
                          display: `${
                            numsDisplayed ||
                            fracStart == end ||
                            fracNum % fracInterval == 0
                              ? "block"
                              : "none"
                          }`,
                          top: `${numsDisplayed ? "10px" : "3px"}`,
                        }}
                        id={idddd2}
                      >
                        <StaticMathField>{fracSection}</StaticMathField>
                      </p>
                    )
                  ) : (
                    <p
                      className={`${
                        fracNum == fracInterval
                          ? styles.numMapBox
                          : styles.mapBox
                      } `}
                      id={idddd2}
                      style={{
                        display: `${
                          numsDisplayed ||
                          fracStart == end ||
                          fracNum % fracInterval == 0
                            ? "block"
                            : "none"
                        }`,
                        top: `${numsDisplayed ? "10px" : "3px"}`,
                      }}
                    >
                      <StaticMathField>{fracSection}</StaticMathField>
                    </p>
                  )}
                </div>
              </div>
            );
            if (fracStart != 0 || fracNum != fracInterval)
              lineBlocks.push(ptick);
            fracNum++;
          }
        }
      } else {
        if (
          (isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)) ==
          (isDecimal ? parseFloat(end).toFixed(1) : parseInt(end))
        )
          endIsThere = true;
        var ptick = (
          <div
            className={`${
              hasAnswerSubmitted ? styles.answeredSection : styles.section
            }`}
            style={{ minWidth: "45px" }}
            data-option={index}
            onClick={(e) =>  setSelected(e)}
            key={index}
          >
            <div className={styles.botline} data-option={index}></div>
            <div
              className={styles.ticktext}
              style={{
                padding:
                  choiceType === "keying" &&
                  question.ansArray.includes(
                    isDecimal
                      ? Number(parseFloat(mark).toFixed(1))
                      : parseInt(mark)
                  )
                    ? 0
                    : "0 .5rem",
              }}
              data-option={index}
            >
              <div
                data-option={index}
                className={
                  answered
                    ? ansSelected
                      ? styles.ansSelected
                      : styles.answeredVertBar
                    : choiceType == "mapping"
                    ? styles.vertBar
                    : styles.keyVertBar
                }
                id={idddd}
              ></div>
              {question.ansArray.includes(
                isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
              ) ? (
                choiceType === "keying" ? (
                  <input
                    readOnly={hasAnswerSubmitted}
                    style={{ width: `${ansLength * 14}px` }}
                    data-option={index}
                    maxLength={ansLength}
                    className={`${styles.checkNumLine} ansFracNumsInteger  answers`}
                    id={idddd2}
                    type="text"
                  />
                ) : choiceType == "selectchoice" ? (
                  <p className={styles.qMark}>{`?`}</p>
                ) : (
                  <p
                    value={mark}
                    className={styles.mapBox}
                    data-option={index}
                    style={{
                      display: `${
                        numsDisplayed || index == 0 ? "block" : "none"
                      }`,
                    }}
                    id={idddd2}
                  >
                    {displayVal}
                  </p>
                )
              ) : (
                <p
                  className={styles.mapBox}
                  data-option={index}
                  id={idddd2}
                  style={{
                    display: `${
                      numsDisplayed ||
                      index == 0 ||
                      Number(displayVal) ==
                        (isDecimal
                          ? Number(parseFloat(end).toFixed(1))
                          : parseInt(end))
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  {displayVal}
                </p>
              )}
            </div>
          </div>
        );
        if (choiceType === "keying") inp++;
        lineBlocks.push(ptick);
        index++;
      }
    })

    if (!endIsThere && !question.isFraction) {
      var idddd = `pBox_${index}`;
      var idddd2 = `pValBox_${index}`;
      var num = isDecimal
        ? Number(parseFloat(mark).toFixed(1))
        : parseInt(mark);
      var ansSelected = studAns.includes(num);
      var ptick = (
        <div
          className={`${
            hasAnswerSubmitted ? styles.answeredSection : styles.section
          }`}
          style={{ minWidth: "40px" }}
          data-option={index}
          onClick={(e) => setSelected(e)}
          key={index}
        >
          <div className={styles.botline} data-option={index}></div>
          <div className={styles.ticktext} data-option={index}>
            <div
              className={
                answered
                  ? ansSelected
                    ? styles.ansSelected
                    : styles.answeredVertBar
                  : choiceType == "mapping"
                  ? styles.vertBar
                  : styles.keyVertBar
              }
              data-option={index}
              id={idddd}
            ></div>
            {question.ansArray.includes(
              isDecimal ? Number(parseFloat(end).toFixed(1)) : parseInt(end)
            ) ? (
              choiceType === "keying" ? (
                <input
                  readOnly={hasAnswerSubmitted}
                  inputmode="numeric"
                  style={{ width: `${ansLength * 14}px` }}
                  data-option={index}
                  maxLength={parseFloat(mark).toFixed(1).length}
                  className={`${styles.checkNumLine}  answers`}
                  id={`pBox_${index}`}
                  type="text"
                />
              ) : (
                <p data-option={index} className={styles.mapBox} id={idddd2}>
                  {isDecimal
                    ? Number(parseFloat(end).toFixed(1))
                    : parseInt(end)}
                </p>
              )
            ) : (
              <p className={styles.mapBox} id={idddd2} data-option={index}>
                {isDecimal ? Number(parseFloat(end).toFixed(1)) : parseInt(end)}
              </p>
            )}
          </div>
        </div>
      );
      lineBlocks.push(ptick);
    }
    setLines(lineBlocks);
  }, [hasAnswerSubmitted]);

  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}
      {redAlert && <CustomAlertBoxMathZone />}
      <div id="studentAnswerResponse" style={{ display: "flex" }}>
        <div style={{ maxWidth: "100%" }}>
          <div className={styles.questionName} style={{ display: "flex" }}>
            {readQuestionText && (
              <SpeakQuestionText readText={question?.questionName} />
            )}
            <div>
              {parse(question?.questionName, optionSelectStaticMathField)}
            </div>
          </div>
          {question?.upload_file_name && (
            <div>
              <img src={question?.upload_file_name} alt="image not found" />
            </div>
          )}
          <div className={styles.borderTopBottomMargin}>
            <ConditionOnProgressBar meter={meter} />
          </div>
          <div className={styles.contentParent}>
             <LineDesign lines={lines}/>

           <p style={{ padding: "20px 0" }}>{`Click on the ${
                question.ansArray.length > 1 ? "numbers" : "number"
              } to select.`}</p>
          
          </div>
        </div>
      </div>
    </div>
  );
}
