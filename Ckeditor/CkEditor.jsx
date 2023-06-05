import HTMLReactParser from "html-react-parser";
import { useEffect, useState, useRef, useContext } from "react";
import { EditableMathField, StaticMathField } from "../../ExternalPackages";
import SolveButton from "../SolveButton";
import GenStyles from "../OnlineQuiz.module.css";
import { ProgressBorder } from "../../Modal2/modal2";
import { ValidationContext } from "../../MainOnlineQuiz/MainOnlineQuizPage";
import { CkeditorVirtualKeyboard } from "./CkEditorVirtualKeyboard/CkeditorVirtualKeyboard";
import SelectMultipleChoice from "../MultipleChoice/SelectMultipleChoice";
import {
  serializeResponse2,
} from "../../CommonJSFiles/gettingResponse";
import CompareTwoValue from "../compareTwoValue";
import CustomAlertBoxMathZone from "../../CommonJSFiles/CustomAlertBoxMathZone";
import compareLatexData from "../../CommonJSFiles/compareLatexData";

const validateSelectChoice = (inputRef, setChoicesId,setChoices) => {
  let arr = inputRef.current;
  let n = arr?.length || 0;
  for (let i = 0; i < n; i++) {
    if (arr[i].show) {
      if (arr[i]?.show == arr[i]?.correct) {
        setChoicesId(arr[i]?.choice_id);
        setChoices(arr[i]?.choices);
        return 2;
      } else {
        setChoices(arr[i]?.choices);
        setChoicesId(arr[i]?.choice_id);
        return 1;
      }
    }
    
  }
  return 0;
};
const collectCheckedItem = (targetType) => {
  let parent = document.getElementById("parentIdQuizEditorOnline");
  let inputTag = parent.querySelectorAll("input");

  let temp = [];
  for (let items of inputTag) {
    if (items.type == targetType) {
      temp.push(items.checked);
    }
  }

  return temp;
};
const compareArray = (arr1, arr2, setRedAlert) => {
  if (arr1.length > 0) {
    let i = 0;

    for (i = 0; i < arr1.length; i++) {
      if (arr1[i] === true) break;
    }
    if (i == arr1.length) {
      setRedAlert(true);
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
          return "wrong";
        }
      }
    }
  }
  return true;
};
const compareTextAnswerArray = (arr1, arr2, setRedAlert) => {
  if (arr1.length > 0) {
    let i = 0;

    for (i = 0; i < arr1.length; i++) {
      if (arr1[i] == "") break;
    }
    if (i < arr1.length) {
      setRedAlert(true);
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (!CompareTwoValue(arr1[i], arr2[i])) {
          return "wrong";
        }
      }
    }
  }
  return true;
};
const disabledSelectChoice = (arr) => {
  let parents = document.querySelector("#ckeditorValueModified");
  let selectBox = parents?.querySelectorAll("select");
  for (let i = 0; i < selectBox.length; i++) {
    let options = selectBox[i]?.querySelectorAll("option");
    for (let j = 0; j < options.length; j++) {
      let values = options[j]?.value;
      if (arr[i]?.includes(values)) {
        options[j].setAttribute("selected", "true");
      } else {
        options[j]?.removeAttribute("selected");
      }
    }
  }
};
const injectValueOnCheckbox = (arr, type) => {
  let parents = document?.querySelector("#ckeditorValueModified");
  let checkbox = parents?.querySelectorAll("input");
  let i = 0;
  for (let item of checkbox) {
    if (item.type === type) {
      if (arr[i]) {
        item?.setAttribute("checked", "true");
      } else {
        item?.removeAttribute("checked");
      }
      i++;
    }
  }
};
const injectTextValue = (arr) => {
  let parents = document.getElementById("ckeditorValueModified");
  let inputs = parents?.querySelectorAll("input");
  let i = 0;
  for (let input of inputs) {
    if (input?.type === "text") {
      input.setAttribute("value", arr[i]);
      i++;
    }
  }
};
const collectTextItem = (targetType) => {
  let parent = document.getElementById("parentIdQuizEditorOnline");
  let inputTag = parent.querySelectorAll("input");

  let temp = [];
  for (let items of inputTag) {
    if (items.type == targetType) {
      temp.push(items.value);
    }
  }
  return temp;
};
const collectSelectOpionData = () => {
  let parent = document.getElementById("parentIdQuizEditorOnline");
  let arr2d = [];
  let selectOption = parent.querySelectorAll("select");
  for (let select of selectOption) {
    let temp = [];
    for (let option of select) {
      if (option.selected) {
        temp.push(option.value);
        //   option.selected=false
      }
    }
    arr2d.push(temp);
  }
  return arr2d;
};

const removeAllSelectType = () => {
  let parent = document.getElementById("parentIdQuizEditorOnline");
  let inputType = parent.querySelectorAll("input");
  for (let item of inputType) {
    item.value = "";
    item.checked = false;
  }
  let selectOption = document.querySelectorAll("select");
  for (let select of selectOption) {
    for (let option of select) {
      option.selected = false;
    }
  }
};

const compareSelectBoxArray = (arr1, arr2, setRedAlert) => {
  for (let items of arr1) {
    for (let item of items) {
      if (item == "Select" || item == "") {
        setRedAlert(true);
        return false;
      }
    }
  }
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] != arr2[i][j]) {
        return "wrong";
      }
    }
  }
  return true;
};
const disabledAll = (id) => {
  let parent = document.getElementById(id);
  let inputBox = parent.querySelectorAll("input");
  let inputBox1 = parent.querySelectorAll("select");
  for (let item of inputBox) {
    item.disabled = true;
  }
  for (let item of inputBox1) {
    item.disabled = true;
  }
};
function CkEditor({ str, meter, choiceData,upload_file_name }) {

  meter = Number(meter) || 0;
  const [isAnswerCorrect] = useState(false);
  const [radioAnswer, setRadioAnswer] = useState([]);
  const [textAnswer, setTextAnswer] = useState([]);
  const ref = useRef([]);
  const inputRef = useRef([]);
  const calcRef = useRef();
  let currentIndex = 0;
  const [showExplation, setShowExplation] = useState(false);
  const heightDiv = useRef(0);
  const [correctAnswerEditor, setCorrectAnswerEditor] = useState({});
  const [state, setState] = useState(true);
  const [value, setValue] = useState({});
  const [currentInputBox, setCurrentInputBox] = useState(0);
  const editableRef = useRef({});
  const optionSelect = {
    replace: (domNode) => {
      if (domNode?.attribs?.class) {
        let clsName = String(domNode?.attribs?.class);
        if (clsName.includes("mathquill-rendered-math")) {
          if (clsName.includes("mathquill-editable")) {
            let y = currentIndex;
            currentIndex = currentIndex + 1;
            return (
              <div
                ref={(el) => (inputRef.current[y] = el)}
                style={{
                  display: "inline-block",
                  height: "fit-content",
                  width: "fit-content",
                  position: "relative",
                }}
                onFocus={() => handleFocus(y)}
              >
                {hasAnswerSubmitted ? (
                  <div
                    style={{
                      minWidth: "80px",
                      minHeight: "50px",
                      borderRadius: "5px",
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    <StaticMathField>
                      {value[y] ? value[y] : ""}
                    </StaticMathField>
                  </div>
                ) : (
                  <EditableMathField
                    latex={value[y] ? value[y] : ""}
                    onChange={(e) => handleChange(e, y)}
                    style={{
                      minWidth: "80px",
                      minHeight: "50px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                    ref={(el) => (editableRef.current[y] = el)}
                  />
                )}
              </div>
            );
          }
          return (
            <StaticMathField>{domNode?.children[0]?.data}</StaticMathField>
          );
        }
      }
    },
  };
  useEffect(() => {
    if (!state) {
      removeAllSelectType();
    }
  }, [state]);
  const [currentVirtualKeyBoard, setCurrentVirtualKeyBoard] = useState(-1);
  const [checkBoxAnswer, setCheckBoxAnswer] = useState([]);
  const [selectOptionAnswer, setSelectOptionAnswer] = useState();

  const handleFocus = (i) => {
    setCurrentVirtualKeyBoard(i);
    setCurrentInputBox(i);
  };
  const handlClick = (str) => {
    if (String(value[currentInputBox]).trim() !== String(str).trim())
      setValueState(str, currentInputBox);
  };

  const setValueState = (text, i) => {
    value[i] = text;
    setValue({ ...value });
  };
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setChoicesId,
    setStudentAnswerQuestion,
    setChoices,
  } = useContext(ValidationContext);
  let hasAnswerSelected = hasAnswerSubmitted;
  let setHasAnswerSelected = setHasAnswerSubmitted;
  const handleChange = (e, i) => {
    setValueState(e.latex(), i);
  };
  useEffect(() => {
    let parent = document.getElementById("parentIdQuizEditorOnline");
    let latex = parent.getElementsByClassName("mathquill-editable");
    let temp = {};
    for (let i = 0; i < latex.length; i++) {
      temp[i] = latex[i].title;
    }
    let temp2 = collectCheckedItem("radio");
    setRadioAnswer([...temp2]);
    temp2 = collectCheckedItem("checkbox");
    setCheckBoxAnswer([...temp2]);
    temp2 = collectTextItem("text");
    setTextAnswer([...temp2]);
    setCorrectAnswerEditor({ ...temp });
    temp2 = collectSelectOpionData();
    setSelectOptionAnswer([...temp2]);
    setState(false);
  }, []);
  const [redAlert,setRedAlert]=useState(false)


  const handleSubmit = () => {
    if (hasAnswerSelected) return;
    let checkRadioAnswer = true;
    let checkTextAnswer = true;
    let checkSelectBoxAnswer = true;
    let checkCheckBoxAnswer = true;
    let editableAnswer = true;
    let selectChoice1 = true;
    let totalAnswerVariable = {};
    //radio answer
    let temp = collectCheckedItem("radio");
    totalAnswerVariable["radio"]={...temp}
    injectValueOnCheckbox(temp,"radio")
    let tempAnswer = compareArray(temp, radioAnswer,setRedAlert,setRedAlert);
    if (!tempAnswer) return;
    checkRadioAnswer = tempAnswer === "wrong" ? false : true;

    //checkbox answer
    temp = collectCheckedItem("checkbox");
    injectValueOnCheckbox(temp,"checkbox")
    totalAnswerVariable["checkbox"]={...temp}
    tempAnswer = compareArray(temp, checkBoxAnswer,setRedAlert,setRedAlert);
    if (!tempAnswer) return;
    checkCheckBoxAnswer = tempAnswer === "wrong" ? false : true;
    //text answer
    temp = collectTextItem("text");
    totalAnswerVariable["text"]={...temp}
    injectTextValue(temp)
    tempAnswer = compareTextAnswerArray(temp, textAnswer,setRedAlert,setRedAlert);
    if (!tempAnswer) return;
    checkTextAnswer = tempAnswer === "wrong" ? false : true;
    //editable
    for (let key in correctAnswerEditor) {
      if (value[key] == undefined || String(value[key]).trim() === "") {
        setRedAlert(true);
        return;
      }
    }
    for (let key in correctAnswerEditor) {
      if (!compareLatexData(value[key] , correctAnswerEditor[key])) {
        editableAnswer = false;
        break;
      }
    }
    temp = collectSelectOpionData();
    disabledSelectChoice(temp)
    tempAnswer = compareSelectBoxArray(temp, selectOptionAnswer,setRedAlert,setRedAlert);
    totalAnswerVariable["select"]={...temp}
    if (!tempAnswer) return;
    checkSelectBoxAnswer = tempAnswer === "wrong" ? false : true;

    if (inputRef1.current.length > 0) {
      let val = validateSelectChoice(inputRef1, setChoicesId, setChoices);
      if (val === 0) {
        setRedAlert(true);
        return;
      } else if (val === 1) selectChoice1 = false;
      else selectChoice1 = true;
    }
    setIsAnswerCorrect(
      checkRadioAnswer &&
        checkTextAnswer &&
        checkSelectBoxAnswer &&
        checkCheckBoxAnswer &&
        editableAnswer &&
        selectChoice1
    );

    disabledAll("parentIdQuizEditorOnline");
    let htmlData = serializeResponse2("ckeditorValueModified");
    let json = htmlData;
    setStudentAnswerQuestion(json);
    setHasAnswerSelected(true);
  };
  const inputRef1 = useRef([]);

  return (
    <div className={`${`${GenStyles.MainApp} ${GenStyles.ckeditor}`} ${GenStyles.ckeditor}`} id="parentIdQuizEditorOnline">
      <SolveButton
        onClick={handleSubmit}
        hasAnswerSubmitted={hasAnswerSelected}
      />
      <div id="studentAnswerResponse">
        {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
        {upload_file_name && (
          <div>
            <img src={upload_file_name} alt="image not found" />
          </div>
        )}
        <div>
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        </div>
        <div
          className={` ${GenStyles.contentParent} ${GenStyles.questionName} ckEditorResetValue ckEditorResetValue`}
          ref={heightDiv}
          style={{ width: "auto" }}
        >
          <div id="ckeditorValueModified">
            {state ? HTMLReactParser(str) : HTMLReactParser(str, optionSelect)}
          </div>
          {!hasAnswerSubmitted && currentVirtualKeyBoard > -1 && (
            <CkeditorVirtualKeyboard
              onClick={handlClick}
              inputRef={inputRef}
              currentInputBox={currentInputBox}
              currentVirtualKeyBoard={currentVirtualKeyBoard}
              setCurrentVirtualKeyBoard={setCurrentVirtualKeyBoard}
              inputState={value}
              setInputState={setValue}
              index={currentInputBox}
              editableRef={editableRef.current[currentInputBox]}
            />
          )}
        </div>
        {choiceData?.length > 0 && (
          <SelectMultipleChoice
            answerHasSelected={hasAnswerSubmitted}
            inputRef={inputRef1}
            choices={choiceData}
          />
        )}
      </div>
    </div>
  );
}

export default CkEditor;
