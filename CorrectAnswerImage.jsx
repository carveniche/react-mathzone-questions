import React from 'react';
import styles from './OnlineQuiz.module.css'; 

const CorrectAnswerImage = ({ className }) => {
  return (
    <img
      src="https://d325uq16osfh2r.cloudfront.net/games/Fairy&Sparkle.gif" // Replace with the path to your success image
      alt="Success Image"
      className={`${styles.fairyimage} ${className}`} // Combine CSS module and additional className
    />
  );
};

export default CorrectAnswerImage;
