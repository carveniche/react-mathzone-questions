import { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";  
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar"; 
import SelectChoice from "../ChoicesType/SelectChoice/SelectChoice";
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode";
import { StaticMathField } from "../../ExternalPackages";
// StaticMathField
// export default function GenerateLine({question, start, end, choiceType,interval,questionContent, ansArray }){
export default function GenerateLine({question, meter }){
  var choiceType = question.choiceType;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect, 
    setQuestionWithAnswer,
    isStudentAnswerResponse,
  } = useContext(ValidationContext);
  const [studAns, setStudAnswers] = useState([]);
  const [answered, setAnswered] = useState(false)
  const [redAlert, setRedAlert] = useState(false)  
  let [totalEmptyBox, setTotalEmptyBox] = useState(0);
  var isDecimal = (parseFloat( question.interval)%1)>0 &&  (parseFloat(question.interval)%1)<1 ;  
  var start = isDecimal ? parseFloat(question.start): parseInt(question.start)
  var end = isDecimal ? parseFloat(question.end): parseInt(question.end)
  var interval = isDecimal ? parseFloat(question.interval): parseInt(question.interval)
  var choices = question.choices  ;
  // var choices =  [
  //   "<span id=\"580\" class=\"mq-replacable mq-math-mode\" contenteditable=\"false\"><span class=\"mq-selectable\">$5\\frac{5}{4}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"178\"><span mathquill-command-id=\"179\">5</span><span class=\"mq-fraction mq-non-leaf\" mathquill-command-id=\"181\"><span class=\"mq-numerator\" mathquill-block-id=\"183\"><span mathquill-command-id=\"182\">5</span></span><span class=\"mq-denominator\" mathquill-block-id=\"185\"><span mathquill-command-id=\"184\">4</span></span><span>​</span></span><span class=\"mq-cursor\">​</span></span> </span>",
  //   "<span class=\"mq-selectable\">$5\\frac{5}{4}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"196\"><span mathquill-command-id=\"197\">5</span><span class=\"mq-fraction mq-non-leaf\" mathquill-command-id=\"199\"><span class=\"mq-numerator\" mathquill-block-id=\"201\"><span mathquill-command-id=\"200\">5</span></span><span class=\"mq-denominator\" mathquill-block-id=\"203\"><span mathquill-command-id=\"202\">4</span></span><span>​</span></span><span class=\"mq-cursor\">​</span></span> ",
  //   "<span class=\"mq-selectable\">$5\\frac{5}{4}$</span><span class=\"mq-root-block mq-hasCursor\" mathquill-block-id=\"214\"><span mathquill-command-id=\"215\">5</span><span class=\"mq-fraction mq-non-leaf\" mathquill-command-id=\"217\"><span class=\"mq-numerator\" mathquill-block-id=\"219\"><span mathquill-command-id=\"218\">5</span></span><span class=\"mq-denominator\" mathquill-block-id=\"221\"><span mathquill-command-id=\"220\">4</span></span><span>​</span></span><span class=\"mq-cursor\">​</span></span> ",
  //   "3 1 3"
  // ]
  
  // var choices = (question.isFraction ? question.choices.map((choic)=>{
  //   console.log(choic)
  //   var choiceOpt = <StaticMathField   >{choic}</StaticMathField>
  //   return choiceOpt
  // })   :question.choices) 
   
  // var chosidnc = question.choices.map((choic)=>{
  //   console.log(choic)
  //   var choiceOpt = <StaticMathField   >{choic}</StaticMathField>
  //   return choiceOpt
  // })
  // choices = chosidnc
  const [lines, setLines] = useState([])  
  var answers=[] ;

  const inputRef = useRef(new Array(totalEmptyBox));
  var numsDisplayed = question.numbersDisplayed;
  function handleSubmitAnswer(){ 
    var isWrong = false; 
    var isEmpty = false;  
    if(choiceType=="keying" && !isWrong && !isEmpty) {
      if(question.isFraction){ 
        var studFracNums = document.getElementsByClassName("ansFracNums")
        var studFracStarts = document.getElementsByClassName("ansFracStarts")
        var studFracInts = document.getElementsByClassName("ansFracInts") 
        var answers = [];
        for(var ansCount=0;ansCount<question.ansArray.length;ansCount++){ 
          if(studFracNums[ansCount].value=="" || studFracStarts[ansCount].value=="" || studFracInts[ansCount].value == "") isEmpty = true
          answers.push(`${studFracNums[ansCount].value} ${studFracStarts[ansCount].value} ${studFracInts[ansCount].value}`)
        } 
        console.log({studAns})
        setStudAnswers(answers)
        if(answers.length!=question.ansArray.length) isEmpty = true;
        console.log(answers, question.ansArray)
        answers.forEach(ans=>{ if(!question.ansArray.includes(ans)) isWrong = true;}) 

      }else{
        answers = Array.from(document.getElementsByClassName("answers"))
        var solution = answers.map(ans => isDecimal?parseFloat(ans.value):parseInt(ans.value));
        solution = solution.sort((a,b)=>b-a)
        var ansArray = question.ansArray.sort((a,b)=>b-a)
        console.log(ansArray, solution)
        for(var i = 0; i<question.ansArray.length ;i++){ 
          if(isNaN(solution[i])) isEmpty=true
          if(solution[i] !=ansArray[i] ) isWrong=true 
          // if(!question.ansArray.includes(solution[i]) ) isWrong=true
        }
      }
    }else if(choiceType == "mapping" && !isWrong && !isEmpty){  
      console.log("STUDAND",studAns)
      console.log(studAns.length!=question.ansArray.length) 
      if(studAns.length!=question.ansArray.length) isEmpty = true;
        studAns.forEach(ans=>{ 
          if(!question.ansArray.includes(ans)){
            console.log("WRONG")
            isWrong = true;
          }
        }) 
        console.log(question.ansArray, studAns)
    }else if(choiceType == "selectchoice" && !isWrong && !isEmpty){  
      if(question.isFraction){ 
        var selectedOption;
        for(var i = 0; i<inputRef.current.length;i++){ 
            if(inputRef.current[i].show) selectedOption = inputRef.current[i].value
        }  
        var parser = new DOMParser();
        var doc = parser.parseFromString(selectedOption, 'text/html'); 
        var selectedAnswer = doc.querySelector('span'); 
        if(selectedAnswer && selectedAnswer.dataset.fracvalue == undefined) isWrong = true;
        if(typeof selectedOption == "undefined" ) isEmpty = true 
      }else{
        var selectedOption;
        for(var i = 0; i<inputRef.current.length;i++){ 
            if(inputRef.current[i].show) selectedOption = inputRef.current[i].value
        } 
        console.log(selectedOption)
        if(typeof selectedOption == "undefined" ) isEmpty = true
        if(selectedOption != question.ansArray[0]) isWrong = true 
        } 
   }
    if(isEmpty){
      setRedAlert(true)
      return
    }
    else setRedAlert(false) 
    if (hasAnswerSubmitted) return; 
    // {isEmpty? setRedAlert(true): isWrong ? alert("Wrong answer") : alert("Correct answer")}
    if(isWrong) setIsAnswerCorrect(false)
    else setIsAnswerCorrect(true)
    setHasAnswerSubmitted(true); 
    setAnswered(true)
    setQuestionWithAnswer({...question,[student_answer]:studAns}) 
  }
  function fractionOptions(data) { 
    // MQ.StaticMath(data) 
    // <StaticMathField  />
    return data;

} 
 
function setFractionsSelected(e){  
  if(choiceType !== "mapping") return 
  if(hasAnswerSubmitted) return
   let currentElement = e.target;
  //  console.log(currentElement)
   var dataSetElement ; 
    if(currentElement.dataset && currentElement.dataset.fracnum) dataSetElement = currentElement; 
    else{
      while (currentElement) {  
        if (currentElement.dataset["fracnum"]) {   
            dataSetElement = currentElement 
            break;
        } 
        currentElement = currentElement.parentElement; 
    }} 

    var idOpt = dataSetElement.dataset.option;  
    var pointer = document.getElementById(`pBox_${dataSetElement.dataset["fracstart"]} ${dataSetElement.dataset["fracnum"]} ${dataSetElement.dataset["fracinterval"]}`)   
    var ansVal = document.getElementById(`pValBox_${idOpt}`)  
    console.log(`pBox_${dataSetElement.dataset["fracstart"]}${dataSetElement.dataset["fracnum"]}${dataSetElement.dataset["fracinterval"]}`)
    console.log(pointer)
    {choiceType == "mapping" && !answered&& Array.from(pointer.classList).forEach(cla=>{   
      cla.includes("vertBar") ?  pointer.classList.add(`${styles.selected}`)  : pointer.classList.add(`${styles.vertBar}`) 
      pointer.classList.remove(cla); 
    })  } 
    // var answer = {number:dataSetElement.dataset["fracstart"], nume:dataSetElement.dataset["fracnum"], denom : dataSetElement.dataset["fracinterval"]}
    // answers.push({number:dataSetElement.dataset["fracstart"], nume:dataSetElement.dataset["fracnum"], denom : dataSetElement.dataset["fracinterval"]}) 
    // const exists = answers.some(item => item.number === answer.number &&  item.nume === answer.nume &&   item.denom === answer.denom ); 
    // if (exists)answers = answers.filter(item => !(item.number === answer.number && item.nume === answer.nume && item.denom === answer.denom)); 
    // else answers.push(answer);



  var answer = `${dataSetElement.dataset["fracstart"]} ${dataSetElement.dataset["fracnum"]} ${dataSetElement.dataset["fracinterval"]}`
  
  if (answers.includes(answer)) answers = answers.filter(item => !(item === answer)); 
  else answers.push(answer); 

  if(answers.length == 0) setRedAlert(true)
  else setRedAlert(false) 
  console.log(answers)
 setStudAnswers(answers)
} 

function setSelected(e){   
  if(choiceType != "mapping" || hasAnswerSubmitted ) return
  var idOpt = e.target.dataset.option; 
  var pointer = document.getElementById(`pBox_${idOpt}`)   
  var ansVal = document.getElementById(`pValBox_${idOpt}`)   
 {choiceType == "mapping" && !answered&& Array.from(pointer.classList).forEach(cla=>{   
  cla.includes("vertBar") ?  pointer.classList.add(`${styles.selected}`)  : pointer.classList.add(`${styles.vertBar}`) 
  pointer.classList.remove(cla); 
})  }
  var sol = isDecimal ? parseFloat(ansVal.textContent):parseInt(ansVal.textContent)
  console.log(sol)
  if(answers.includes(sol)){ 
    answers = answers.filter(ans => ans!=sol)
  }else{ 
    answers.push(sol)
  }   
  if(answers.length == 0) setRedAlert(true)
  else setRedAlert(false)
  setStudAnswers(answers)
}  
  useEffect(()=>{   
    var lineBlocks = []; 
    var index = 0; 
    var inp = 0; 
    var endIsThere = false;
   
    // for(var mark = (isDecimal?( start+.1):( start+1)); mark< end; (isDecimal ? mark+= parseFloat(interval):mark++ )){
    //   var idddd = `pBox_${index}`;  
    //   var idddd2 = `pValBox_${index}`;  
    //   var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
    //   var ansSelected = studAns.includes(num);  
    //     if(isDecimal){ 
    //       console.log(mark,"------",parseFloat(mark).toFixed(1).length)
    //         var ptick = <>
    //         <div className={styles.botline}> 
    //           </div>
    //            <div className={styles.ticktext} data-option={index} onClick={(e)=>setSelected(e)}>
    //             <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>
                 
    //           {question.questionContent[index] ? 
    //               choiceType === "keying" 
    //                 ? <input readOnly={hasAnswerSubmitted}inputmode="numeric"  maxLength={parseFloat(mark).toFixed(1).length} className={`${styles.checkNumLine}  answers`}      id={`pBox_${index}`} type="text"/>
    //                 : <p   value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //               : <p className={`${styles.mapBox} animation`}  id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //           } 
    //            </div>  
    //            </>
    //           if(choiceType === "keying" ) inp++;
    //           lineBlocks.push(ptick) 
    //           index++;
    //     }else if(mark %  interval == 0 && !isDecimal){  
    //     var ptick = <>
    //       <div className={styles.botline}> 
    //           </div>
    //          <div className={styles.ticktext}   data-option={index} onClick={(e)=>setSelected(e)}>
    //          <div className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>              
    //           {question.questionContent[index] ? 
    //               choiceType === "keying" 
    //                 ? <input readOnly={hasAnswerSubmitted}inputmode="numeric" maxLength={mark.toString().length} className={`${styles.checkNumLine}  answers`}    id={`pBox_${index}`} type="text"/>
    //                 : <p  value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //               : <p className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
    //             }

    //       </div>  
    //       </> 
    //           if(choiceType === "keying" ) inp++;
    //           lineBlocks.push(ptick) 
    //           index++;
    //     }
    //   }

    var fracInterval = parseInt(question.interval);
    var fracStart = parseInt(question.start);  
    if(question.isFraction) interval = 1;

    for(var mark = (isDecimal?( start):( start)); mark<=(isDecimal ?  parseFloat(end):  parseInt(end) ); (isDecimal ? mark+= parseFloat(interval):mark += parseInt(interval) )){
      var idddd = `pBox_${index}`;  
      var idddd2 = `pValBox_${index}`;  
      var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
      var ansSelected = studAns.includes(num);  
      var ansLength = isDecimal?parseFloat(mark).toFixed(1).length:parseInt(mark).toString().length;  
      // console.log((isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)) + " : " + (isDecimal ? parseFloat(end).toFixed(1) : parseInt(end))) 
    if(question.isFraction){
      var fracNum = 1; 
      if(mark==start || mark == 0){ 
        // fracNum  = 0;
        // var num = {fracStart, fracNum, fracInterval} 
        // var fracId = `pBox_${ asasdsfsa }${0}${fracInterval}`;   
        var fracId = `pBox_${mark } 0 ${fracInterval}`;   
      // console.log("-------------------------------------------------------",fracId) 
      // console.log({asasdsfsa, fracId}) 
      // question.ansArray.includes((isDecimal?Number(parseFloat(mark).toFixed(1)):parseInt(mark  ) ))
        var ptick = <div className={` ${`${hasAnswerSubmitted ? styles.answeredSection : styles.section}`}`} style={{minWidth:"50px"}} data-fracnum={0} data-fracstart={fracStart} data-fracinterval={fracInterval}   onClick={(e)=>setFractionsSelected(e)} key={index} >
                          <div className={styles.botline}  data-fracnum={0} data-fracstart={fracStart} data-fracinterval={fracInterval}></div>
                          <div className={styles.ticktext} 
                          style={{ padding: (choiceType === "keying" && question.ansArray.includes(isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark))) ? 0 : "0 .5rem"}}
                          data-fracnum={0} data-fracstart={fracStart} data-fracinterval={fracInterval}>
                              <div  data-fracnum={0} data-fracstart={fracStart} data-fracinterval={fracInterval} className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar} id={fracId}></div>  
                              { (question.ansArray.includes((isDecimal?Number(parseFloat(mark).toFixed(1)):parseInt(mark  ) ))
                                ? choiceType === "keying" 
                                ? <input readOnly={hasAnswerSubmitted}   style={{ width: `${(ansLength * 14 )}px` }}      maxLength={ansLength} className={`${styles.checkNumLine}  answers`}   id={idddd2} type="text"/>
                                : choiceType == "selectchoice" ? <p className={styles.qMark}  >{`?`}</p> : <p  value={mark} className={styles.numMapBox }   style={{display:`${numsDisplayed || mark == start ?"block":"block"}`,top:`${numsDisplayed ? "10px":"3px"}`}}     id={idddd2}>{mark}</p>
                                : <p className={styles.numMapBox}   style={{display:`${numsDisplayed || mark == start   ?"block":"block"}`,top:`${numsDisplayed ? "10px":"3px"}`}}    id={idddd2}    >{mark}</p>
                              
                                )} 
                          </div>  
                      </div> 
          lineBlocks.push(ptick) 
     }
     while(fracNum<=fracInterval && fracStart<parseInt(question.end) ){ 
      var fracSection ; 
      var idddd;
      var whole ;
      var indentity ;
        
      if(fracNum == fracInterval){  
        fracStart++;   
        fracSection = fractionOptions(`${fracStart==0?"":fracStart}`) 
        whole = 0;
        indentity = `${fracStart} ${whole} ${fracInterval}`;
        idddd = `pBox_${indentity}`; 
      }else{ 
        fracSection =  fractionOptions(`${fracStart==0?"":fracStart} \\frac{${fracNum}}{${fracInterval}}`);
        indentity = `${fracStart} ${fracNum} ${fracInterval}`;
        // idddd = `pBox_${fracStart}${fracNum}${fracInterval}`; 
        idddd = `pBox_${indentity}`; 
      }        
      var startLength  = fracStart.toString().length;
      var numLength  = fracNum.toString().length;
      var intLength  = fracInterval.toString().length;
      // console.log(fracNum, fracNum == fracInterval)
      // console.log(typeof indentity)
      // console.log(typeof question.ansArray[0])
      // fractions.push(`${fracStart}  ${fracNum}  ${fracInterval  }`)  
      console.log("dsffgdedfsg",fracNum%fracInterval, fracNum==0)
      var ptick = <div  className={`${hasAnswerSubmitted ? styles.answeredSection : styles.section}`} style={{minWidth:"50px"}} data-fracnum={fracNum%fracInterval} data-fracstart={fracStart} data-fracinterval={fracInterval}  onClick={(e)=>{setFractionsSelected(e)}}   key={index} >
                    <div className={styles.botline}  data-fracnum={fracNum%fracInterval} data-fracstart={fracStart} data-fracinterval={fracInterval}></div>
                    <div className={styles.ticktext} 
                    style={{ padding: (choiceType === "keying" && question.ansArray.includes(isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark))) ? 0 : "0 .5rem"}}
                    data-fracnum={fracNum%fracInterval} data-fracstart={fracStart} data-fracinterval={fracInterval}>
                        <div  data-fracnum={fracNum%fracInterval} data-fracstart={fracStart} data-fracinterval={fracInterval} className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  id={idddd}></div>  
                        { (question.ansArray.includes(indentity)
                          ? choiceType === "keying" 
                          ? <div className={styles.answerNum} >
                                <input readOnly={hasAnswerSubmitted} style={{ width: `${(startLength * 14 )}px`,minWidth: "30px", height:"30px",paddingTop:"5px",fontFamily: "GothamRnd-Book2",textAlign:"center",fontStyle: "normal", fontWeight: "700", fontSize: "18px" }}   maxLength={startLength} className={`answers ansFracNums`}   id={"ansFracNum"} type="text"/>
                              <div className={styles.answerFrac} >
                                <input readOnly={hasAnswerSubmitted} style={{ width: `${(numLength * 14 )}px`,minWidth: "30px",height:"30px", paddingTop:"5px",fontFamily: "GothamRnd-Book2",textAlign:"center",fontStyle: "normal", fontWeight: "700", fontSize: "18px"  }}   maxLength={numLength} className={`answers ansFracStarts`}   id={"ansFracStart"} type="text"/>
                                <span style={{border:"1px solid #858585", width:"-webkit-fill-available"}} ></span>
                                <input readOnly={hasAnswerSubmitted} style={{ width: `${(intLength * 14 )}px`,minWidth: "30px",height:"30px", paddingTop:"5px",fontFamily: "GothamRnd-Book2",textAlign:"center",fontStyle: "normal", fontWeight: "700", fontSize: "18px"  }}   maxLength={intLength} className={`answers ansFracInts`}   id={"ansFracInt"} type="text"/>
                              </div>
                           </div>
                          :  choiceType == "selectchoice" ? <p className= {styles.qMark}  >{`?`}</p> : <p  value={mark} className={`${fracNum == 0 ? styles.numMapBox : styles.mapBox}       `}    style={{display:`${numsDisplayed || fracStart ==end || fracNum%fracInterval == 0  ?"block":"none"}`,top:`${numsDisplayed ? "10px":"3px"}`}} id={idddd2}><StaticMathField  >{fracSection}</StaticMathField></p>
                          : <p className={`${fracNum == fracInterval ? styles.numMapBox : styles.mapBox} `}   id={idddd2} style={{display:`${numsDisplayed || fracStart == end ||  fracNum%fracInterval == 0 ?"block":"none"}`,top:`${numsDisplayed ? "10px":"3px"}`}}   ><StaticMathField   >{fracSection}</StaticMathField></p>
                          )} 
                    </div>  
                </div>
    if(fracStart != 0 || fracNum != fracInterval) lineBlocks.push(ptick)  
    fracNum++;  
    }    
    }else{
      if((isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)) == (isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)))  endIsThere = true;
      var ptick = <div  className={`${hasAnswerSubmitted ? styles.answeredSection : styles.section}`} style={{minWidth:"40px"}} data-option={index}  onClick={(e)=>setSelected(e)}  key={index} >
                      <div className={styles.botline}  data-option={index}></div>
                      <div className={styles.ticktext} 
                       style={{ padding: (choiceType === "keying" && question.ansArray.includes(isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark))) ? 0 : "0 .5rem"}}
                      data-option={index}>
                          <div  data-option={index} className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar} id={idddd}></div>  
                          { (question.ansArray.includes((isDecimal?Number(parseFloat(mark).toFixed(1)):parseInt(mark  ) ))
                            ? choiceType === "keying" 
                            ? <input readOnly={hasAnswerSubmitted} style={{ width: `${(ansLength * 14 )}px` }}   data-option={index} maxLength={ansLength} className={`${styles.checkNumLine}  answers`}   id={idddd2} type="text"/>
                            :  choiceType == "selectchoice" ? <p className= {styles.qMark}  >{`?`}</p> : <p  value={mark} className={styles.mapBox}  data-option={index} style={{display:`${numsDisplayed || index == 0 ?"block":"none"}`}} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                            : <p className={styles.mapBox}  data-option={index}  id={idddd2} style={{display:`${numsDisplayed || index == 0 || Number(mark.toFixed(1)) == (isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end))?"block":"none"}`}}   >{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                          
                            )} 
                      </div>  
                  </div>
        if(choiceType === "keying" ) inp++;
        lineBlocks.push(ptick) 
        index++;
    }
    }  
    
    // `${hasAnswerSubmitted ? styles.answeredSection : `${hasAnswerSubmitted ? styles.answeredSection : styles.section}`}`
    if(!endIsThere && !question.isFraction){ 
      // console.log("END NOT THERE ")
      var idddd = `pBox_${index}`;  
      var idddd2 = `pValBox_${index}`;  
      var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
      var ansSelected = studAns.includes(num);  
      var ptick = <div  className={`${hasAnswerSubmitted ? styles.answeredSection : styles.section}`} style={{minWidth:"40px"}}  data-option={index}  onClick={(e)=>setSelected(e)}  key={index}  >
                      <div className={styles.botline}   data-option={index}></div>
                      <div className={styles.ticktext}  data-option={index}  >
                        <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd}  ></div>
                        {question.ansArray.includes((isDecimal?Number(parseFloat(end).toFixed(1)):parseInt(end) )) ? 
                          choiceType === "keying" 
                              ? <input readOnly={hasAnswerSubmitted}inputmode="numeric" style={{ width: `${(ansLength * 14 )}px` }}  data-option={index}     maxLength={parseFloat(mark).toFixed(1).length} className={`${styles.checkNumLine}  answers`}      id={`pBox_${index}`} type="text"/>
                              : <p data-option={index}   className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)}</p>
                            :   <p className={styles.mapBox}   id={idddd2}  data-option={index}     >{isDecimal ? parseFloat(end).toFixed(1) : parseInt(end)}</p>
                        } 
                      </div>  
                    </div>
        lineBlocks.push(ptick) 
    } 
      setLines(lineBlocks)  



      // var chosidnc = question.choices.map((choic)=>{
      //   console.log(choic)
      //   var choiceOpt = <StaticMathField   >{choic}</StaticMathField>
      //   return choiceOpt
      // })
      // // choices = chosidnc
      // console.log(chosidnc)
      // setChoicessss(chosidnc)

     },[hasAnswerSubmitted])   
    return <div >  
    {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          answerHasSelected={hasAnswerSubmitted}
        />
      )}   
    {redAlert &&  <CustomAlertBoxMathZone/>   }  

    <div id="studentAnswerResponse"> 
    <div className={styles.questionName}>{parse(question?.questionName)}</div>
        {question?.upload_file_name && (
          <div>
            <img src={question?.upload_file_name} alt="image not found" />
          </div>
        )} 
        <div className={styles.borderTopBottomMargin}>
          <ConditionOnProgressBar meter={meter} />
        </div>  
        {/* <div   style={{fontSize:16,fontWeight:"bold",gap:"1rem"}}>
                {parse("sadkjc", optionSelectStaticMathField)}
              </div> */}
        <div className={styles.contentParent}> 
          <div className={styles.hori}  >
              <div id={styles.horizontal_line} >
                  <div  id="xline"  className={styles.xline}> 
                    <div className={styles.arrowLeft} > 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width="60" height="36">
                          <path fill="none" d="M0 0h60v36H0z"/>
                          <path d="M14 18l15-10M15 18l15 10" stroke="#888888" strokeWidth="2"/>
                      </svg>  
                      <div className={styles.arrowBotline}></div>
                       
                    </div>  
                    {lines.map((line)=><>{line}</>)} 
                    <div className={styles.arrowRight} > 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" width="60" height="36">
                        <path fill="none" d="M0 0h60v36H0z"/>
                        <path transform="rotate(180 30 18)"  d="M14 18l15-10M15 18l15 10" stroke="#888888" strokeWidth="2"/>
                    </svg>    
                    <div className={styles.arrowBotline}></div>
                    </div>  
                  </div>
              </div> 
          </div> 
           
        {choiceType=="keying" ? <p style={{padding:"20px 0"}} >{`Enter the ${question.ansArray.length > 1 ? "answers" : "answer"} in the ${question.ansArray.length > 1 ? "boxes." : "box."}`} </p> : choiceType=="mapping" ? <p style={{padding:"20px 0"}} >{`Click on the ${question.ansArray.length > 1 ? "numbers" : "number"} to select.`}</p> :""}
        {choiceType == "selectchoice" && <SelectChoice   inputRef={inputRef} content={[]} isFraction={question.isFraction}  totalRows={question.rows} answerHasSelected={hasAnswerSubmitted} choices={choices} studentAnswer={studAns} choiceType={choiceType}  />}
        
   </div>  
      </div> 
    </div>
}
 