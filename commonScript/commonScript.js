export const manupulateEquationTypeQuestion2Darr = () => {};
export const manupulateQuestionContent1Darrayed = (arr) => {
  return arr?.map((innerArr) => {
    return innerArr?.map((item) => {
      const { dropVal, ...rest } = item; // Remove the dropVal key
      let obj = { ...rest, [student_answer]: item?.dropVal };
      return { ...obj };
    });
  });

  // return arr?.map((innerArr) => {
  //   return innerArr?.map((item) => {
  //     let obj = { ...item, [student_answer]: item?.dropVal };
  //     return { ...obj };
  //   });
  // });
};

export const manupulateEquationTypeQuestion2Darr = (
  arr,
  value,
  keys = "value"
) => {
  console.log("this is arr", arr);
  console.log("this is value", value);
  let modifiedArr = [];
  for (let i = 0; i < arr.length; i++) {
    let innerArr = arr[i];
    let modifiedInnerArr = [];
    for (let j = 0; j < innerArr.length; j++) {
      let currentItem = innerArr[j];
      let str = `${currentItem.row}row${currentItem.col}col`;
      if (currentItem.isMissed === "true") {
        let currentdropval = value[str];
        let currentValue = arr[i][j][keys];
        if (currentValue.includes(commonClassNameEqn)) {
          modifiedInnerArr.push({
            ...currentItem,
            dropVal: `<span class=${commonClassNameEqn}>$${currentdropval}$</span>`,
          });
        } else {
          modifiedInnerArr.push({
            ...currentItem,
            dropVal: currentValue,
          });
        }
      } else {
        modifiedInnerArr.push({
          ...currentItem,
          dropVal: "",
        });
      }
    }
    modifiedArr.push(modifiedInnerArr);
  }
  return modifiedArr;
};
