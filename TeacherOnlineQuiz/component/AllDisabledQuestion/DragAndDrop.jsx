import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export default function DragAndDrop(){
const ref=useRef()
const ref2=useRef()
const [update,setUpdate]=useState({show:true,value:'hello world'})
const [dropUpdate,dropSetUpdate]=useState({show:false,value:''})
    const handleStop=(e)=>{
        let position= (dropRef.current).getBoundingClientRect();
        let refPosition=e.target.getBoundingClientRect()
        let eY=Number(window.getComputedStyle(e.target).fontSize.split('px')[0])+refPosition.top
         let dropY=position.top+dropRef.current.offsetHeight
         let dropX=position.left+dropRef.current.offsetWidth
         let eX=refPosition.left
         if(eX>=position.left&&eX<dropX&&refPosition.top>=position.top&& eY<dropY)
         {
      setUpdate({show:false,value:''})
      dropSetUpdate({show:true,value:e.target.textContent})
        return
        }
        setUpdate({...update,show:false})
        setUpdate({...update,show:true})
        
    }
    const handleStop2=(e)=>{
        
        let position= (ref.current).getBoundingClientRect();
        console.log(position.x)
        let refPosition=e.target.getBoundingClientRect()
        let eY=Number(window.getComputedStyle(e.target).fontSize.split('px')[0])+refPosition.top
         let dropY=position.top+ref.current.offsetHeight
         let dropX=position.left+ref.current.offsetWidth
         let eX=refPosition.left
         if(eX>=position.left&&eX<dropX&&refPosition.top>=position.top&& eY<dropY)
         {
      dropSetUpdate({show:false,value:''})
      setUpdate({show:true,value:e.target.textContent})
        return
        }
        console.log(dropUpdate)
        dropSetUpdate({...dropUpdate,show:false})
        dropSetUpdate({...dropUpdate,show:true})
        
    }
    const dropRef=useRef()
    return <div style={{display:'flex',gap:'2rem',margin:"2rem"}} >
        <div style={{position:'relative',width:"auto",height:"auto",border:"1px solid black",zIndex:1,width:200,height:200}} ref={ref}>
           {update.show&& <Draggable onStop={handleStop}>
    <div style={{position:'relative',cursor:'pointer',zIndex:1000000,}}  id="draggable"
    >{update.value}</div>

  </Draggable>}
  </div>
  <div style={{width:200,height:200,border:'1px solid black'}} ref={dropRef}>
{dropUpdate.show&&<Draggable onStop={handleStop2}>
    <div style={{position:'relative',cursor:'pointer',zIndex:1000000,}} id="droppable"
    >{dropUpdate.value}</div>

  </Draggable>}
  </div>
  </div>
}