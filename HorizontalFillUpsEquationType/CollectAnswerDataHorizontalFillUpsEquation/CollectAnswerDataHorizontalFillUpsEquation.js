import parse from "html-react-parser";
import ReactDOMServer from "react-dom/server"
const newTypeDataCollect = (row) => {
  let str = "";
  const optionSelect = {
    replace: (domNode) => {
      if (domNode.tagName) {
        {
          if (domNode.tagName === "img") str += domNode.attribs.src;
        }
      } else {
        str += domNode.data;
        str=str.replace("$","")
        str=str.replace("$","")
       
      }
    },
  };
  parse(row, optionSelect);
  return str;
};
const oldDataCollection = (row) => {
  let str = "";
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName === "mq-selectable") {
          str += domNode.children[0].data;
          str=str.replace("$","")
          str=str.replace("$","")
         
        }
      }
    },
  };
  parse(row, optionSelect);
  return str;
};
export const oldAndNewData = (row) => {
  var str = "";
 
let html=parse(row)

for(let i=0;i<html.length;i++)
{
  if(typeof html[i]==="object")
  {
    let tempStr=  ReactDOMServer.renderToString(html[i])
    if (tempStr.includes("mq-replacable")) {
      html[i] = oldDataCollection(row);
    } else {
      html[i] = newTypeDataCollect(row);
    }
  }
}
  //return Array.isArray(html)?html.join(''):html.trim();
  return Array.isArray(html)?html.join(''):typeof html==="object"?html?.props?.children?.substring(1,html?.props?.children?.length-1):html.trim();
};

export const collectDataAtCompileTime = (data) => {
  let arr = {};
  for (let row of data) {
    if (row.isMissed === "true") {
      arr[`${row.row}row${row.col}col`] = oldAndNewData(row?.value);
    } else {
      arr[`${row.row}row${row.col}col`] = false;
    }
  }
  return { ...arr };
};
