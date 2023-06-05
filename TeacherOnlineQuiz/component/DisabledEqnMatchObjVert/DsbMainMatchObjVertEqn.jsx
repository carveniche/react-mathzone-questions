import React from "react";
import DsbMatchObjVertEqn from "./DsbMatchObjVertEqn";
let obj1 = {
  operation: "addition",
  type: "matchobjectsvertical",
  rows: "3",
  cols: "1",
  questionName: "Drag and match&nbsp;<div>&nbsp;</div>",
  questionContent: [
    [
      {
        row: 0,
        col: 0,
        imgvalue: '<span style="text-align: start;">4632 - 10</span>',
        numvalue: "4622",
        isMissed: "false",
      },
    ],
    [
      {
        row: 1,
        col: 0,
        imgvalue: '<span style="text-align: start;">4632 - 100</span>',
        numvalue: "4532",
        isMissed: "false",
      },
    ],
    [
      {
        row: 2,
        col: 0,
        imgvalue: '<span style="text-align: start;">4632 - 1000</span>',
        numvalue: "3632",
        isMissed: "true",
      },
    ],
  ],
  solution: {
    model: [
      {
        val: '<div style="font-size: 20px;">4632 - 10 = 4622</div><div style="font-size: 20px;"><br></div>',
      },
      {
        val: '<div style="font-size: 20px;">4632 - 100 = 4532</div><div style="font-size: 20px;"><br></div>',
      },
      { val: '<span style="font-size: 20px;">4632 - 1000 = 3632</span>' },
    ],
    sidebyside: [],
    srows: null,
    scols: null,
  },
  choices: ["4552", "4622", "4532", "3632"],
  choiceType: "selectchoice",
  choiceCount: 4,
};
let obj = {
  operation: "addition",
  type: "matchobjectsvertical",
  rows: "2",
  cols: "1",
  questionName:
    'this is test by dev 1&nbsp;<span class="mq-replacable mq-math-mode" id="726"><span class="mq-selectable">$4+5=\\frac{1}{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="152"><span mathquill-command-id="153">4</span><span mathquill-command-id="155" class="mq-binary-operator">+</span><span mathquill-command-id="157">5</span><span class="mq-binary-operator" mathquill-command-id="159">=</span><span class="mq-fraction mq-non-leaf" mathquill-command-id="161"><span class="mq-numerator" mathquill-block-id="163"><span mathquill-command-id="162">1</span></span><span class="mq-denominator" mathquill-block-id="165"><span mathquill-command-id="164">2</span></span><span style="display:inline-block;width:0"></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
  questionContent: [
    [
      {
        row: 0,
        col: 0,
        imgvalue:
          'option 1<span class="mq-replacable mq-math-mode" id="91"><span class="mq-selectable">$1^2$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="182"><span mathquill-command-id="183">1</span><span class="mq-supsub mq-non-leaf mq-sup-only" mathquill-command-id="185"><span class="mq-sup" mathquill-block-id="187"><span mathquill-command-id="186">2</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
        numvalue:
          '1+2<span class="mq-replacable mq-math-mode" id="879"><span class="mq-selectable">$\\sqrt{9}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="237"><span class="mq-non-leaf" mathquill-command-id="238"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="240"><span mathquill-command-id="239">9</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
        isMissed: "true",
      },
    ],
    [
      {
        row: 1,
        col: 0,
        imgvalue:
          'option2<span class="mq-replacable mq-math-mode" id="544"><span class="mq-selectable">$4^9$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="204"><span mathquill-command-id="205">4</span><span class="mq-supsub mq-non-leaf mq-sup-only" mathquill-command-id="207"><span class="mq-sup" mathquill-block-id="209"><span mathquill-command-id="208">9</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
        numvalue: "1+25=9",
        isMissed: "false",
      },
    ],
  ],
  solution: {
    model: [
      {
        val: '1+2<span class="mq-replacable mq-math-mode" id="500"><span class="mq-selectable">$\\sqrt{9}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="313"><span class="mq-non-leaf" mathquill-command-id="314"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="316"><span mathquill-command-id="315">9</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
      },
    ],
    sidebyside: [],
    srows: null,
    scols: null,
  },
  choices: [
    '<span class="mq-replacable mq-math-mode" id="339"><span class="mq-selectable">$4+9$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="258"><span mathquill-command-id="259">4</span><span mathquill-command-id="261" class="mq-binary-operator">+</span><span mathquill-command-id="263">9</span><span class="mq-cursor"></span></span></span>&nbsp;',
    '<span class="mq-replacable mq-math-mode" id="943"><span class="mq-selectable">$8^9$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="280"><span mathquill-command-id="281">8</span><span class="mq-supsub mq-non-leaf mq-sup-only" mathquill-command-id="283"><span class="mq-sup" mathquill-block-id="285"><span mathquill-command-id="284">9</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
    '1+2<span class="mq-replacable mq-math-mode" id="879"><span class="mq-selectable">$\\sqrt{9}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="237"><span class="mq-non-leaf" mathquill-command-id="238"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="240"><span mathquill-command-id="239">9</span></span></span><span class="mq-cursor"></span></span></span>&nbsp;',
    "normal text",
  ],
  choiceType: "dragdrop",
  choiceCount: 4,
};

export default function DsbMainMatchObjVertEqn({obj, meter }) {
  let totalRows = Number(obj?.rows) || 0;

  let arr = [];
  for (let i = 0; i < totalRows; i++) {
    obj?.questionContent[i]?.map((item, j) => {
      item?.row == i && item?.col == j && arr.push({ ...item });
    });
  }
  let temp = { ...obj, questionContent: [...arr] };
  return (
    <DsbMatchObjVertEqn
      state={temp}
      totalRows={temp?.rows}
      totalCols={temp?.cols}
      meter={meter}
    />
  );
}
