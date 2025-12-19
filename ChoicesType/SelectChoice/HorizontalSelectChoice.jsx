import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import HtmlParserComponent from "../.././CommonJSFiles/HtmlParserComponent";
export default function HorizontalSelectChoice({ row }) {
  return (
    <Table sx={{ border: 0, maxWidth: "100%", width: "fit-content" }}>
      <TableBody>
        {row?.map((items, index) => (
          <TableRow key={index}>
            {items?.map((item, i) =>
              item.isMissed === "false" ? (
                <TableCell
                  key={i}
                  border={0}
                  sx={{ border: 0, overflowWrap: "anywhere" }}
                >
                  <div>
                    <HtmlParserComponent value={item?.value} />
                  </div>
                </TableCell>
              ) : (
                <TableCell
                  value={item.value}
                  key={i}
                  sx={{ border: 0, textAlign: "center" }}
                >
                  <input
                    style={InlineCss.Input}
                    value={"?"}
                    size={item?.stringLength || 5}
                    //   maxlength={item?.value?.length||10}
                    disabled={true}
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
