import React from "react"
import MainOptMultPicEqn from "../optMultPicEqn/MainOptMultPicEqn"
import OptionMultipleChoice from "./OptionMultipleChoice"

export default function OptionMultiplePictureMain({obj,meter})
{
   let str=JSON.stringify(obj)
return !str.includes("mq-selectable")?<><OptionMultipleChoice state={obj} totalRows={obj.row} meter={meter}/></>:<MainOptMultPicEqn obj={obj} meter={meter}/> 



}