export default function compareLatexData(val1, val2) {
  function simplifyFraction(numerator, denominator) {
    if (numerator === undefined || denominator == undefined) return ["", ""];
    function gcd(a, b) {
      return b === 0 ? Math.abs(a) : gcd(b, a % b);
    }

    const divisor = gcd(numerator, denominator);

    return [numerator / divisor, denominator / divisor];
  }

  //console.log({ val1, val2 });

  val2 = val2.replaceAll("_{ }", "");
  val2 = val2.replaceAll("_{}", "");
  val2 = val2.replaceAll("_{", "");
  val2 = val2.replaceAll("_", "");



  while (val2.includes("_{ }")) val2 = val2.replaceAll("_{ }", "");
  while (val2.includes("_{}")) val2 = val2.replaceAll("_{}", "");
  while (val2.includes("}}")) val2 = val2.replaceAll("}}", "}");
  while (val2.includes("{{")) val2 = val2.replaceAll("{{", "{");

  console.log({ val1, val2 });
  // let mixedFraction = val2.match(/(\d*)\\frac\{([^}]+)\}\{([^}]+)\}/);
  let mixedFraction = val2.match(/(-?\d*)\\frac\{([^}]+)\}\{([^}]+)\}/);
 
  let wholeNumber;
  let numerator;
  let denominator;
  if (val1.includes("^") && !val1.includes("frac")) {
     let normalizedVal2  = val2.split('^').map(part => part.replace(/[{}]/g, '')).join('^');
      return val1 == normalizedVal2 
  }
  else if (mixedFraction) {
    wholeNumber = mixedFraction[1];
    numerator = mixedFraction[2];
    denominator = mixedFraction[3];
  } else {
    console.log("No fraction found");
    

  }
  console.log({ mixedFraction });
  var studentSolutionadfa = wholeNumber
    ? `${wholeNumber == "-" ? "" : wholeNumber}\\frac{${
        wholeNumber == "-" ? "-" : ""
      }${numerator}}{${denominator}}`
    : `frac{${numerator}}{${denominator}}`;
  console.log({ wholeNumber, numerator, denominator });
  var studentSolution = ![
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ].includes(val2)
    ? wholeNumber
      ? wholeNumber == "-"
        ? `frac{-${numerator}}{${denominator}}`
        : wholeNumber != "-"
        ? `${wholeNumber}\\frac{${numerator}}{${denominator}}`
        : `${wholeNumber}\\frac{${numerator}}{${denominator}}`
      : `frac{${numerator}}{${denominator}}`
    : // : `frac{${numerator}}{${denominator}}`
      val2;

  var IntegerPart = val1?.split("\\")[0];
  const numeDenomArr = [...val1.matchAll(/\{([^}]*)\}/g)].map(
    (match) => match[1]
  );
  const numeDenomArrValStudAnswer = [...val2.matchAll(/\{([^}]*)\}/g)].map(
    (match) => match[1]
  );
  var IntegerPartValStudAnswer = val2?.split("\\")[0];
  if (IntegerPartValStudAnswer === "-")
    val2 = `\\frac{-${numeDenomArrValStudAnswer[0]}}{${numeDenomArrValStudAnswer[1]}}`;

  var impureFracVal;
  var mixedfracVal;
  if (IntegerPart) {
    impureFracVal = `\\frac{${
      Number(IntegerPart * numeDenomArr[1]) + Number(numeDenomArr[0])
    }}{${Number(numeDenomArr[1])}}`;
    mixedfracVal = val1;
  } else {
    mixedfracVal = `${
      Math.floor(Number(numeDenomArr[0]) / Number(numeDenomArr[1])) !== 0 &&
      Math.floor(Number(numeDenomArr[0]) / Number(numeDenomArr[1])) !== -1
        ? Math.floor(Number(numeDenomArr[0]) / Number(numeDenomArr[1])) < 0
          ? 1 + Math.floor(Number(numeDenomArr[0]) / Number(numeDenomArr[1]))
          : Math.floor(Number(numeDenomArr[0]) / Number(numeDenomArr[1]))
        : ""
    }\\frac{${
      Number(numeDenomArr[0]) % Number(numeDenomArr[1]) < 0
        ? (-1 * Number(numeDenomArr[0])) % Number(numeDenomArr[1])
        : Number(numeDenomArr[0]) % Number(numeDenomArr[1])
    }}{${Number(numeDenomArr[1])}}`;
    impureFracVal = val1;
  }

  const [numerrr, denominorr] = simplifyFraction(
    numeDenomArr[0],
    numeDenomArr[1]
  );
  var reducedFRAC;
  if (IntegerPart) {
    reducedFRAC = `${IntegerPart}//frac{${numerrr}}{${denominorr}}`;
  } else {
    reducedFRAC = `frac{${numerrr}}{${denominorr}}`;
  }
  var simplestudentSolution;
  if (numerrr && denominorr) {
    simplestudentSolution = reducedFRAC;
  }
  var simplestudentANswer;
  const [numerrrSol, denominorrSol] = simplifyFraction(
    numeDenomArrValStudAnswer[0],
    numeDenomArrValStudAnswer[1]
  );
  var reducedFRACSol;
  if (IntegerPart) {
    reducedFRACSol = `${IntegerPart}//frac{${numerrrSol}}{${denominorrSol}}`;
  } else {
    reducedFRACSol = `frac{${numerrrSol}}{${denominorrSol}}`;
  }
  var simplestudentSolution;
  if (numerrr && denominorr) {
    simplestudentANswer = reducedFRACSol;
  }
  console.log("simplestudentANswer", simplestudentANswer);
  console.log("simplestudentSolution", simplestudentSolution);
  let str = "\\";
  val1 = String(val1);
  val2 = String(val2);
  val1 = val1.split(str);
  val2 = val2.split(str?.trim());
  while (val1.length) {
    if (val1[0] === str || val1[0]?.trim() == "") val1.shift();
    else {
      break;
    }
  }

  while (val2.length) {
    if (val2[0] === str || val2[0]?.trim() == "") val2.shift();
    else {
      break;
    }
  }
  while (val1.length) {
    if (val1[val1.length - 1] === str || val1[val1.length - 1]?.trim() == "")
      val1.pop();
    else {
      break;
    }
  }

  while (val2.length) {
    if (val2[val2.length - 1] === str || val2[val2.length - 1]?.trim() == "")
      val2.pop();
    else {
      break;
    }
  }
  if (impureFracVal[0] == "\\")
    impureFracVal = impureFracVal.replaceAll("\\", "");
  if (mixedfracVal[0] == "\\") mixedfracVal = mixedfracVal.replaceAll("\\", "");
  console.log("------------------------------------");
  console.log("impureFracVal", impureFracVal);
  console.log("simplestudentSolution", simplestudentSolution);
  console.log("mixedfracVal", mixedfracVal);
  console.log("StudentAnswer", val2.join(str)?.trim());
  // return val1.join(str)?.trim() === val2.join(str)?.trim();

  // return (
  //   val2.join(str)?.trim() === impureFracVal ||
  //   val2.join(str)?.trim() === mixedfracVal
  // );
  console.log({ studentSolution });
  console.log({ impureFracVal });
  console.log({ mixedfracVal });
  console.log({ simplestudentSolution });
  return (
    studentSolution === impureFracVal ||
    studentSolution === mixedfracVal ||
    simplestudentANswer === simplestudentSolution
  );
}
