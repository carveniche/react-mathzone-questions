import React from "react"
import styled from "styled-components"
export default function DisabledContentVertical({ content, totalRows, totalCols}) {
    return <div>
        <div style={{ marginTop: "2rem" }}>
            {content?.map((items, index) => <FlexBox key={index} border={index === totalRows - 1 && "2px"} totalWidth={totalCols}>
                {items?.map((item, i) => item.isMissed === 'false' ? <div key={i} value={item.value}>{item.value}</div> : <div value={item.value} key={i}>
                    <Input value='' disabled />
                </div>)}
            </FlexBox>)}
        </div>
    </div>
}

const FlexBox = styled.div`
display:flex;

//justify-content:center;
align-items:center;
border-top:${props => props.border ? props.border : 0} solid black;
width:${props => props.totalWidth * 35}px;

> div{
    display:flex;
    align-items:center;
    justify-content:center;
    width:35px;
    height:35px;

}

`
const Input = styled.input`
width:30px;
height:30px;
text-align:center;  
`