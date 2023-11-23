const filterString = (str) => {
  if (typeof str === "string") {
    let patterns = [
      /\sstyle="[^"]*"(.*?)/g,
      /\sstyle = "[^"]*"(.*?)/g,
      /\sstyle= "[^"]*"(.*?)/g,
      /\sstyle ="[^"]*"(.*?)/g,
      /\sstyle='[^']*'(.*?)/g,
      /\sstyle = '[^']*'(.*?)/g,
      /\sstyle ='[^']*'(.*?)/g,
      /\sstyle= '[^']*'(.*?)/g,
    ];
    patterns.forEach((pattern) => {
      str = str.replaceAll(pattern, "");
    });
  }
  return str;
};
const nestedObjectParser = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      nestedObjectParser(obj[key]);
    } else if (typeof obj[key] === "string") {
      obj[key] = filterString(obj[key]);
    }
  }
};
export default function removeStyleAttribute(str) {
  try {
    let obj = JSON.parse(str);
    nestedObjectParser(obj);
    return JSON.stringify(obj);
  } catch (e) {
    return str;
  }
}
