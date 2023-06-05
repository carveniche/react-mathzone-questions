import React, { useEffect } from 'react';
import CountTensFramesQuiz from './CountTensframesQuiz';
function OnlineQuiz({obj,meter,teacher,studentResponseView}) {
  let totalRow = 1;
  let n = obj.questionContent.length;
for (let i = 1; i < n; i++) {
  let prev = obj.questionContent[i - 1].row;
  let curr = obj.questionContent[i].row;
  if (prev !== curr) totalRow += 1;
}

  return <>
 <CountTensFramesQuiz state={obj} totalRows={totalRow} meter={meter} teacher={teacher} studentResponseView={studentResponseView}/>

  </>
}
export default OnlineQuiz;
