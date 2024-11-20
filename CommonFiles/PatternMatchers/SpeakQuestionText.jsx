import React, { useContext, useEffect, useState } from "react";
import audioPaused from "./AudioPaused.json";
import audioPlaying from "./AudioPlaying.json";

import Lottie from "react-lottie";
import { ValidationContext } from "../../../MainOnlineQuiz/MainOnlineQuizPage";

export default function SpeakQuestionText({ type, readText }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [canStart, setCanStart] = useState(false);
  const { indianAccent } = useContext(ValidationContext);
  console.log({ readText });
  console.log(text);
  function removeImgTags(inputHTML) {
    const imgTagRegex = /<img[^>]*>/g;
    return inputHTML.replace(imgTagRegex, "");
  }

  useEffect(() => {
    if (readText.length > 0) {
      if (readText.includes("img")) readText = removeImgTags(readText);
      if (type == "oldType") readText = convertMathToSpeech(readText);
      readText = replaceMathQuillSpans(readText);
      readText = readText
        .replaceAll("</div>", "")
        .replaceAll("<div>", "")
        .replaceAll("&nbsp", "")
        .replaceAll(";", "")
        .replaceAll("_", "")
        .replaceAll("<\\br>", "")
        .replaceAll("<br>", "")
        .replaceAll("<br/>", "")
        .replaceAll("<span>", "")
        .replaceAll("</span>", "")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "");

      setText(
        readText
          .split(".")
          .map((line) => line.trim())
          .filter(Boolean)
      );
    }

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    updateVoices();

    window.speechSynthesis.onvoiceschanged = updateVoices;
    const timer = setTimeout(() => {
      setCanStart(true);
    }, 1000);
    return () => {
      if (timer) clearTimeout(timer);

      window.speechSynthesis.cancel();
    };
  }, [canStart]);
  useEffect(() => {
    const voiceCheckTimer = setTimeout(() => {
      if (voices.length === 0) {
        console.error("Fallback: No voices loaded");
      }
    }, 2000);
    return () => clearTimeout(voiceCheckTimer);
  }, [voices]);
  const readTheQuestionText = () => {
    const voicesAvailable = window.speechSynthesis.getVoices();
    if (isSpeaking || text.length === 0) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const textNeedstoSpoken = text.join(". ");
    const utterance = new SpeechSynthesisUtterance(textNeedstoSpoken);
    var indainAccentVoice;
    if (indianAccent)
      indainAccentVoice = voicesAvailable.filter(
        (voice) =>
          voice.lang === "en-IN" && voice.name.toLowerCase().includes("heera")
      );

    utterance.voice =
      (indainAccentVoice && indainAccentVoice[0]) ||
      voicesAvailable[7] ||
      voicesAvailable[0];
    if (voices.length === 0) {
      console.error("There was an error while generating speech:");
    }
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.log("Speech as synthesis error:", event.error);
    };

    window.speechSynthesis.speak(utterance);
  };
  const playingOptions = {
    loop: true,
    autoplay: true,
    animationData: audioPlaying,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const pausedOptions = {
    loop: true,
    autoplay: true,
    animationData: audioPaused,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  function replaceMathQuillSpans(input) {
    const fracRegex = /<span[^>]*>\$(\S+)\\frac{(-?\d+)}{(-?\d+)}\$/g;
    input = input.replace(fracRegex, (match, variable, num, denom) => {
      return `${variable}  ${num} ${num < 0 ? "- " : ""}by ${denom}`;
    });

    const areaRegex =
      /<span class="mq-selectable">\$(\S+)\^([a-zA-Z0-9\-\.]+)\$<\/span>/g;
    input = input.replace(areaRegex, (match, unit, exponent) => {
      switch (unit) {
        case "cm":
          unit = "centimeter";
          break;
        case "km":
          unit = "kilometer";
          break;
        default:
          unit = unit;
      }
      switch (exponent) {
        case "2":
          exponent = "square";
          break;
        case "3":
          exponent = "cube";
          break;
        default:
          exponent = `to the power of ${exponent}`;
      }
      return `${unit} ${exponent}`;
    });

    const sqrtRegex = /\$(.*?)\$|\\text\{([^}]+)\}|\\sqrt\[(\d+)\]\{([^}]+)\}/g;
    input = input.replace(
      sqrtRegex,
      (match, latexContent, textContent, exponent, insideBraces) => {
        if (latexContent) {
          const textMatch = latexContent.match(/\\text\{([^}]+)\}/);
          const squareRootMatch = latexContent.match(
            /\\sqrt\[(.*?)\]\{(.*?)\}/
          );
          if (textMatch && squareRootMatch) {
            var root = squareRootMatch[1];
            var value = squareRootMatch[2];
            switch (root) {
              case "2":
                root = "square";
                break;
              case "3":
                root = "cube";
                break;
              default:
                root = `${root} `;
            }
            return `${textMatch[1]} ${root} root of ${value}`;
          }
        }

        return match;
      }
    );
    input = input.replace(/\\sqrt\{(.*?)\}/g, (match, content) => {
      return `square root of ${content}`;
    });

    input = input.replace(/\$\\text{([^}]+)}\$/g, (match, text) => {
      return text;
    });

    input = input.replaceAll('<span class="mq-selectable">', "");
    input = input.replace(/\$/g, "");

    return input;
  }
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={readTheQuestionText}>
        <Lottie
          onClick={readTheQuestionText}
          options={isSpeaking ? playingOptions : pausedOptions}
          height={"50px"}
          width={"50px"}
          cursor={"pointer"}
          style={{ margin: "0" }}
        />
      </div>
    </>
  );
}
function convertMathToSpeech(htmlContent) {
  const parser = new DOMParser();
  htmlContent = htmlContent.replace(
    /(\w+)<sup>(\w+)<\/sup>/g,
    "$1 to the power of $2"
  );
  const doc = parser.parseFromString(htmlContent, "text/html");

  let readableText = doc.body.innerText || doc.body.textContent;

  readableText = readableText.replace(/(\d+)\s*\/\s*(\w+)/g, "$1 by $2");

  readableText = readableText.replace(
    /(\w+)\s*\^(\w+)/g,
    "$1 to the power of $2"
  );

  readableText = readableText.replace(/\n/g, " ");
  readableText = readableText.replace(/\s+/g, " ").trim();

  return readableText;
}
