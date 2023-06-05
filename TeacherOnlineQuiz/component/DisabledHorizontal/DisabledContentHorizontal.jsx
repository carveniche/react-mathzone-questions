import React from "react";
import styled from "styled-components"
export default function DisabledContentHorizontal({ content }) {

    return <div>

        <div>
            {content?.map((items, index) => <FlexBox key={index}>
                {
                    items?.map((item, i) => item.isMissed === "false" ? <div key={i}>{item.value}</div> : <div value={item.value} key={i}

                    >
                        <Input value='' disabled />
                    </div>)
                }
            </FlexBox>)}
        </div>
    </div>
}


const FlexBox = styled.div`
display:flex;

//justify-content:center;
align-items:center;
> div{
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:50px;
    min-width:auto;
}

`
const Input = styled.input`
width:40px;
height:40px;
text-align:center;  
`