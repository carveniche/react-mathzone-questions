import React from "react"
import QuestionTextImage from "./QuestionTextImage"
// let obj={
//    "operation":"addition",
//    "type":"questiontextimages",
//    "questionName":"The point H(3, -3) is reflected across the y-axis. What are the coordinates of the resulting point, H′?",
//    "questionContent":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/T-Coordinates/CRD_25.png\"\u003e",
//    "questionContentText":"",
//    "choiceType":"selectchoice",
//    "solution":{
//       "model":[
//          {
//             "val":"H' =\u0026nbsp;\u003cspan style=\"text-align: center;\"\u003e(-3, -3)\u003c/span\u003e"
//          }
//       ],
//       "sidebyside":[
         
//       ],
//       "srows":null,
//       "scols":null
//    },
//    "choices":[
//       {
//          "image":"(-3, -3)",
//          "option":"true"
//       },
//       {
//          "image":"(3, -3)",
//          "option":"false"
//       },
//       {
//          "image":"(3, 3)",
//          "option":"false"
//       },
//       {
//          "image":"(-3, -2)",
//          "option":"false"
//       }
//    ]
// }
// let obj2={"operation":"addition","type":"questiontextimages","questionName":"tghis is test by dev&nbsp;<span class=\"mq-replacable mq-math-mode\" id=\"840\"><span class=\"mq-selectable\">$\\sqrt{2}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"120\"><span class=\"mq-non-leaf\" mathquill-command-id=\"121\"><span class=\"mq-scaled mq-sqrt-prefix\">√</span><span class=\"mq-non-leaf mq-sqrt-stem\" mathquill-block-id=\"123\"><span mathquill-command-id=\"122\">2</span></span></span><span class=\"mq-cursor\">​</span></span></span>&nbsp;","questionContent":"<span class=\"mq-replacable mq-math-mode\" id=\"322\"><span class=\"mq-selectable\">$\\sqrt{2}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"62\"><span class=\"mq-non-leaf\" mathquill-command-id=\"63\"><span class=\"mq-scaled mq-sqrt-prefix\">√</span><span class=\"mq-non-leaf mq-sqrt-stem\" mathquill-block-id=\"65\"><span mathquill-command-id=\"64\">2</span></span></span><span class=\"mq-cursor\">​</span></span></span>&nbsp;","questionContentText":"","choiceType":"selectchoice","solution":{"model":[{"val":"<span class=\"mq-replacable mq-math-mode\" id=\"47\"><span class=\"mq-selectable\">$\\sqrt{2}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"110\"><span class=\"mq-non-leaf\" mathquill-command-id=\"111\"><span class=\"mq-scaled mq-sqrt-prefix\">√</span><span class=\"mq-non-leaf mq-sqrt-stem\" mathquill-block-id=\"113\"><span mathquill-command-id=\"112\">2</span></span></span><span class=\"mq-cursor\">​</span></span></span>&nbsp;"}],"sidebyside":[],"srows":null,"scols":null},"choices":[{"image":"<span class=\"mq-replacable mq-math-mode\" id=\"429\"><span class=\"mq-selectable\">$\\sqrt{21}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"79\"><span class=\"mq-non-leaf\" mathquill-command-id=\"80\"><span class=\"mq-scaled mq-sqrt-prefix\">√</span><span class=\"mq-non-leaf mq-sqrt-stem\" mathquill-block-id=\"82\"><span mathquill-command-id=\"81\">2</span><span mathquill-command-id=\"83\">1</span></span></span><span class=\"mq-cursor\">​</span></span></span>&nbsp;","option":"false"},{"image":"<span class=\"mq-replacable mq-math-mode\" id=\"321\"><span class=\"mq-selectable\">$\\sqrt{22}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"98\"><span class=\"mq-non-leaf\" mathquill-command-id=\"99\"><span class=\"mq-scaled mq-sqrt-prefix\">√</span><span class=\"mq-non-leaf mq-sqrt-stem\" mathquill-block-id=\"101\"><span mathquill-command-id=\"100\">2</span><span mathquill-command-id=\"102\">2</span></span></span><span class=\"mq-cursor\">​</span></span></span>&nbsp;","option":"true"}]}
export default function MainQuestionTextImage({obj,meter}){

return <QuestionTextImage state={obj} meter={meter}/>
}