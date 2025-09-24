import HTMLReactParser from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { StaticMathField } from "../../../../../ExternalPackages";
import ConditionOnProgressBar from "../../../../../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../../../../../MainOnlineQuiz/MainOnlineQuizPage";
import SolutionMultipleChoice from "../../../../MultipleChoice/SolutionMultipleChoice";

import styles from "../../../../OnlineQuiz.module.css";
import SelectMultipleChoice from "../../../../MultipleChoice/SelectMultipleChoice";
// import SelectMultipleChoice from "../MultipleChoice/SelectMultipleChoice";
const disabledEditor = (parentRef) => {
  if (!parentRef.current)
    return
  let parent = parentRef.current?.querySelector("#removeQuizEditor");
  let inputTag = parent?.querySelectorAll("input");
  for (let items of inputTag) {
    items.disabled = true;
  }
  inputTag = parent.querySelectorAll("select");
  for (let items of inputTag) {
    items.disabled = true;
  }
};
export default function DisabledTeacherCkEditor({ obj, str, meter, choiceData, resultView, upload_file_name, choiceId }) {
  let inputRef1 = useRef([]);
  const [choice_id, setChoice_id] = useState(null);
  const {
    hasAnswerSubmitted,
    isStudentAnswerResponse
  } = useContext(ValidationContext);
  meter = Number(meter) || 0;

  useEffect(() => {
    if (obj?.question_data && obj?.question_data[0]?.student_answer) {
      setChoice_id(obj?.question_data[0]?.student_answer);
    }
  }, [obj]);

  const choice_data = choiceData.map((item) => { item.choice_id = item.id; return item })

  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            return (
              <StaticMathField
                style={{
                  minWidth: "80px",
                  minHeight: "50px",
                  borderRadius: "5px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                {domNode.attribs.title}
              </StaticMathField>
            );
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };
  useEffect(() => {
    disabledEditor(parentRef);
  }, []);
  const parentRef = useRef(null)
  return (
    <div className={styles.ckeditor} ref={parentRef}>
      <div
        style={{ clear: "both" }}
        id="removeQuizEditor"
        className={`${styles.ckeditorQuestionName} ckEditorResetValue`}
      >
        {upload_file_name && <div><img src={upload_file_name} alt="image not found" /></div>}
        <div>
          <ConditionOnProgressBar meter={meter} />
        </div>
        <div>{HTMLReactParser(str, optionSelect)}</div>
      </div>

      {Boolean(choice_data?.length) && (
        // <SelectMultipleChoice
        //   choices={choiceData}
        //   answerHasSelected={true}
        //   inputRef={inputRef1}
        //   resultView={resultView}
        //   choiceId={choiceId}
        // />

        <SelectMultipleChoice
          choiceId={choice_id}
          answerHasSelected={hasAnswerSubmitted}
          inputRef={inputRef1}
          choices={choice_data}
        />
      )}
      {choice_data?.length > 0 && !isStudentAnswerResponse && (
        <SolutionMultipleChoice model={choice_data} type={"Ckeditor"} />
      )}
    </div>
  );
}
