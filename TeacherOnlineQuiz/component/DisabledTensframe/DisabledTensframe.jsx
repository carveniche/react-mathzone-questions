import React from "react"
import { useRef, useState, useEffect } from "react";
import styles from "../../../OnlineQuiz.module.css";
import HtmlParser from "react-html-parser";
import styled from "styled-components"
import TensframeContent from "../../../TensFrame/TensFrameContent";
import { ProgressBorder } from "../../../../Modal2/modal2";
export default function DisabledTensFrame({ state, totalRows, totalColumns,meter }) {
meter=Number(meter)
    let boxesImageRef = useRef([])
    let [index, setIndex] = useState(0)
    let [answerSubmit, setAnswerSubmit] = useState(false)
    return <div >
        <div>
            <div className={styles.questionName}>
                {HtmlParser(state?.questionName)}
            </div>
            {state?.upload_file_name&&<div><img src={state?.upload_file_name} alt="image not found"/></div>}
            <div>
          <ProgressBorder meter={meter+1}>
            <div></div>
          </ProgressBorder>
        </div>
            <div class={styles.contentParent}>

                <TensframeContent totalColumns={totalColumns} boxesImageRef={boxesImageRef} images={HtmlParser(state?.questionContent)} currentIndex={index} />
                <div>
                <div className={styles.questionName}>Click to add</div>
                <div className={styles.flex}>
                    <ButtonBox disabled={answerSubmit}>
                        <div>1</div>
                        <div>{HtmlParser(state?.questionContent)}</div>
                    </ButtonBox>
                    <ButtonBox disabled={answerSubmit} >
                        <div>1</div>
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdZqfU-iVR-ddMW3t0qFTshLKUaBwboTZyg&usqp=CAU" />
                        </div>
                    </ButtonBox>
                </div>
                </div>
            </div>
        </div>
    </div>
}




const ButtonBox = styled.button`
width:80px;
background-color:white;
display:block;
height:80px;
margin:20px;
border:1px solid black;
display:flex;
justify-content:center;
text-align:center;
align-items:center;
gap:0.6rem;
* img{
    width:50px;
    height:50px;
}

`