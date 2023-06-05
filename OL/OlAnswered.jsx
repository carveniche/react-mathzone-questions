import React from "react";
import { Box } from "./OL";
import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import {StaticMathField } from "../../ExternalPackages";
export default function OlAnswered({ obj }) {
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")||clsName.includes("mathImg")) {
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
    <div style={{ clear: "both" }}>
      <div>
        <div className={`${styles.contentParent}`}>
          <Box>
            {obj?.questionContent.map((item, index) => (
              <div key={index}>{parse(item, optionSelect)}</div>
            ))}
          </Box>
          <div className={styles.questionName}>
            {parse(obj?.text, optionSelect)}
          </div>
        </div>
      </div>
    </div>
  );
}
