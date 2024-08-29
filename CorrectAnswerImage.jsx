import React from 'react';
import styles from './OnlineQuiz.module.css'; 

const CorrectAnswerImage = ({ className, style }) => {
  return (
    <img
      src="https://d325uq16osfh2r.cloudfront.net/games/Forest%20Angel.gif" // Replace with the path to your success panda image
      alt="Success Panda"
      className={className} // Apply animation class
      style={style} // Apply additional inline styles
    />
  );
};

export default CorrectAnswerImage;
