import parse from "html-react-parser"
export const Pattern = ({imgUrl,count}) =>{
   
    function findPattern (num)  {
        let arr = [];
        if(num == 1 || num == 2){
            arr[0] = num;
            return arr;
        }
        let val = num;
        let i=1;
        let remaining = 0;
        while(val>0){
           
            val = val - i;
            if(val >= 0){
                 arr.push(i);
                  i++;
            }else{
                remaining = i + val;
            }
            
        }
         addRemaining(arr,remaining)
        return arr;
    }
    
    function addRemaining(arr,rem){
        if(rem == 0){
            return;
        }
       if(rem === arr[arr.length-1]){
            arr.push(rem )
            return;
        } 
        
        let index = arr.length-rem-1;
        if(index == 0){
            index = 1;
        }
        for(let i=index,j=1;i<arr.length;i++,j++){
            arr[i] = arr[i] + 1;
            rem = rem - 1;
            // arr[i] = arr[i]+j;
            // rem = rem - j;
            if(rem <=0){
                break;
            }
        }
        return
    }
    
    let patternArr = findPattern (count );
   
    let patt = [];
   
    
    for(let i=0;i<patternArr.length;i++){
        let im = [];
        for(let j=0;j<patternArr[i];j++){
            im[j] = imgUrl;
        }
   
        patt.push(im);
    }
  
    return<div>
        {patt.map((arr,index)=>{
           return <div style={{textAlign:"center"}} key={index}>{ arr.map( (val,i)=>parse(val)  ) }</div>
        })}
    </div>
}