import React, { useContext, useRef, useState } from "react";

let prevSelectionAnswerSelection = -1;

function ProgressBar({progress,setProgress}) {
  

  return (
    <div style={styles.progressBarContainer}>
    {progress.map((color, index) => (
      <div
        key={index}
        style={{
          ...styles.progressBarSegment,
          height: `${100 / progress.length}%`,
          backgroundColor: color,
        }}
      />
    ))}
  </div>
  );
}

export default ProgressBar;
const styles = {
  progressBarContainer: {
    position: "fixed",
    right: "2%",
    top: "20%", 
    height: "60vh", 
    width: "2vw", 
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
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
};
