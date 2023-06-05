import React from "react";
import styles from "./DisabledNumberBond.module.css";
import parse from "html-react-parser";
import styles2 from "../OnlineQuiz.module.css";
import DisabledNumberBondKeyingChoiceType from "./DisabledChoiceType/DisabledNumberBondKeyingChoiceType";
import DisabledNumberBondSelctChoice from "./DisabledChoiceType/DisabledNumberBondSelctChoice";
import { ProgressBorder } from "../../../../../Modal2/modal2";
import HtmlParser from "react-html-parser";
export default function DisabledNumberBond({ obj, meter }) {
  meter = Number(meter) || 0;

  return (
    <div className={styles.MainTree} >
      <div id="studentAnswerResponse">
      {String(obj?.questionName).trim() && (
          <div className={styles2.questionName}>{parse(obj?.questionName)}</div>

        )}
        {obj?.upload_file_name&&<div><img src={obj?.upload_file_name} alt="image not found"/></div>}
        {Boolean(String(obj?.questionContentText).trim()) && (
          <div className={styles2.questionName} style={{ marginTop: "0.2rem" }}>
            {parse(obj?.questionContentText)}
          </div>
        )}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        
        {obj?.isTableView === "true" && (
          <div className={styles.tableFlex}>
            {obj?.questionContent?.map(
              (item, i) =>
                
                i < 5 && (
                  <div>
                    {item?.isMissed === "false" ? (
                      typeof item?.value=="string"?HtmlParser(item?.value):item?.value
                    ) : (
                      <input disabled={true} />
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {obj?.choiceType === "keying" ? (
          <DisabledNumberBondKeyingChoiceType datas={obj} />
        ) : obj?.choiceType === "selectchoice" ? (
          <DisabledNumberBondSelctChoice datas={obj} />
        ) : (
          <h1>unsupported files tyes</h1>
        )}
      </div>
    </div>
  );
}
