import React from "react";
import styles from "../OnlineQuiz.module.css";
import AllFile from "../../AllFile";
export default function SkippedQuestionViewer({ obj, identity, resultView }) {
  var temp = {};
  let operation = null;
  let arr = ["orc", "oprc", "ol", "ckeditor"];
  try {
    operation = obj?.question_data[0]?.operation;
    temp = JSON.parse(obj.question_data[0].question_text);

    temp = {
      ...temp,
      upload_file_name: obj.question_data[0]?.upload_file_name,
    };
  } catch (e) {
    temp = obj;
  }

  return (
    <>
      {obj?.question_data && (
        <>
          {arr.includes(obj?.question_data[0]?.question_type) ? (
            <div>
              <AllFile
                obj={obj}
                temp={temp}
                type={obj?.question_data[0]?.question_type}
                resultView={resultView}
              />
            </div>
          ) : (
            <section id={`${operation ? styles.mathZoneNextQuestion : ""}`}>
              <div>
                <AllFile
                  obj={obj}
                  temp={temp}
                  type={obj?.question_data[0]?.question_type}
                  resultView={resultView}
                />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
