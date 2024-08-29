import React, { useContext, useEffect, useRef, useState } from "react";


function CoinsContainer({coins,setCoins,correctAnswerGiven}) {
  
    const coinRef = useRef(null);
    const [url,setUrl]=useState("https://d325uq16osfh2r.cloudfront.net/games/Coin%20Score.png")
    const urlImg=()=>{
      setTimeout(()=>{
        setUrl("https://d325uq16osfh2r.cloudfront.net/games/COIN.gif")
      setSameImage()
      },200)
    }
    const setSameImage=()=>{
      setTimeout(() => {
        setUrl("https://d325uq16osfh2r.cloudfront.net/games/Coin%20Score.png")
      }, 1000);
    }
    useEffect(()=>{
      if(correctAnswerGiven){
        urlImg()
      }

    },[correctAnswerGiven])
  return (
    <div style={styles.coinContainer} ref={coinRef}>

    <img
      src={url}
      alt="Coins"
      style={styles.coinIcon}
    />
    <span
     style={styles.coinText}
    >
      {coins}
    </span>{" "}
  </div>
  );
}

export default CoinsContainer;
const styles={
    coinContainer: {
        position: "absolute",
        right: "190px",
        top: "-40px",
        display: "flex",
        alignItems: "center",
      },
      coinIcon: {
        width: "100px",
        height: "100px",
        position: "relative",
      },
      coinText: {
        position: "absolute",
        fontSize: "18px", 
        fontWeight: "bold",
        color: "#333",
        marginLeft: "0px", 
        textAlign: "center",
        width: "100%",
        color: "white", 
      },
     
}
