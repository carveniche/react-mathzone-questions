import React from "react";

import { useEffect, useState, useRef } from "react";
import styles from "../../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import DsbContMatchObjVerticalEqn from "./DsbContMatchObjVerticalEqn";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { ProgressBorder } from "../../../../Modal2/modal2";
export default function DsbMatchObjVertEqn({
  state,
  totalRows,
  totalCols,
  meter,
}) {
  meter = Number(meter) || 0;
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);

  let [totalEmptyBox, setTotalEmptyBox] = useState(0);

  const inputRef = useRef(new Array(totalEmptyBox));
  useEffect(() => {}, []);
  useEffect(() => {
    let totalEmptyBox = 0;

    state?.questionContent?.map(
      (item) => item.isMissed === "true" && totalEmptyBox++
    );
    setTotalEmptyBox(totalEmptyBox);
    //setRows(rows);
  }, []);

  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {parse(state?.questionName, optionSelectStaticMathField)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div className={`${styles.borderTopBottomMargin}`}>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <DsbContMatchObjVerticalEqn
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
          />
        </div>
      </div>
    </div>
  );
}
