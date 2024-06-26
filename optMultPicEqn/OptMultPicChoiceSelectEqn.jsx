import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";

function OptMultPicChoiceSelectEqn({
  multipicselect,
  choices,
  isAnswerSelected,
  totalRows,
  inputRef,
  studentAnswer,
}) {
  const [flag, setFlag] = useState();
  let prevRef = useRef(0);
  const [rows, setRows] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);

  useEffect(() => {
    let flag = false;
    let rows = [];

    for (let i = 0; i < Number(totalRows); i++) {
      choices[i]?.map((item, j) => {
        item.row == i + 1 &&
          item.col == j + 1 &&
          rows.push({ ...item, show: false });
        let text = String(item?.value);
        if (text.includes("img") && text.includes("src")) {
          flag = true;
        }
      });
    }
    // setFlag(flag);

    setRows([...rows]);
  }, []);

  const selectOptionHandler = (i) => {
    console.log("this is multipicselect", multipicselect);
    if (isAnswerSelected || isStudentAnswerResponse) return;
    if (!multipicselect) {
      rows[prevRef.current].show = false;
      rows[i].show = true;
      prevRef.current = i;
      setRows([...rows]);
    } else {
      // Toggle the show property
      rows[i].show = !rows[i].show;
      console.log("show status", rows[i].show);
      prevRef.current = i;
      setRows([...rows]);
    }
  };

  console.log("this is studentAnswer", studentAnswer);
  console.log("this is row", rows);
  inputRef.current = rows;
  return (
    <div className="mathzone-color-indigo">
      <div
        style={{
          display: "grid",
          width: "90%",
          marginTop: "1rem",
          gap: "1rem",
          position: "relative",
          gridTemplateColumns: `repeat(${flag ? 2 : 2},1fr)`,
        }}
      >
        {rows?.map((item, i) => (
          <div
            key={i}
            style={{
              gap: "2rem",
              cursor: "pointer",
              flexWrap: "wrap",
              border: " 1px solid black",
              padding: "1rem",
              borderRadius: "5px",
              fontWeight: "bold",
              alignItems: "center",
              display: "flex",
            }}
            onClick={() => selectOptionHandler(i)}
            className={`${styles.mathquill_mathzone_questionname} ${
              isStudentAnswerResponse &&
              ((!multipicselect &&
                String(item?.value)?.trim() == String(studentAnswer)?.trim()) ||
                (multipicselect &&
                  Array.isArray(studentAnswer) &&
                  studentAnswer.includes(String(item?.value)?.trim())))
                ? styles.selectedChoiceType
                : item.show
                ? styles.selectedChoiceType
                : styles.prevSelectionAnswerSelection
            }`}
          >
            <div className="mathzone-circle-selectbox">
              {" "}
              <b>{String.fromCharCode(65 + i)}</b>
            </div>
            <div>{parse(item.value, optionSelectStaticMathField)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default OptMultPicChoiceSelectEqn;
