// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 ─ TICK BUILDER  (pure data, no JSX)
// ─────────────────────────────────────────────────────────────────────────────
/*
  Plain tick shape:
    { kind:"plain", value, label, index, isAnswer, isFirst, isLast }

  Fraction whole-number tick shape:
    { kind:"fracWhole", whole, denom, isNeg, negSuffix,
      identity, fracId, isAnswer, isStart, ansLength }

  Fraction sub-tick shape:
    { kind:"fracSub", whole, denom, isNeg, negSuffix,
      fracNum, effectiveN, fracSection,
      identity, fracId, isAnswer, isEnd,
      startLength, numLength, intLength }

  identity  = the "fracStart fracNum ±denom" string used in ansArray
  negSuffix = "-3" for negative range, "3" for positive
*/
export default function buildTicks(question) {
  const { start, end, interval, isFraction, ansArray } = question;
  const numStart = Number(start);
  const numEnd   = Number(end);
  const numInterval = Number(interval);

  // ── FRACTION path ──────────────────────────────────────────────────────────
  if (isFraction) {
    const denom    = Math.round(numInterval); // e.g. interval="3" → thirds
    const ticks    = [];
    let   whole    = Math.round(numStart);
    const endWhole = Math.round(numEnd);

    while (whole <= endWhole) {
      const isNeg     = whole < 0;
      const negSuffix = isNeg ? `-${denom}` : `${denom}`;
      const identity  = `${whole} 0 ${negSuffix}`;

      // ── whole-number tick ──
      ticks.push({
        kind      : "fracWhole",
        whole, denom, isNeg, negSuffix, identity,
        fracId    : `pBox_${identity}`,
        isAnswer  : ansArray.includes(identity),
        isStart   : whole === Math.round(numStart),
        ansLength : Math.max(1, String(Math.abs(whole)).length + (isNeg ? 1 : 0)),
      });

      if (whole >= endWhole) break;

      // ── sub-ticks between `whole` and `whole + 1` ──
      if (isNeg) {
        // Negative sub-ticks count DOWN visually (left → right toward 0).
        // fracNum = (denom - n) so identity matches ansArray format:
        //   whole=-1, denom=4:  n=3→fracNum=1→"-1 1 -4"  n=2→"-1 2 -4"  n=1→"-1 3 -4"
        for (let n = denom - 1; n >= 1; n--) {
          const fracNum     = denom - n;
          const numPart     = whole === -1 ? `-${fracNum}` : `${fracNum}`;
          const fracSection = `${whole === -1 ? "" : whole + 1} \\frac{${numPart}}{${denom}}`;
          const identity    = `${whole} ${fracNum} -${denom}`;
          ticks.push({
            kind        : "fracSub",
            whole, denom, isNeg: true, negSuffix: `-${denom}`,
            fracNum, effectiveN: fracNum, fracSection, identity,
            fracId      : `pBox_${identity}`,
            isAnswer    : ansArray.includes(identity),
            isEnd       : whole + 1 >= endWhole,
            startLength : Math.max(1, String(Math.abs(whole)).length + (whole < -1 ? 1 : 0)),
            numLength   : whole === -1 ? fracNum.toString().length + 1 : fracNum.toString().length,
            intLength   : String(denom).length,
          });
        }
      } else {
        // Positive sub-ticks count UP from 1 to denom-1.
        // The "land on next whole" tick (n === denom) is skipped here —
        // it will be emitted as a fracWhole in the next loop iteration.
        for (let n = 1; n < denom; n++) {
          const effectiveN  = n % denom; // always non-zero here (n < denom)
          const fracSection = whole === 0
            ? `\\frac{${n}}{${denom}}`
            : `${whole} \\frac{${n}}{${denom}}`;
          const identity = `${whole} ${n} ${denom}`;
          ticks.push({
            kind        : "fracSub",
            whole, denom, isNeg: false, negSuffix: `${denom}`,
            fracNum: n, effectiveN, fracSection, identity,
            fracId      : `pBox_${identity}`,
            isAnswer    : ansArray.includes(identity),
            isEnd       : whole + 1 >= endWhole,
            startLength : Math.max(1, String(whole).length),
            numLength   : String(n).length,
            intLength   : String(denom).length,
          });
        }
      }

      whole++;
    }
    return ticks;
  }

  // ── PLAIN / DECIMAL path ────────────────────────────────────────────────────
  // Use maxDecimals across ALL three strings — critical for start="0.5" + interval="0.01"
  // giving decimals=2, scale=100 (not scale=10 which would make iStep=0 → infinite loop).
  // All loop arithmetic stays in integer space → zero floating-point drift.
  const decimals = maxDecimals(String(start), String(end), String(interval));
  const scale    = Math.pow(10, decimals);
  const iStart   = Math.round(numStart    * scale);
  const iEnd     = Math.round(numEnd      * scale);
  const iStep    = Math.round(numInterval * scale);

  const ticks = [];
  let   idx   = 0;

  for (let i = iStart; i <= iEnd; i += iStep) {
    const value = Number((i / scale).toFixed(decimals));

    // ── LABEL RULE ──
    // BUG that was here: label: String(value)
    //   String(0.1) → "0.1"  ✗  when end="0.10" we need "0.10"
    //
    // FIX: use toFixed(decimals) for true decimals, String() for whole numbers
    //   decimals=0              → String(value)         e.g. "5"
    //   value is a whole number → String(value)         e.g. "15" not "15.0"
    //   otherwise               → value.toFixed(decimals) e.g. "0.10" ✓
    const label = (decimals === 0 || value % 1 === 0)
      ? String(value)
      : value.toFixed(decimals);

    ticks.push({
      kind    : "plain",
      value,
      label,
      index   : idx,
      isAnswer: ansArray.includes(value),
      isFirst : idx === 0,
      isLast  : i + iStep > iEnd,
    });
    idx++;
  }

  // Safety: if float arithmetic caused the end value to be missed, append it
  const lastVal = ticks[ticks.length - 1]?.value;
  const endVal  = Number(numEnd.toFixed(decimals));
  if (lastVal !== endVal) {
    // Same label rule for the safety end-tick
    const endLabel = (decimals === 0 || endVal % 1 === 0)
      ? String(endVal)
      : endVal.toFixed(decimals);
    ticks.push({
      kind: "plain", value: endVal, label: endLabel,
      index: idx, isAnswer: ansArray.includes(endVal),
      isFirst: false, isLast: true,
    });
  }

  return ticks;
}
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 ─ PRECISION HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * countDecimals("0.01") → 2   countDecimals("0.1") → 1   countDecimals("3") → 0
 * Handles scientific notation: "1e-2" → 2
 */
function countDecimals(str) {
  const s = String(str).trim();
  if (s.toLowerCase().includes("e")) {
    const plain = Number(s).toPrecision(20).replace(/\.?0+$/, "");
    return plain.includes(".") ? plain.split(".")[1].length : 0;
  }
  return s.includes(".") ? s.split(".")[1].length : 0;
}

/**
 * maxDecimals("0.5", "1", "0.01") → 2
 * Must use ALL three strings so scale = 100 (not 10) for 2dp intervals.
 */
function maxDecimals(...strs) {
  return Math.max(0, ...strs.map(countDecimals));
}

