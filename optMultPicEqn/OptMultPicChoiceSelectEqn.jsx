import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import styles from "../OnlineQuiz.module.css";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import parse from "html-react-parser";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import MultiSelectChoiceCommon from "../CommonFiles/MultiSelectChoiceCommon";

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
  const { isStudentAnswerResponse,setCurrectAnswer,setStudentAnswerChoice } = useContext(ValidationContext);
  useEffect(() => {
    let flag = false;
    let rows = [];
   let temVal = []

    for (let i = 0; i < Number(totalRows); i++) {
      choices[i]?.map((item, j) => {
        item.row == i + 1 &&
          item.col == j + 1 &&
          rows.push({ ...item, show: false });
        let text = String(item?.value);
        if (text.includes("img") && text.includes("src")) {
          flag = true;
        }
        if (item.selected === "true" || item.selected === true) {
          temVal.push(item.value)
          setCurrectAnswer(temVal);
        }
      });
    }
    // setFlag(flag);

    setRows([...rows]);
  }, []);

  const handleChoiceSelection = (i) => {
    if (isAnswerSelected || isStudentAnswerResponse) return;
    if (!multipicselect) {
      rows[prevRef.current].show = false;
      rows[i].show = true;
      prevRef.current = i;
      setStudentAnswerChoice(rows[i]?.value)
      setRows([...rows]);
    } else {
      // Toggle the show property
      rows[i].show = !rows[i].show;
      prevRef.current = i;
      setRows([...rows]);
      const selectedValues = rows.filter((item) => item.show).map((item) => item.value);
      setStudentAnswerChoice(selectedValues)
     
    }
  };

 
  inputRef.current = rows;
  return (
    <div className="mathzone-color-indigo">
      <>

        <MultiSelectChoiceCommon
                choices={rows} 
                studentAnswer={studentAnswer} 
                handleChoiceSelection={handleChoiceSelection}
                />


      </>
    </div>
  );
}
export default OptMultPicChoiceSelectEqn;
