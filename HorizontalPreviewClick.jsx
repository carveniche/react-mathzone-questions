import React, { useContext, useRef, useState, useEffect } from "react";
import HtmlParser from "react-html-parser";
import CustomAlertBoxMathZone from "../CommonJSFiles/CustomAlertBoxMathZone";
import { serializeResponse } from "../CommonJSFiles/gettingResponse";
import { student_answer } from "../CommonJSFiles/ManupulateJsonData/oneDto2D";
import ConditionOnProgressBar from "../CommonJsxComponent/ConditionOnProgressBar";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import styles from "./OnlineQuiz.module.css";
import OnlineQuizQuestionContent from "./OnlineQuizQuestionContent";
import OnlineQuizSelectChoiceOption from "./OnlineQuizSelectChoiceOption";
import SolveButton from "./SolveButton";
import OnlineQuizSelectChoiceOptionMushroom from "./OnlineQuizSelectChoiceQuestionMushroom";
import ProgressBar from "./ProgressBar";
import CoinsContainer from "./CoinsContainer";
import CoinImage from "./CoinImage";
import CorrectAnswerImage from "./CorrectAnswerImage";
import WrongImage from "./WrongImage";

function HorizontalPreviewClick({ obj, meter }) {
  console.log(obj.choices, "check obj");
  console.log(meter);

  meter = Number(meter) || 0;
  const {
    hasAnswerSubmitted,
    setHasAnswerSubmitted,
    setIsAnswerCorrect,
    setStudentAnswerQuestion,
    setQuestionWithAnswer,
    isStudentAnswerResponse,
    isAnswerCorrect,
  } = useContext(ValidationContext);
  const showAnswer = hasAnswerSubmitted;
  const setShowAnswer = setHasAnswerSubmitted;
  const [answerHasSelected, setHasAnswerSelected] = useState(false);
  const input2Ref = useRef("");
  const [isPlaying, setIsPlaying] = useState(false);
  // const [play, { stop }] = useSound(sound1);
  const [coins, setCoins] = useState(0);
  const [coinAnimation, setCoinAnimation] = useState(false); // New state for coin animation
  const [showSuccessImage, setShowSuccessImage] = useState(false); // State for showing success panda

  console.log(isAnswerCorrect, "check answer value");
  const [redAlert, setRedAlert] = useState(false);
  const [progress, setProgress] = useState(Array(10).fill("gray"));
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false);
  const [showWrongImage, setShowWrongImage] = useState(false);
  const [showSecondWrongImage, setShowSecondWrongImage] = useState(false); // State for showing second wrong image

  
  const handleCorrectAnswer = () => {
    let newProgress = [...progress];
    const segmentsToFill = 3; // Number of segments to fill as an example
    for (let i = 0; i < segmentsToFill; i++) {
      newProgress[i] = "green";
    }
    playSound("https://d325uq16osfh2r.cloudfront.net/games/correct.mp3");

    setProgress(newProgress);
    setCoinAnimation(true); // Start coin animation
    setTimeout(() => {
      setCoins(coins + 1); // Increase coins count after animation
      setCoinAnimation(false);
      setShowSuccessImage(true); // Show success panda after animation
      setCorrectAnswerGiven(true);
      setTimeout(() => {
        setShowSuccessImage(false); // Hide success panda after a certain duration
      }, 3000); // Reset animation state
    }, 1000);
  };

  const handleSubmitAnswer = () => {
    if (!answerHasSelected) {
      setRedAlert(true);
      return;
    }
    let jsonData = serializeResponse("studentAnswerResponse");
    setQuestionWithAnswer({ ...obj, [student_answer]: input2Ref?.current });
    setStudentAnswerQuestion(jsonData);
    setShowAnswer(true);
    if (isAnswerCorrect) {
      handleCorrectAnswer();
    }
    else{
      handleWrongAnswer()
    }
  };
  const handleWrongAnswer = () => {
    playSound("https://d325uq16osfh2r.cloudfront.net/games/wrong.mp3")
    setShowWrongImage(true); // Show wrong image
    setTimeout(() => {
      setShowSecondWrongImage(true); // Show second wrong image after a delay
    }, 1500); 
  
  };
  const toggleSound = () => {
    // console.log("toggle sound");
    // if (isPlaying) {
    //   stop();
    // } else {
    //   play();
    // }
    // setIsPlaying(!isPlaying);
  };
  function extractTextFromHtml(htmlContent) {
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    return element.textContent || element.innerText || "";
  }

  const readQuestion = () => {
    console.log("read question");
    const textToRead = extractTextFromHtml(obj?.questionName);

    console.log(obj?.questionName);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    const voices = window.speechSynthesis.getVoices();
    const kidFriendlyVoice = voices.find((voice) =>
      voice.name.includes("Google UK English Female")
    );
    if (kidFriendlyVoice) {
      utterance.voice = kidFriendlyVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };
  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
  };
  const choicesContainImage = obj.choices.some((choice) => isImageUrl(choice));
  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };




  return (
    <div>
      {!isStudentAnswerResponse && (
        <SolveButton
          onClick={handleSubmitAnswer}
          hasAnswerSubmitted={hasAnswerSubmitted}
        />
      )}
      {redAlert && !hasAnswerSubmitted && <CustomAlertBoxMathZone />}
      <div
        id="studentAnswerResponse"
        style={{ display: "flex", gap: 90, marginTop: 30 }}
      >
        <div style={stylesProgress.iconsContainer}>
          {!isPlaying ? (
            <img
              src="https://d325uq16osfh2r.cloudfront.net/games/mic.png"
              alt="Sound"
              style={{ height: "100px", width: "100px" }}
              onClick={toggleSound}
            />
          ) : (
            <img
              src="https://d325uq16osfh2r.cloudfront.net/games/Mute.png"
              alt="Sound"
              style={{ height: "100px", width: "100px" }}
              onClick={toggleSound}
            />
          )}
          <img
            src="https://d325uq16osfh2r.cloudfront.net/games/speaker.png"
            alt="Voice"
            style={{ height: "100px", width: "100px" }}
            onClick={readQuestion}
          />
        </div>

        <div>
          <div className={styles.questionName} >
            {HtmlParser(obj?.questionName)}
          </div>
          {obj?.upload_file_name && (
            <div>
              <img src={obj?.upload_file_name} alt="image not found" />
            </div>
          )}
          <div>
            <ConditionOnProgressBar meter={meter} />
          </div>

          <CoinsContainer coins={coins} setCoins={setCoins} correctAnswerGiven={correctAnswerGiven} />

          <ProgressBar progress={progress} setProgress={setProgress} />
          <div className={styles.contentParent} >
            {Boolean(obj?.rows) && Boolean(obj?.cols) && (
              <OnlineQuizQuestionContent
                totalRows={obj?.rows}
                totalColumn={obj?.cols}
                content={obj?.questionContent}
              />
            )}
            {choicesContainImage ? (
              <OnlineQuizSelectChoiceOption
                choices={obj?.choices}
                correctAnswer={obj?.answer}
                isAnswerSelected={showAnswer}
                setIsAnswerCorrect={setIsAnswerCorrect}
                setanswerHasSelected={setHasAnswerSelected}
                answerRef={input2Ref}
                studentAnswer={obj[student_answer]}
              />
            ) : (
              <OnlineQuizSelectChoiceOptionMushroom
                choices={obj?.choices}
                correctAnswer={obj?.answer}
                isAnswerSelected={showAnswer}
                setIsAnswerCorrect={setIsAnswerCorrect}
                setanswerHasSelected={setHasAnswerSelected}
                answerRef={input2Ref}
                studentAnswer={obj[student_answer]}
              />
            )}
          </div>
        </div>
      </div>
      {coinAnimation && <CoinImage startX={50} startY={100} />}{" "}
      {/* Add animated coin image */}
      {/* {correctAnswerGiven && (
        <CorrectAnswerImage
          className={styles.successPandaAnimation} // Apply animation class
          style={{
            position: "fixed",
            bottom: "420px",
            right: "680px",
            height: "350px",
            width: "350px",
          }}
        />
      )} */}
   
    </div>
  );
}

export default HorizontalPreviewClick;

const stylesProgress = {
  progressBarContainer: {
    position: "absolute",
    right: "220px",
    top: "30px",
    height: "300px",
    width: "20px",
    backgroundColor: "#e9ecef",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column-reverse",
  },
  progressBarSegment: {
    transition: "background-color 0.3s ease",
    width: "100%",
  },
  iconsContainer: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    // gap: "20px",
    marginTop: "-400px",
    marginLeft: "-30px",
  },
  successPandaAnimation: {
    animation: "moveUp 1s ease-out",
  },
};
