 import HTMLReactParser from "html-react-parser";
import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { StaticMathField } from "../../../../../ExternalPackages";
import ConditionOnProgressBar from "../../../../../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../../../../../MainOnlineQuiz/MainOnlineQuizPage";
import SolutionMultipleChoice from "../../../../MultipleChoice/SolutionMultipleChoice";

import styles from "../../../../OnlineQuiz.module.css";
import SelectMultipleChoice from "../MultipleChoice/SelectMultipleChoice";
const disabledEditor = (parentRef) => {
if(!parentRef.current)
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
export default function DisabledTeacherCkEditor({ str, meter, choiceData,resultView,upload_file_name,choiceId }) {
  let inputRef1 = useRef([]);
  const {
    
    isStudentAnswerResponse
  } = useContext(ValidationContext);
  meter = Number(meter) || 0;
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
  const parentRef=useRef(null)
  return (
    <div className={styles.ckeditor} ref={parentRef}>
    <div
      style={{ clear: "both" }}
      id="removeQuizEditor"
      className={`${styles.ckeditorQuestionName} ckEditorResetValue`}
    >
         {upload_file_name&&<div><img src={upload_file_name} alt="image not found"/></div>}
      <div>
       <ConditionOnProgressBar meter={meter}/>
      </div>
     <form> {HTMLReactParser(str, optionSelect)}</form>
      
      {Boolean(choiceData?.length) && (
        <SelectMultipleChoice
          choices={choiceData}
          answerHasSelected={true}
          inputRef={inputRef1}
          resultView={resultView}
          choiceId={choiceId}
        />
      )}
      {choiceData?.length > 0 &&!isStudentAnswerResponse&& (
        <SolutionMultipleChoice model={choiceData} type={"Ckeditor"} />
      )}
    </div>
    </div>
  );
}
