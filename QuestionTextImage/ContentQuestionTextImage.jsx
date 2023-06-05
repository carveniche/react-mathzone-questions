import React from "react"
import HtmlParser from "react-html-parser/lib/HtmlParser"
import styled from "styled-components"
import styles from "../OnlineQuiz.module.css"
import parse from "html-react-parser"
import { optionSelectStaticMathField } from "../HorizontalFillUpsEquationType/replaceDomeNode/ReplaceDomNode"
export default function ContentQuestionTextImage({content,contentText})
{
    return <div  className={`${styles.flex} ${styles.flexDirectionRow} ${styles.flexGap2rem}`}>
        <div className={styles.imageBoxes}>
            {parse(content,optionSelectStaticMathField)}
        </div>
       {contentText&& <div className={styles.imageBoxes}>
            {parse(contentText,optionSelectStaticMathField)}
        </div>}
    </div>
}
const FlexBox=styled.div`
display:flex;


`