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
    position: "fixed", // Use fixed positioning for a consistent position
    right: "2%", // Adjust this for your design
    top: "20%", // Adjust this for your design
    height: "60vh", // Use a viewport height for responsiveness
    width: "2vw", // Use a viewport width for responsiveness
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
