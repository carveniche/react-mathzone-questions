import React, { useEffect, useState } from 'react';
import styles from './OnlineQuiz.module.css'; // Import your CSS module

const WrongImage = ({ className, style,showSecondImage }) => {
    const [imageSrc, setImageSrc] = useState("https://d325uq16osfh2r.cloudfront.net/games/G1.png"); 

    useEffect(() => {
      if (showSecondImage) {
        setImageSrc("https://d325uq16osfh2r.cloudfront.net/games/G2.png");
      }
      if(!showSecondImage){
        setImageSrc("https://d325uq16osfh2r.cloudfront.net/games/G1.png");
      }
    }, [showSecondImage]);
  
  return (
    <img
    src={imageSrc} 

      alt="Wrong Answer"
      className={className} 
      style={style} 
    />
  );
};

export default WrongImage;
