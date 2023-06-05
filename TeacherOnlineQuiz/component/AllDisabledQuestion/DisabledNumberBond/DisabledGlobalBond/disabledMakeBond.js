export const disabledMakeBond = (id1, id2, canvaId,parentId) => {
    
    let point1 = document?.getElementById(id1);
    let point2 = document?.getElementById(id2);
    let parent=document?.getElementById(parentId)
    let parentWidth=parent?.offsetWidth
    let parentHeight=parent?.offsetHeight
    point1 = point1?.getBoundingClientRect();
    point2 = point2?.getBoundingClientRect();
    let left1 = point1?.left;
    let left2 = point2?.left;
    let top1 = point1?.top;
    let top2 = point2?.top;
    let canvas = document?.getElementById(canvaId);
    parent=parent?.getBoundingClientRect()
    let parent2=document?.getElementById(parentId)
    let parentX=parent?.left
    let parentY=parent?.top
  
    if (
      left1 !== undefined &&
      left2 !== undefined &&
      top1 !== undefined &&
      top2 !== undefined &&
      canvas&&parentX!==undefined&&parentY!==undefined
    ) {
      let canvas = document.getElementById(canvaId);
      canvas.width = parent2?.offsetWidth||100;
      canvas.height = parent?.offsetHeight||100;
  
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(left1-parentX, top1-parentY);
      ctx.lineTo(left2-parentX, top2-parentY);
      ctx.stroke();
    }
  };