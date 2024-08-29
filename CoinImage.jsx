import React, { useEffect, useRef } from "react";

function CoinImage() {
  const coinRef = useRef(null);

  useEffect(() => {
    if (coinRef.current) {
      const coinElement = coinRef.current;

      // Set initial position to the bottom-left corner
      coinElement.style.position = "absolute";
      coinElement.style.bottom = "0px"; // Starting Y position
      coinElement.style.left = "30px"; // Starting X position

      // Apply the transition for smooth movement
      coinElement.style.transition = "transform 5s ease-in-out, opacity 5s ease-in-out"; // Adjust duration for slower movement

      // Trigger the animation
      requestAnimationFrame(() => {
        coinElement.style.transform = "translate(780vw, -600vh)"; // Move to the top-right corner
        coinElement.style.opacity = "0"; // Fade out the coin
      });
    }
  }, []);

  return (
    <img
      ref={coinRef}
      src="https://d325uq16osfh2r.cloudfront.net/games/coin.png"
      alt="Animated Coin"
      style={{ width: "100px", height: "100px" }}
    />
  );
}

export default CoinImage;
