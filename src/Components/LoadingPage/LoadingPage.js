import React, { useEffect, useState } from 'react';
import './LoadingPage.css';
import Phone from './Phone'; // Adjust the import path according to your file structure

function LoadingPage() {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFillActive, setIsFillActive] = useState(false);
  const [isFadeToBlackActive, setIsFadeToBlackActive] = useState(false);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [isSpotlightFull, setIsSpotlightFull] = useState(false);
  const [isPhoneFadeIn, setIsPhoneFadeIn] = useState(false);
  const [isPhoneFadeOut, setIsPhoneFadeOut] = useState(false);

  useEffect(() => {
    const fullText = 'GIRL C0DED';
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

    setTimeout(() => setIsFillActive(true), 2000);
    setTimeout(() => setIsFadeToBlackActive(true), 5000);
    setTimeout(() => setIsSpotlightActive(true), 6500);
    setTimeout(() => setIsPhoneFadeIn(true), 8000);

    const spotlightFullTimer = setTimeout(() => {
      setIsSpotlightFull(true);
      setIsPhoneFadeOut(true);
    }, 15000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(spotlightFullTimer);
    };
  }, []);

  // Define class strings based on state
  const containerClasses = `loading-container ${isTypingComplete ? 'fade-to-black' : ''} ${isSpotlightActive ? 'transparent-background' : ''} ${isSpotlightFull ? 'background-white' : ''}`;
  const logoClasses = `Logo ${isFillActive ? 'fill-text' : ''} ${isFadeToBlackActive ? 'fade-text-to-black' : ''}`;
  const spotlightClasses = `spotlight ${isSpotlightActive ? 'spotlight-visible' : ''} ${isSpotlightFull ? 'spotlight-expand' : ''}`;
  const phoneClasses = `phone-container ${isPhoneFadeIn ? 'fade-in-phone' : ''} ${isPhoneFadeOut ? 'fade-out-phone' : ''}`;
 
  return (
    <div className={containerClasses}>
      {isSpotlightActive && <div className={spotlightClasses}></div>}
      {isPhoneFadeIn && <div className={phoneClasses}><Phone /></div>}
      {!isPhoneFadeIn && <div className={logoClasses}>{text}</div>}
    </div>
  );
}

export default LoadingPage;
