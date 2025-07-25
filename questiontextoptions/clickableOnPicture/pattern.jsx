import parse from "html-react-parser"
export const Pattern = ({keyVal,arrangement,imgUrl,count}) =>{
    let patt = [];
    let im = [];
    let i=0,n=count;
    while(n){
      
        if(n >= 4){
            im = []
            for(let j=0;j<4;j++){
                im[j] =imgUrl;
            }
            i++;
            n = n-4;
        }else{
            im = [];
            for(let j=0;j<n;j++){
                im[j] =imgUrl;
            }
            n = 0;
        }
        patt.push(im)
    }
    return<div key={keyVal}>
        {patt.map((e,i)=>{
           return <div style={{display:`${arrangement=="regular"? "flex":'block'}`}} key={i}>
            { e.map( (val,i)=>parse(val)  ) }
            </div>
        })}
    </div>
}

