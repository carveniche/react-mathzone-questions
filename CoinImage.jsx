import React, { useEffect, useRef } from "react";

function CoinImage({ startX, startY, endX, endY, duration }) {
  const coinRef = useRef(null);

  useEffect(() => {
    if (coinRef.current) {
      const coinElement = coinRef.current;

      
      const startXInPx = (startX / 100) * window.innerWidth;
      const startYInPx = (startY / 100) * window.innerHeight;
      const endXInPx = (endX / 100) * window.innerWidth;
      const endYInPx = (endY / 100) * window.innerHeight;

      coinElement.style.position = "fixed";
      coinElement.style.left = `${startXInPx}px`;
      coinElement.style.top = `${startYInPx}px`;
      coinElement.style.opacity = "1"; 

      coinElement.style.transition = `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;

      const animationFrameId = requestAnimationFrame(() => {
        const deltaX = endXInPx - startXInPx;
        const deltaY = endYInPx - startYInPx;
        coinElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        coinElement.style.opacity = "0"; 
      });

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [startX, startY, endX, endY, duration]);

  return (
    <img
      ref={coinRef}
      src="https://d325uq16osfh2r.cloudfront.net/games/coin.png"
      alt="Animated Coin"
      style={{ width: "10vw", height: "10vw" }} 
    />
  );
}

export default CoinImage;
