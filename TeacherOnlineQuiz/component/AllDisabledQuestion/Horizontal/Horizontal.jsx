import React from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import ContentHorizontal from "./ContentHorizontal";
import { useRef } from "react";
import styles from "../OnlineQuiz.module.css";
import { ProgressBorder } from "../../../../../Modal2/modal2";
export default function Horizontal({ state, meter }) {
  let totalEmptyBox = 0;
  state?.questionContent?.map((items) =>
    items.map((item) => item.isMissed !== "false" && totalEmptyBox++)
  );
  const inputRef = useRef(new Array(totalEmptyBox));
  const hasAnswerSubmitted = true;

  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {HtmlParser(state?.questionName)}
        </div>
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <ContentHorizontal
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            hasAnswerSubmitted={hasAnswerSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
