import React from "react";
import DisabledHorizontalFillUps from "./DisabledHorizontalFillUps";


export default function DisabledMainHorizontalFillUps({obj,meter})
{
    return <DisabledHorizontalFillUps state={obj} totalRows={obj.rows} totalCols={obj.cols} meter={meter}/>
}