import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import styles from "../AllDisabledQuestion/OnlineQuiz.module.css";
import parse from "html-react-parser";
import DisabledOptMultPicChoiceSelectEqn from "./DisabledOptMultPicChoiceSelectEqn";
import { ProgressBorder } from "../../../../Modal2/modal2";
import { optionSelectStaticMathField } from "../../../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";

function DisabledOptMultPicEqn({ state, totalRows, meter, response = false }) {
  meter = Number(meter) || 0;
  const inputRef = useRef();

  return (
    <>
      <div>
        <div>
          <div className={styles.questionName}>
            {parse(state?.questionName, optionSelectStaticMathField)}
          </div>
          {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
          <div>
            <ProgressBorder meter={meter + 1}>
              <div></div>
            </ProgressBorder>
          </div>
          <div class={styles.contentParent}>
            {Boolean(totalRows) && (
              <DisabledOptMultPicChoiceSelectEqn
                totalRows={totalRows}
                choices={state?.questionContent}
                totalColumns={state.col}
                inputRef={inputRef}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default DisabledOptMultPicEqn;
