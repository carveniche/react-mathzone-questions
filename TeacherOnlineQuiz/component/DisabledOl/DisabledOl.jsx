import React from "react";
import parse from "html-react-parser";
import { StaticMathField } from "../../component/../../../ExternalPackages";
import styles from "../../../OnlineQuiz.module.css";
import OlAnswered from "../../../OL/OlAnswered";
function DisabledOl({ obj }) {
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            return (
              <div
                style={{
                  display: "inline-block",
                  height: "fit-content",
                  width: "fit-content",
                  position: "relative",
                }}
              >
                <StaticMathField>{domNode.attribs.title}</StaticMathField>
              </div>
            );
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };

  return (
    <div>
      {
        <div>
          <div className={styles.questionName}>
            {parse(obj?.questionName, optionSelect)}
          </div>
          {obj?.upload_file_name&&<div><img src={obj?.upload_file_name} alt="image not found"/></div>}
          <div>
            <div className={styles.border4}>
              <div></div>
            </div>
          </div>
          <div className={`${styles.contentParent}`}>
            <OlAnswered obj={obj} />
          </div>
        </div>
      }
    </div>
  );
}

export default DisabledOl;
