import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import styles from "../OnlineQuiz.module.css";  
import SolveButton from "../SolveButton";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import { student_answer } from "../../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../../CommonJsxComponent/ConditionOnProgressBar";
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
  var isDecimal = (parseFloat( question.interval)%1)>0 &&  (parseFloat(question.interval)%1)<1 ;  
  var start = isDecimal ? parseFloat(question.start): parseInt(question.start)
  var end = isDecimal ? parseFloat(question.end): parseInt(question.end)
  var interval = isDecimal ? parseFloat(question.interval): parseInt(question.interval)
  const [lines, setLines] = useState([])  
  var answers=[] ;
  function handleSubmitAnswer(){ 
    var isWrong = false; 
    var empty = false
    if(choiceType=="keying") {
      answers = Array.from(document.getElementsByClassName("answers"))
      const solution = answers.map(ans => isDecimal?parseFloat(ans.value):parseInt(ans.value));
      for(var i = 0; i<question.ansArray.length ;i++){ 
        if(isNaN(solution[i])) empty=true
        if(solution[i] !=question.ansArray[i] ) isWrong=true
      }
    }else{  
      if(studAns.length!=2) empty = true;
        studAns.forEach(ans=>{ 
          if(!question.ansArray.includes(ans)){
            isWrong = true;
          }
        })
    } 
    if(empty){
      setRedAlert(true)
      return
    }
    else setRedAlert(false) 
    if (hasAnswerSubmitted) return;
    // {empty? setRedAlert(true): isWrong ? alert("Wrong answer") : alert("Correct answer")}
    if(isWrong) setIsAnswerCorrect(false)
    else setIsAnswerCorrect(true)
    setHasAnswerSubmitted(true); 
    setAnswered(true)
    setQuestionWithAnswer({...question,[student_answer]:studAns}) 
  }
  
function setSelected(e){   
  var idOpt = e.target.dataset.option;
  var pointer = document.getElementById(`pBox_${idOpt}`)   
  var ansVal = document.getElementById(`pValBox_${idOpt}`)   
 {choiceType == "mapping" && !answered&& Array.from(pointer.classList).forEach(cla=>{  
  cla.includes("vertBar") ?  pointer.classList.add(`${styles.selected}`)  : pointer.classList.add(`${styles.vertBar}`) 
  pointer.classList.remove(cla); 
})  }
  var sol = isDecimal ? parseFloat(ansVal.textContent):parseInt(ansVal.textContent)
  if(answers.includes(sol)){ 
    answers = answers.filter(ans => ans!=sol)
  }else{ 
    answers.push(sol)
  }  
  setStudAnswers(answers)
}  
  useEffect(()=>{   
    var lineBlocks = []; 
    var index = 0; 
    var inp = 0; 
    for(var mark = (isDecimal?( start+.1):( start+1)); mark< end; (isDecimal ? mark+= parseFloat(interval):mark++ )){
      var idddd = `pBox_${index}`;  
      var idddd2 = `pValBox_${index}`;  
      var num = isDecimal ? Number(parseFloat(mark).toFixed(1)) : parseInt(mark)
      var ansSelected = studAns.includes(num);  
        if(isDecimal){ 
            var ptick = <>
            <div className={styles.botline}> 
              </div>
               <div className={styles.ticktext}  >
                <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>
                 
              {question.questionContent[index] ? 
                  choiceType === "keying" 
                    ? <input className={`${styles.checkNumLine}  answers`}      id={`pBox_${index}`} type="text"/>
                    : <p   value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                  : <p className={styles.mapBox}  id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
              } 
               </div>  
               </>
              if(choiceType === "keying" ) inp++;
              lineBlocks.push(ptick) 
              index++;
        }else if(mark %  interval == 0 && !isDecimal){ 
        var ptick = <>
          <div className={styles.botline}> 
              </div>
             <div className={styles.ticktext}  >
             <div  className={answered ? ansSelected ? styles.ansSelected : styles.answeredVertBar : choiceType == "mapping" ? styles.vertBar : styles.keyVertBar}  data-option={index} id={idddd} onClick={(e)=>setSelected(e)}></div>              
              {question.questionContent[index] ? 
                  choiceType === "keying" 
                    ? <input className={`${styles.checkNumLine}  answers`}    id={`pBox_${index}`} type="text"/>
                    : <p  value={mark} className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                  : <p className={styles.mapBox} id={idddd2}>{isDecimal ? parseFloat(mark).toFixed(1) : parseInt(mark)}</p>
                }

          </div>  
          </> 
              if(choiceType === "keying" ) inp++;
              lineBlocks.push(ptick) 
              index++;
        }
}
setLines(lineBlocks)
 
     },[answered]) 

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
        <div className={styles.contentParent}> 
          <div className={styles.hori}  >
              <div id={styles.horizontal_line} >
                  <div  id="xline" className={styles.xline}> 
                  <p className={styles.start} >{question.start}</p>   
                      {lines.map((line,index)=>{  
                        return <div className={styles.section}   
                        style={{width: `${(window.innerWidth) /  question.interval }px`}}  
                        key={index} >{line}</div>  
                      })} 
                  <p className={styles.end} >{question.end}</p>  
                  </div>
              </div> 
          </div> 
        </div>  
      </div> 
    </div>
}
 