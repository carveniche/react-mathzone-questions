import { useContext, useState } from "react"
import styles from "./clickableOnYesNo.module.css"
import styles2 from "../../OnlineQuiz.module.css";
import { Pattern } from "./pattern"
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { ProgressBorder } from "../../../../../../Modal2/modal2";
// let data = {
//     operation: "addition",
//     type: "countofobjectsyesno",
//     questionName: "There are 7 lollipops and 6 candies",
//     row: 1,
//     col: 2,
//     answer: "yes",
//     questionContent: [
//       [
//         {
//           row: 1,
//           col: 1,
//           img: '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/Rainbow%20Candy%20(lolipop).png"\u003e',
//           count: "12",
//         },
//         {
//           row: 1,
//           col: 2,
//           img: '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/41.png"\u003e',
//           count: "6",
//         },
//       ],
//     ],
//     solution: { model: [{ val: "Yes" }] },
//   };
export const DisabledTeacherClickableOnYesNo = ({data,meter}) => {
  meter=Number(meter)||0
    const hasAnswerSubmitted=true

    const handleClick = (val) => {
        if(hasAnswerSubmitted)
        return

    }
const [choices,setChoices]=useState("")

    return <div>
    <div>
        <div className={styles2.questionName}>{HtmlParser(data.questionName)}</div >
        {data?.upload_file_name&&<div><img src={data?.upload_file_name} alt="image not found"/></div>}
        <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div>
        <div style={{ display: 'flex' ,flexWrap:'wrap',gap:'4rem',margin:'2rem 0'}}>
            {data.questionContent[0].map((e, i) => {
                return <div className={styles.frame}  ><Pattern count={data.questionContent[0][i].count} imgUrl={data.questionContent[0][i].img} /></div>
            })}
        </div>

        <button className={styles.yesNoButton} onClick={() => {
            handleClick("yes")
        }} style={{background:choices=="yes"?'#EDEFFC':'initial'}}>Yes</button>
        <button className={styles.yesNoButton} style={{background:choices=="no"?'#EDEFFC':'initial'}} onClick={() => {
            handleClick("no")
        }}>No</button>


       
    </div>
    </div>
    </div>
}