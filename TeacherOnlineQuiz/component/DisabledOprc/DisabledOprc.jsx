import styles from "../../../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { StaticMathField } from "../../component/../../../ExternalPackages";
import { useEffect, useState } from "react";
import styled from "styled-components";
import shuffle from "shuffle-array";
import OprcAnswered from "../../../Oprc/OprcAnswered";
function DisabledOprc({ obj }) {
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            return (
                  <div>
                <StaticMathField>{domNode.attribs.title}</StaticMathField>
              </div>
             
            );
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };
  const [dragState, setDragState] = useState([]);
  useEffect(() => {
    let temp = [];
    obj?.questionContent?.map((item) => item?.map((items) => temp.push(items)));
    temp = shuffle(temp);
    setDragState([...temp]);
  }, []);
  return (
    <div>
      <div>
        <div className={styles.questionName}>
          {parse(obj?.questionName, optionSelect)}
        </div>
        <div>
          <div className={styles.border4}>
            <div></div>
          </div>
        </div>
        <div className={`${styles.contentParent}`}>
       <OprcAnswered obj={obj} />
          <DivBox2 className="draggableOprc" id="draggableOrc">
            {dragState?.map((item, i) => (
              <div>
                  <div style={{ cursor: "pointer" }}>
                    {parse(item, optionSelect)}
                  </div>         
              </div>
            ))}
          </DivBox2>
        </div>
      </div>
    
     
    </div>
  );
}
export default DisabledOprc;
export const Grid = styled.div`
  display: Grid;
  max-width: 90%;
  border: 1px solid black;
box-sizing:border-box;
  margin: 2rem auto;
  grid-template-columns: repeat(${(props) => props.totalCols}, 1fr);
  
  > div:nth-child(even) {
    border: 1px solid black;
    box-sizing:border-box;
  }
  > div {
    border: 1px solid black;
    display: flex;
    box-sizing:border-box;
    justify-content: center;
    align-items: center;
  }
  > div:nth-child(n + ${(props) => props.totalCols + 1}) {
    min-height: 100px;
  
    height: auto;
    box-sizing:border-box;
  }
  > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing:border-box;
  }
`;
export const DivBox = styled.div`

    display: flex;
    gap: 0.4rem;
  postion:relative;
    flex-wrap: wrap;
  box-sizing: border-box;
    z-index:4;
   
  height:auto;
    > div {
      margin: 0 0.21rem;
      
      border-bottom: 1px solid black;
      min-height: 30px;
     min-width: 30px;
     widht:auto;
     height:auto;
     display:flex;
     flex-wrap:wrap;
     word-break:break;
     justify-content: center;
     align-items: center;
    }
  `;
export const DivBox2 = styled.div`
  width: calc(60% - 2rem);
  position: relative;
  height: auto;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 2rem;
  min-height: 60px;
  height: auto;
  border: 1px solid black;
  > div {
    min-width: 30px;
    height: auto;
    width: auto;
    padding:0rem 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
  }
  * .react-draggable react-draggable-dragged {
    transform: translate(0, 0);

  }
`;
export const TextBox = styled.div`
  width: 92%;
  margin: 1rem auto;
`;