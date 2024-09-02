import React from 'react';
import styles from './OnlineQuiz.module.css'; 

const YoureAmazing = ({ className }) => {
  return (
    <img
      src="https://d325uq16osfh2r.cloudfront.net/games/you're%20amazing.gif" 
      className={`${styles.youreamazing} ${className}`} 
    />
  );
};

export default YoureAmazing;
