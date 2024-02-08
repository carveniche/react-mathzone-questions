export default function jsonDataTesting() {
  let obj = {
    status: true,
    question_no: 1,
    total: 10,
    question_data: [
      {
        question_id: 97543,
        operation: "addition",
        question_text:
          '{"operation":"addition","type":"long_division","rows":55,"cols":55,"questionName":"5sdrty","questionContent":[[{"row":0,"col":0},{"row":0,"col":1,"value":"5","isMissed":"false"},{"row":0,"col":2,"value":"5","isMissed":"false"}],[{"row":1,"col":0,"value":"","isMissed":"false"},{"row":1,"col":1,"value":"5","isMissed":"false"},{"row":1,"col":2,"value":"5","isMissed":"false"}],[{"row":2,"col":0,"value":"-","isMissed":"-"},{"row":2,"col":1,"value":"5","isMissed":"true"},{"row":2,"col":2,"value":"6","isMissed":"false"}],[{"row":3,"col":0},{"row":3,"col":1,"value":"1","isMissed":"false"},{"row":3,"col":2,"value":"2","isMissed":"false"}]],"solution":{"model":[{"val":"dfghjkl/"}],"sidebyside":[],"srows":null,"scols":null},"choices":["5"],"choiceType":"dragdrop","choiceCount":1}',
        question_type: "long_division",
        upload_file_name: "",
        level: "level1",
        fib_text: null,
        fib_before_text: null,
        after_question_text: null,
        choice_data: [],
        orc_oprc_data: [],
        ol_data: [],
      },
    ],
    lice_class_id: 4,
    tag_id: 1458,
    level: "level1",
    live_class_practice_id: null,
    message: "Quiz started successfully",
  };
  return obj;
  let obj2 = {
    operation: "addition",
    type: "short_division",
    rows: "2",
    cols: "9",
    questionName:
      'this is the test by developer Horizontal fillups Keying&nbsp;<span class="mq-replacable mq-math-mode" id="510"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="6"><span class="mq-non-leaf" mathquill-command-id="7"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="9"><span mathquill-command-id="8">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
    questionContent: [
      { row: 0, col: 0, value: "1+2", isMissed: "false" },
      {
        row: 0,
        col: 1,
        value:
          '<span class="mq-replacable mq-math-mode" id="271"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="16"><span class="mq-non-leaf" mathquill-command-id="17"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="19"><span mathquill-command-id="18">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
        isMissed: "true",
      },
      { row: 0, col: 2, value: "1+3", isMissed: "false" },
      {
        row: 0,
        col: 3,
        value:
          '<span class="mq-replacable mq-math-mode" id="475"><span class="mq-selectable">$\\sqrt{3}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="35"><span class="mq-non-leaf" mathquill-command-id="36"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="38"><span mathquill-command-id="37">3</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
        isMissed: "false",
      },
      { row: 1, col: 4 - 4, value: "1+4", isMissed: "false" },
      { row: 1, col: 5 - 4, value: "1+4", isMissed: "false" },
      { row: 1, col: 6 - 4, value: "1+4", isMissed: "false" },
      { row: 1, col: 7 - 4, value: "1+4", isMissed: "false" },
      { row: 1, col: 8 - 4, value: "1+4", isMissed: "false" },
    ],
    solution: {
      model: [{ val: "$\\sqrt{2}$" }],
      sidebyside: [],
      srows: null,
      scols: null,
    },
    choices: [
      "1+2",
      '<span class="mq-replacable mq-math-mode" id="475"><span class="mq-selectable">$\\sqrt{3}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="35"><span class="mq-non-leaf" mathquill-command-id="36"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="38"><span mathquill-command-id="37">3</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
      "1+3",
      '<span class="mq-replacable mq-math-mode" id="271"><span class="mq-selectable">$\\sqrt{2}$</span><span class="mq-root-block mq-hasCursor" mathquill-block-id="16"><span class="mq-non-leaf" mathquill-command-id="17"><span class="mq-scaled mq-sqrt-prefix">√</span><span class="mq-non-leaf mq-sqrt-stem" mathquill-block-id="19"><span mathquill-command-id="18">2</span></span></span><span class="mq-cursor">​</span></span></span>&nbsp;',
    ],
    choiceType: "keying",
    choiceCount: 4,
  };

  //  obj.question_data[0].question_type=obj2.type
  //  obj.question_data[0].question_text=JSON.stringify(obj2)
  return { ...obj };
}
