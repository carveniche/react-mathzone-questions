import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StudentResultMathZone } from "../../../../../api";
import ChildHappyAnimation from "../../../../LottieTransformation/ChildHappyAnimation";
import VictoryAnimation from "../../../../LottieTransformation/VictoryAnimation";
import styles from "../../OnlineQuiz.module.css";
export default function StudentView({ practiceId, conceptName, conceptTag }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let search = window.location.search;
    let urlParams = new URLSearchParams(search);
    let userId = urlParams.get("userID");
    let url = `?live_class_practice_id=${practiceId}&user_id=${userId}`;
    getStudentResult(url);
  }, []);
  const [openAnimation, setOpenAnimation] = useState(false);
  const [topScorer, setTopScorer] = useState(false);
  const getStudentResult = async (url) => {
    try {
      let result = await StudentResultMathZone(url);
      console.log(result);
      setData(result?.data?.result_data);
      findPerfectAnimation(result?.data?.result_data);
    } catch (e) {
      console.log("error in api", e);
    }
  };

  const findPerfectAnimation = (data) => {
    if (openAnimation || data?.length < 1) {
      return;
    }
    let temp = data[0] || {};
    let percentageCalc = (temp?.correct || 0) / (temp?.total || 1);
    if (percentageCalc >= 0.8) {
      setTopScorer(true);
    } else {
      setTopScorer(false);
    }
    handleOpenAnimation();
  };
  const handleOpenAnimation = () => {
    let id = setTimeout(() => {
      setOpenAnimation(true);
      clearTimeout(id);
      handleCloseAnimation();
    }, 500);
  };
  const handleCloseAnimation = () => {
    let id = setTimeout(() => {
      clearTimeout(id);
      setOpenAnimation();
    }, 5000);
  };
  return (
    <>
      {openAnimation && !topScorer && <ChildHappyAnimation />}
      {openAnimation && topScorer && <VictoryAnimation />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={styles.title2}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold !important",
            }}
            id={styles.titleStatus}
          >
            Result Status
          </div>
        </div>
        <Grid>
          <div className="borderRight bgColor textColor">Total Questions</div>
          <div className="borderRight bgColor textColor">Skipped Questions</div>
          <div className="borderRight bgColor textColor">Correct </div>
          <div className="borderRight bgColor textColor">Incorrect </div>
          <div className="bgColor textColor">Score</div>
          {data?.map((item, i) => (
            <>
              <div className="borderRight borderTop">{item?.total || 0}</div>
              <div className="borderRight borderTop">{item?.skipped || 0}</div>
              <div className="borderRight borderTop">{item?.correct}</div>
              <div className="borderRight borderTop">{item?.incorrect}</div>
              <div className="borderTop">{item?.score}</div>
            </>
          ))}
        </Grid>
      </div>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  width: 90%;
  margin-top: 0.4rem;
  margin-left: 4%;
  margin-right: 6%;
  grid-template-columns: repeat(5, 1fr);
  word-break: break;
  > div {
    border: 1px solid black;
    padding: 0.2rem;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: 400;
    font-size: 16px;
    word-break: break;
  }
  > .borderRight {
    border-right: 0;
  }
  > .borderTop {
    border-top: 0;
  }
  > .bgColor {
    background-color: deepskyblue;
  }
  > .textColor {
    color: white;
  }
`;
