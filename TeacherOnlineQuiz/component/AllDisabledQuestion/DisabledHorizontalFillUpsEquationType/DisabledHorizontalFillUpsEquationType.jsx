import React, { useContext } from "react";

import { useEffect, useState, useRef } from "react";
import styles from "./DisabledHorizontalFillUpsEquationType.module.css";

import parse from "html-react-parser";
import { optionSelectStaticMathField } from "../../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { ProgressBorder } from "../../../../../Modal2/modal2";
import DisabledContentHorizontalFillUpsEquationType from "./DisabledContentHorizontalFillUpsEquationType";

export default function DisabledHorizontalFillUpsEquationType({
  state,
  totalRows,
  totalCols,
  meter,
}) {
  totalRows = Number(totalRows);
  totalCols = Number(totalCols);

  meter = Number(meter) || 0;
  //let [rows, setRows] = useState([]);
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);

  const inputRef = useRef(new Array(totalEmptyBox));
  useEffect(() => {
    let totalEmptyBox = 0;

    state?.questionContent?.map(
      (item) => item.isMissed === "true" && totalEmptyBox++
    );
    setTotalEmptyBox(totalEmptyBox);
    //setRows(rows);
  }, []);

  return (
    <div className={styles.MainApp}>
      <div id="studentAnswerResponse">
        <div className={styles.questionName}>
          {parse(state?.questionName, optionSelectStaticMathField)}
        </div>
        {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div className={styles.contentParent}>
          <DisabledContentHorizontalFillUpsEquationType
            content={state?.questionContent}
            totalEmptyBox={totalEmptyBox}
            inputRef={inputRef}
            totalRows={totalRows}
            hasAnswerSubmitted={false}
            totalCols={totalCols}
            choices={state?.choices}
            choiceType={state?.choiceType}
          />
        </div>
      </div>
    </div>
  );
}
