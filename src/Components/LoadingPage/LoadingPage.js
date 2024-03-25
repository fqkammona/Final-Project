import React, { useEffect, useState } from 'react';
import './LoadingPage.css';
// Import the Phone component
import Phone from '../../Pages/Home/Phone'; // Adjust the import path according to your file structure

function LoadingPage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFillActive, setIsFillActive] = useState(false);
  const [isFadeToBlackActive, setIsFadeToBlackActive] = useState(false);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [isSpotlightFull, setIsSpotlightFull] = useState(false);
  const [seconds, setSeconds] = useState(0);
  // State to manage the visibility of the Phone component
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  useEffect(() => {
    const fullText = 'GIRL CODED';
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typeInterval);
      }
    }, 150);

    const fillTimer = setTimeout(() => {
      setIsFillActive(true);
    }, 2000);

    const fadeTimer = setTimeout(() => {
      setIsFadeToBlackActive(true);
    }, 5000);

    const spotlightTimer = setTimeout(() => {
      setIsSpotlightActive(true);
    }, 8000);

    const spotlightFullTimer = setTimeout(() => {
      setIsSpotlightFull(true);
    }, 15000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 35000);

    const secondsTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds + 1;
        console.log(`Seconds elapsed: ${newSeconds}`);
        return newSeconds;
      });
    }, 1000);

    // Set a timer to show the Phone component after 10 seconds
    const phoneTimer = setTimeout(() => {
      setIsPhoneVisible(true);
    }, 10000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(fillTimer);
      clearTimeout(fadeTimer);
      clearTimeout(loadingTimer);
      clearTimeout(spotlightTimer);
      clearInterval(secondsTimer);
      clearTimeout(spotlightFullTimer);
      // Clear the phone timer on cleanup
      clearTimeout(phoneTimer);
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`loading-container ${isTypingComplete ? 'fade-to-black' : ''} ${isSpotlightActive ? 'transparent-background' : ''} ${isSpotlightFull ? 'background-white' : ''}`}>
      {isSpotlightActive && <div className={`spotlight ${isSpotlightActive ? 'spotlight-visible' : ''} ${isSpotlightFull ? 'spotlight-expand' : ''}`}></div>}
      <div className={`Logo ${isFillActive ? 'fill-text' : ''} ${isFadeToBlackActive ? 'fade-text-to-black' : ''}`}>{text}</div>
      {/* Render the Phone component based on its visibility state */}
      {isPhoneVisible && <Phone />}
    </div>
  );
}

export default LoadingPage;
