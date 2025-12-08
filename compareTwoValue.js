import { symbolCollection } from "../CommonJSFiles/replacingJsonData"

export default function CompareTwoValue(a, b) {
    let temp1 = symbolCollection()[String(a)?.trim()] ? symbolCollection()[String(a)?.trim()] : a;
    let temp2 = symbolCollection()[String(b)?.trim()] ? symbolCollection()[String(b)?.trim()] : b;

    temp1 = normalizeNumberInput(temp1);
    temp2 = normalizeNumberInput(temp2);

    if (temp1 == temp2) return true;

    return false;
}


export function normalizeNumberInput(value) {
  if (value === null || value === undefined) return "";

  value = String(value).trim();

  // If not a number → return as-is (symbols, algebra)
  if (isNaN(Number(value))) return value;

  // Fix cases: ".5" → "0.5"
  if (value.startsWith(".")) value = "0" + value;

  // Fix cases: "5." → "5"
  if (value.endsWith(".")) value = value.slice(0, -1);

  // If no decimal → return normalized number
  if (!value.includes(".")) {
    return String(Number(value)); // removes 0005 → 5
  }

  const [intPart, decimalPart] = value.split(".");

  // If decimal part is all zero → treat as integer
  if (/^0+$/.test(decimalPart)) {
    return String(Number(intPart)); 
  }

  // Otherwise return formatted numeric value
  return String(Number(value));
}
