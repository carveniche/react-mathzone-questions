import { identity } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GetStudentResultResponse } from "../../../../../../api";
import { excludeParticipant } from "../../../../../../StudentActivitys/ExcludeParticipant";
import { ViewStatusContext } from "../../../../../myPages/demo";
import MyAnswer from "../../../AnswerFolder/myAnswer";
import styles from "../../../component/../OnlineQuiz.module.css";
import TeacherViewEachResponse from "./TeacherViewEachResponse";

export default function TeacherViewStatusMiddle({
  currentQuestion,
  response,
  allId,
  practiceId,
  conceptName,
  conceptTag,
}) {
  let [state, setState] = useState([
   
  ]);
  const [loading,setLoading]=useState(true)
  const findAllStudentId=()=>{
    let temp = allId.filter((item) => !excludeParticipant.includes(item));

    temp = temp.map((item) => {
      let x = item.split("-");
      let obj = { fullId: item, id: x[0], names: x[1] };
      return { ...obj };
    })
    ;
    
    handleResponseClick(currentQuestion-1,temp[0]?.id)
    setState([...temp]);

  }
  useEffect(() => {
    handleHideProgressBorder(true)
    setHideSolveButton(true)
    return ()=> {
      handleHideProgressBorder(false);
      setHideSolveButton(false)
    
    }
  }, []);
  currentQuestion = Number(currentQuestion) || 0;
  const [totalQuestion,setTotalQuestion] = useState([]);
  const [currentSelectedStudent,setCurrentSelectedStudent]=useState(0)
  const { questionStatus, handleResponseCheck, handleModalOff, currentIndex,questionDemount,handleHideProgressBorder,setHideSolveButton } =
    useContext(ViewStatusContext);
  const [currentHeight, setCurrentHeight] = useState(0);
  const timerRef = useRef(null);
  const [datas, setDatas] = useState([]);
  let debounce = (fn, delay) => {
    return (val, identity) => {
      fn(val, identity);
    };
  };

  const handleResponseClick = (i, identity) => {
    const debounceFn = debounce(handleResponseCheck, 3000);
    if (i < currentQuestion) debounceFn(i, identity);
  };
  useEffect(() => {
    handleApi();
  }, []);
  const handleApi = async () => {
    try {
      let result = await GetStudentResultResponse(practiceId);

      setDatas(result?.data?.results);
      findAllStudentId()
      setTotalQuestion(new Array(result?.data?.total||1).fill(0))
      setLoading(false)
      
    } catch (e) {
      console.log(e);
    }
  };
const handleNumberBoxColor=(i,border)=>{
 let val= datas?.filter(
    (items) => items?.student_id == state[currentSelectedStudent]?.id
  )[0]?.student_question_data[i]?.result_data[0]
    ?.correct

if(val)
{
  return "#6caf20"
}
if(val===false)
return "#eb5953"
return "grey"
}
const handlePaticipantTabSelect=(index)=>{
  setCurrentSelectedStudent(index)
  handleResponseClick(currentQuestion-1,state[index]?.id)
}
const findQuestion=(index)=>{
  if(index===1){
   
    let val=datas?.filter(
      (item) =>{
       
        return  item?.student_id == currentIndex?.identity
      }
    )[0]?.student_question_data[currentIndex?.index]?.result_data[0]

  return val

}
  else if(index===2){
   return datas?.filter(
      (item) => item?.student_id == currentIndex?.identity
    )[0]?.student_question_data[currentIndex?.index]?.question_data[0]
      ?.question_type
  }

  else
  return  datas?.filter(
    (item) => item?.student_id == currentIndex?.identity
  )[0]?.student_question_data[currentIndex?.index]
}
  return (
    loading?<><h1>Loading...</h1></>:<>
  
    {state?.length>0?  <FlexContainer>
      
     {state?.length>0&&   <ParticipantContainer>
          {
            state?.map((item,index)=>
            <NameBox  key={index} onClick={()=>handlePaticipantTabSelect(index)} color={currentSelectedStudent===index?"blue":"black"} background={currentSelectedStudent===index?"green":""}>
              {item?.names}
            </NameBox>)
          }
        </ParticipantContainer>}
      <FlexContainer direction={"row"} gap="1rem">
        <QuestionBox >
        {questionDemount&&state?.length>0&&(
        <TeacherViewEachResponse
          response={
            findQuestion(1)
          }
          conceptName={conceptName}
          conceptTag={conceptTag}
          type={
            findQuestion(2)
          }
          studentResponseData={ findQuestion(0)}
          hideCloseButton={true}
          questionDatas={findQuestion(0)}
          showSkippedQuestion={true}
        />
      )}
        </QuestionBox>
        <QuestionNumberContainer>
{
  totalQuestion?.map((_,i)=>{
    return <CircleBox key={i} isVisitedQuestion={i < currentQuestion? (handleNumberBoxColor(i)):"darkgrey"} isCurrentQuestion= {i  == currentIndex.index ? (2) : 0} borderColor={i===currentIndex.index?"indigo":"black"}
    onClick={() => handleResponseClick(i, state[currentSelectedStudent]?.id)}
    
    >
      {i+1}
    </CircleBox>
  })
}
        </QuestionNumberContainer>
      </FlexContainer>
      </FlexContainer>:<h1>No Student Found...</h1>}
    </>
  );
}

const Grid = styled.div`
  display: grid;
  height: auto;
  width: 80%;
  margin: 0 auto;
  grid-template-columns: repeat(2, 1fr);
  > div {
    border: 1px solid black;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: 600;
    font-size: 20px;
  }
  > .borderRight {
    border-right: 0;
  }
  > .borderTop {
    border-top: 0;
  }
  > #questionCircle > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    color: white;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  > #questionCircle {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
  }
  #questionCircle > div:hover {
    background-color: darkgrey;
  }
  > #questionCircle > .visitedQuestion {
    background-color: grey;
  }
  > #questionCircle > .unVisitedQuestion {
    background-color: darkgrey;
  }
  > #questionCircle > .currentQuestion {
    border: 2px solid black;
    background: white;
    color: black;
  }
  #questionCircle > #incorrect {
    background-color: #eb5953;
  }
  #questionCircle > #correct {
    background-color: #6caf20;
  }
`;
const ParticipantContainer=styled.div`
display:flex;
gap:4rem;
row-gap:0.5rem;
width:fit-content;
flex-wrap:wrap;
> div{
  font-weight:normal !important;
};


`

const QuestionBox=styled.div`
display:block;
width:calc(100% - 50px - 1rem );
`

const FlexContainer=styled.div`
display:Flex;
flex-direction:${props=>props.direction??"column"};
gap:1rem;


`

const QuestionNumberContainer=styled.div`
display:flex;
flex-direction:column;
gap:0.8rem;

width:30px;
height:fit-content;
position:sticky;
top:0;
`
const CircleBox=styled.div`
width: 30px;
height: 30px;
border-radius: 50%;

background:${({isVisitedQuestion})=>isVisitedQuestion};
color: white;
font-size: 14px !important;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border:${({isCurrentQuestion})=>isCurrentQuestion}px solid ${({borderColor})=>borderColor};
`

const NameBox=styled.div`
display:flex;
background:${({background})=>background?"lightgreen":"initial"};
padding:15px;
color:black;
border:1px solid black;
border-radius:25px;
min-width:120px;
justify-content: center;

color:${({color})=>color??"black"};

cursor:pointer;
:hover{
  text-decoration:underline;
}

`