
export default function getSelectChoiceMissedValue(questionContent,key="isMissed") {

  // Flatten the 2D array
   let flatItems = [];
  if (!Array.isArray(questionContent)) {
      flatItems = questionContent

  }else{
    flatItems = questionContent.flat(Infinity);
  }
  // Filter and map the missed values
  const missedValues = flatItems
    ?.filter(item => item[key] === "true" && item.value !== undefined)
    .map(item => item.value);
  // Return as a joined string (or empty string if none found)
  return missedValues?.join('') || '';
}
