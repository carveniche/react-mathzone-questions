import BlockBaseQuestionContent from "../../../BlockBaseImage/BlockBaseQuestionContent";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser/lib/HtmlParser"
import DisabledBlockBaseImageChoiceSelection from "./DisabledBlockBaseImageChoiceSelection";
import { ProgressBorder } from "../../../../Modal2/modal2";
export default function DisabledBlockBaseImage({ state, totalRows,meter }) {
  meter=Number(meter)||0
  totalRows = Number(totalRows)
  let rows = []
  for (let i = 0; i < totalRows; i++) {
    let temp = []
    state.questionContent.map((items) => items.map((item) => item.row == i && temp.push(item.value)))
    rows.push(temp)
  }
  return <><div>

    <div>
      <div className={styles.questionName}>{HtmlParser(state.questionName)}</div>
      {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
      <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
      <div className={styles.contentParent}>


        <BlockBaseQuestionContent questionContent={rows} />
        <DisabledBlockBaseImageChoiceSelection choices={state.choices} />
      </div>
    </div>
    <div >
    </div>

  </div>
   </>
}
