import { oldAndNewData } from "../../HorizontalFillUpsEquationType/CollectAnswerDataHorizontalFillUpsEquation/CollectAnswerDataHorizontalFillUpsEquation";

export const collectDataAtCompileTimeMatchObjectVerticalEqn = (data) => {
  let arr = {};
  for (let row of data) {
    if (row.isMissed === "true") {
      arr[`${row.row}row${row.col}col`] = oldAndNewData(row?.numvalue);
    } else {
      arr[`${row.row}row${row.col}col`] = false;
    }
  }
  return { ...arr };
};
