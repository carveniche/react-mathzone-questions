import React, { useEffect, useState } from "react";
import styles from "../OnlineQuiz.module.css";
import parse from "html-react-parser";
import { DivBox, Grid } from "./Oprc";
import { StaticMathField } from "../../ExternalPackages";
export default function OprcAnswered({ obj }) {
    const [dropState,setDropState]=useState([])
    const optionSelect = {
        replace: (domNode) => {
          if (domNode?.attribs?.class) {
            let clsName = String(domNode?.attribs?.class);
            if (clsName.includes("mathquill-rendered-math")||clsName.includes("mathImg")) {
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
      useEffect(() => {
        let temp2 = [];
       let j=0
    let n=obj?.orc_oprc_data[0]?.row_headers?.length || 1;
    for(let i=0;i<n;i++){
        let item=[]
        
        while(j<Math.floor(obj?.orc_oprc_data[0]?.response?.length/n*(i+1))){
            item.push(obj?.orc_oprc_data[0]?.response[j][0])
            j=j+1
        }
        temp2.push(item)
       
    }
    setDropState([...temp2])
      }, []);
    
  return (  <div style={{clear:'both'}}>
        <div className={`${styles.contentParent}`}>
          <Grid
            totalCols={
              obj?.orc_oprc_data[0]?.row_headers?.length > 0
                ? obj?.orc_oprc_data[0]?.column_headers?.length + 1
                : obj?.orc_oprc_data[0]?.column_headers?.length
            }
          >
            {obj?.orc_oprc_data[0]?.row_headers?.length > 0 && <div></div>}
            {obj?.orc_oprc_data[0]?.column_headers?.map((item, i) => (
              <div>{parse(item,optionSelect)}</div>
            ))}
            {obj?.orc_oprc_data[0]?.row_headers?.map((item, i) => (
              <>
                <div>{parse(item, optionSelect)}</div>
                {dropState[i]?.map((item, index) => (
                  <DivBox
                    style={{ cursor: "pointer" }}
                    className="droppableOprc"
                    id={`${i} ${index}`}
                  >
                     
                        <div>{parse(item,optionSelect)}</div>
                    
                  </DivBox>
                ))}
              </>
            ))}
          </Grid>
         
        </div>
        </div>     
    
  );
}
