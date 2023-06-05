import React from "react";
import DisabledHorizontalNotSymbols from "./DisabledHorizontalNotSymbols";


export default function DisabledMainHorizontalNotSymbols({obj,meter})
{
return (<>
<DisabledHorizontalNotSymbols state={obj} totalRows={obj.rows}  meter={meter}/>
</>)
}
