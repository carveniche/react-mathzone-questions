
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 ─ VALIDATION  (pure function, zero DOM)
// ─────────────────────────────────────────────────────────────────────────────
/*
  inputValues shape:
    Plain keying  →  { [tickIndex: number]: "14.7" }
    Frac  keying  →  { [identity: string]: { whole:"1", num:"2", denom:"3" } }

  studAns:
    mapping      →  array of selected answer strings / numbers
    selectchoice →  [selectedOptionValue]  (set by onSelect callback)
*/
export default function validateAnswer({ choiceType, ticks, inputValues, studAns, question, inputRef }) {
  const isDecimalQ = parseFloat(question.interval) % 1 > 0;
  let isWrong = false;
  let isEmpty = false;
  let studentFinalAnswer;

  // ── keying ──────────────────────────────────────────────────────────────────
  if (choiceType === "keying") {
    if (question.isFraction) {

      const answerTicks = ticks.filter(t => t.isAnswer);
      let collected = [];

      answerTicks.forEach(t => {
        const iv = inputValues[t.identity] || {};
        if (t.kind === "fracWhole") {
          // Whole-number keying position: just the whole number
          collected.push(`${iv.whole ?? ""} 0 ${t.denom}`);
        } else {
          // Fractional keying position: whole + num/denom
          collected.push(`${iv.whole ?? ""} ${iv.num ?? ""} ${iv.denom ?? t.denom}`);
        }
      });

      // Normalise sign encoding to match original ansArray format
      collected = collected.map(opt => {
        const p = opt.split(" ");
        if (p[0] === "-") p[0] = "0";
        if (p[1]?.includes("-")) { p[1] = p[1].replace(/-/g, ""); p[2] = `-${p[2]}`; }
        if (p[0]?.includes("-")) p[2] = `-${p[2]}`;
        return p.join(" ");
      });

      const expected = question.ansArray.map(a => String(a));
      if (collected.length !== question.ansArray.length) isEmpty = true;
      else collected.forEach(a => { if (!expected.includes(a)) isWrong = true; });

      // Check for any blank inputs
      if (!isEmpty) {
        collected.forEach(a => {
          const parts = a.split(" ");
          if (parts.some(p => p.trim() === "")) isEmpty = true;
        });
      }

      studentFinalAnswer = collected;

    } else {
      // Plain / decimal keying
      const answerTicks = ticks.filter(t => t.isAnswer && t.kind === "plain");
      const solution = answerTicks.map(t => {
        const raw = String(inputValues[t.index] ?? "").trim();
        return isDecimalQ ? parseFloat(raw) : parseInt(raw, 10);
      }).sort((a, b) => b - a);

      const expected = [...question.ansArray].sort((a, b) => b - a);
      expected.forEach((exp, i) => {
        if (solution[i] == null || isNaN(solution[i])) isEmpty = true;
        else if (solution[i] !== exp) isWrong = true;
      });
      studentFinalAnswer = solution;
    }
  }

  // ── mapping ─────────────────────────────────────────────────────────────────
  else if (choiceType === "mapping") {
    if (studAns.length !== question.ansArray.length) isEmpty = true;
    else studAns.forEach(a => { if (!question.ansArray.includes(a)) isWrong = true; });
    studentFinalAnswer = studAns;
  }

  // ── selectchoice ─────────────────────────────────────────────────────────────
  else if (choiceType === "selectchoice") {
    
    if (question.isFraction) {
      var selectedOption;
      for (var i = 0; i < inputRef.current.length; i++) {
        if (inputRef.current[i].show)
          selectedOption = inputRef.current[i].value;
      }
      var parser = new DOMParser();
      var doc = parser.parseFromString(selectedOption, "text/html");
      var selectedAnswer = doc.querySelector("span");
      if (
        selectedAnswer &&
        selectedAnswer?.dataset &&
        selectedAnswer?.dataset?.correctanswer == undefined
      )
        isWrong = true;
      if (typeof selectedOption == "undefined") isEmpty = true;
    } else {
      var selectedOption;
      for (var i = 0; i < inputRef.current.length; i++) {
        if (inputRef.current[i].show)
          selectedOption = inputRef.current[i].value;
      }
      if (typeof selectedOption == "undefined") isEmpty = true;
      if (selectedOption != question.ansArray[0]) isWrong = true;
    }

    studentFinalAnswer = selectedOption;
  }

  return { isWrong, isEmpty, studentFinalAnswer };
}

