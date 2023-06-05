import React, { useEffect } from "react"
import styled from "styled-components"
import { useRef, useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import Draggable from "react-draggable";
export default function DisabledDropBoxesImageCompare({ content, totalRows, state, totalCols }) {
    let [rows, setRows] = useState([])
    const [dragState, setDragState] = useState([])
    useEffect(() => {
        let row = []
        for (let i = 0; i < totalRows; i++) {
            let temp = []
            content.map(items => items.map((item) => String(item.row) == String(i) && temp.push({ ...item, show: false, dropValue: '' })))
            row.push(temp)
        }
        setRows([...row])
        let temp = []
        state?.choices?.map((item) => temp.push({ value: item, show: true }))
        setDragState([...temp])
    }, [])

    //handling drag to drop1
    //handling drop to drag


    return <div>
        <div>
            {/* Droppable Part */}
            {
                rows?.map((items, i) => <FlexBox2 key={i} totalRows={totalCols}>
                    {items?.map((item, index) => item.isMissed === 'false' ? (<div key={index} name={item.isMissed}>{HtmlParser(item.value)}</div>) : item?.show ? (
                        <div key={index} style={{ width: "auto", height: 'auto' }} name={item.value}>
                            <Draggable disabled>
                                <DragDropBoxes id="drop" color="white" style={{ background: 'indigo', width: "140px", height: "50px", maxWidth: "140px", cursor: 'pointer' }} >
                                    {item.dropValue}
                                </DragDropBoxes></Draggable>
                        </div>) : <DragDropBoxes key={index} name={item.value} id="drop" style={{ border: '1px solid indigo', width: "140px", height: "50px", maxWidth: "140px" }} ></DragDropBoxes>)}
                </FlexBox2>)
            }

            {/* Draggable Part */}
            <FlexBox backgroundColor="indigo" color="white" border="1px solid indigo" contentWidth="140px" contentHeight="50px">
                {dragState?.map((items, i) => (items.show) ?
                    (<Draggable disabled>
                        <DragDropBoxes style={{ cursor: 'pointer' }} id="drag" backgroundColor="indigo" color="white">{items.value}</DragDropBoxes>
                    </Draggable>) : <DragDropBoxes id="drag" color="white"></DragDropBoxes>
                )}
            </FlexBox>
        </div>
    </div>
}

const FlexBox = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
margin:1rem 0;
gap:2rem;
//justify-content:center;
    align-items:center;

`

const DragDropBoxes = styled.div`
    min-width:120px;
   min-height:50px;
   height:auto;
    width:auto
   display:flex;
   flex-wrap:wrap;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
   background-color:${props => props.backgroundColor};
   color:${props => props.color};
    border:1px solid indigo;
    font-size:20px;
    font-weight:bold;
`

const FlexBox2 = styled.div`
display:flex;
flex-direction:row;

margin:2rem 0.2rem;
gap:1rem;
//justify-content:center;
    align-items:center;
> div{
    width:Calc((100% - ${props => props.totalRow}*2rem) / ${props => props.totalRows});
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
}

`