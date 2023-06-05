import { useEffect } from "react"
import { useRef } from "react"
import { useDrag } from "react-dnd"

export default function Picture({item,id,reference})
{
    const ref=useRef(null)
    const [{isDragging},drag]=useDrag(()=>({
        type:"image",
        item:{id:id},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging()
        })

    }))
    useEffect(()=>{
        reference.current[id]=drag
    },[])
    return <div  ref={drag
    }style={{width:100,height:100,display:"flex",justifyContent:"center",alignItems:"center",border:isDragging?"1px solid black":"4px solid pink"}}>{item}</div>
}