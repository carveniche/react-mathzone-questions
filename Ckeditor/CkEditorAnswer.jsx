import HTMLReactParser from "html-react-parser";
import React, { useContext, useEffect, useRef } from "react";
import {StaticMathField } from "../../ExternalPackages";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import SolutionMultipleChoice from "../MultipleChoice/SolutionMultipleChoice";
import styles from "../OnlineQuiz.module.css"
const disabledEditor = () => {
  let parent = document.getElementById("removeQuizEditor");
  let inputTag = parent.querySelectorAll("input");
  for (let items of inputTag) {
    items.disabled = true;
  }
  inputTag = parent.querySelectorAll("select");
  for (let items of inputTag) {
    items.disabled = true;
  }
};
export default function CkEditorAnswer({ str, choiceData,upload_file_name }) {
  const inputRef1 = useRef([]);
  const { hasAnswerSubmitted } = useContext(ValidationContext);
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            return <StaticMathField>{domNode.attribs.title}</StaticMathField>;
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };
  useEffect(() => {
    disabledEditor();
  }, []);

  return (
<div>
    <div style={{ clear: "both" }} id="removeQuizEditor" className={styles.ckeditor}>
         {upload_file_name&&<div><img src={upload_file_name} alt="image not found"/></div>}
  <div className={"ckEditorResetValue"}>    {<form>{HTMLReactParser(str, optionSelect)}</form>}</div>
      {choiceData?.length > 0 && (
        <SolutionMultipleChoice model={choiceData} type={"Ckeditor"} />
      )}
    </div>
</div>
  );
}