import { symbolCollection } from "../CommonJSFiles/replacingJsonData"

export default function CompareTwoValue(a,b){
   
    let temp1=symbolCollection()[String(a)?.trim()]?symbolCollection()[String(a)?.trim()]:a
    let temp2=symbolCollection()[String(b)?.trim()]?symbolCollection()[String(b)?.trim()]:b
    if(String(temp1)?.trim()?.toLowerCase()==String(temp2)?.trim()?.toLowerCase())
    return true

    return false
}