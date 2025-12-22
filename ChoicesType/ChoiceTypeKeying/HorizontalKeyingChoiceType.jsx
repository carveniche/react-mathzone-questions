import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import React, { useContext, useEffect, useState } from "react";
import HtmlParserComponent from "../.././CommonJSFiles/HtmlParserComponent";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "../../OnlineQuiz.module.css";
export default function HorizontalKeyingChoiceType({
  inputRef,
  content,
  totalRows,
  hasAnswerSubmitted,
}) {
  const [row, setRow] = useState([]);
  const { isStudentAnswerResponse } = useContext(ValidationContext);
  const handleChange = (e, rows, cols) => {
    row[rows][cols].dropVal = e.target.value;
    row[rows][cols].stringLength =
      e.target.value.length > 5 ? e.target.value.length : 5;
    if (e.target.value === "" && e.target.value === undefined)
      row[rows][cols].show = false;
    else row[rows][cols].show = true;
    setRow([...row]);
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalRows; i++) {
      let temp = [];
      content?.map((item) => {
        if (item.row == i) {
          temp.push({ ...item, dropVal: "" });
        }
      });
      arr.push(temp);
    }
    setRow([...arr]);
  }, []);
  inputRef.current = [...row];

  return (
    <Table
      sx={{ border: 0, maxWidth: "100%", width: "fit-content" }}
      className={styles.horizontalTable}
    >
      <TableBody>
        {row?.map((items, index) => (
          <TableRow key={index}>
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <TableCell
                  key={i}
                  border={0}
                  sx={{
                    border: 0,
                    overflowWrap: "anywhere",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <HtmlParserComponent value={item?.value} />
                  </div>
                </TableCell>
              ) : (
                <TableCell value={item.value} key={i} sx={{ border: 0 }}>
                  <input
                    style={InlineCss.Input}
                    value={
                      isStudentAnswerResponse
                        ? item[student_answer]
                        : row[index][i]?.dropVal
                    }
                    onChange={(e) => {
                      if (isStudentAnswerResponse) return;
                      handleChange(e, index, i);
                    }}
                    size={item?.stringLength || 5}
                    //   maxlength={item?.value?.length||10}
                    disabled={hasAnswerSubmitted}
                  />
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const InlineCss = {
  Input: {
    height: "40px",
    textAlign: "center",
    minWidth: "50px",
  },
};
