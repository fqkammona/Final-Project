import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';
import Phone from '../../Pages/Home/Phone';

const LoadingPage = () => {
  const fullText = 'GIRL CODED';
  const [text, setText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [expandSpotlight, setExpandSpotlight] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [phoneFadeOut, setPhoneFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let typingTimeout;
    if (!typingComplete && text.length < fullText.length) {
      typingTimeout = setTimeout(() => setText(fullText.slice(0, text.length + 1)), 150);
    } else if (!typingComplete) {
      setTypingComplete(true);
      setTimeout(() => setStartFadeOut(true), 1500); // Wait 1.5 seconds after typing complete
    }
    return () => clearTimeout(typingTimeout);
  }, [text, typingComplete]);

  useEffect(() => {
    let spotlightTimeout;
    let phoneFadeInTimeout;
    let phoneFadeOutTimeout;
    let spotlightExpandTimeout;

    if (startFadeOut) {
      spotlightTimeout = setTimeout(() => setShowSpotlight(true), 5500); // Step 2 starts after the text fades
    }
    if (showSpotlight) {
      phoneFadeInTimeout = setTimeout(() => setShowPhone(true), 7000); // Step 3 starts after the spotlight animation
    }
    if (showPhone) {
      phoneFadeOutTimeout = setTimeout(() => setPhoneFadeOut(true), 9500); // Step 5 phone fades out
      spotlightExpandTimeout = setTimeout(() => setExpandSpotlight(true), 9700); // Step 6 spotlight expands after phone fadeout
    }
    return () => {
      clearTimeout(spotlightTimeout);
      clearTimeout(phoneFadeInTimeout);
      clearTimeout(phoneFadeOutTimeout);
      clearTimeout(spotlightExpandTimeout);
    };
  }, [startFadeOut, showSpotlight, showPhone]);

  return (
    <div className={`loadingPage ${startFadeOut ? 'fadeOut' : ''} ${showSpotlight ? 'showSpotlight' : ''} ${expandSpotlight ? 'expandSpotlight' : ''}`}>
      {showPhone ? (
        <Phone className={`${phoneFadeOut ? 'phoneFadeOut' : ''}`} />
      ) : (
        <div className={`${!showSpotlight ? 'neonText' : ''} ${typingComplete && !showSpotlight ? 'filledText fadeTextToBlack' : ''}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingPage;

import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

function LoadingPage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFillActive, setIsFillActive] = useState(false);
  const [isFadeToBlackActive, setIsFadeToBlackActive] = useState(false);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false); // State for the spotlight effect
  const [seconds, setSeconds] = useState(0); // State to keep track of seconds elapsed for debugging

  useEffect(() => {
    const fullText = 'GIRL CODED';
    let index = 0;
    const typeSpeed = 150;

    const typeLetter = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeLetter, typeSpeed);
      } else {
        setIsTypingComplete(true);

        setTimeout(() => {
          setIsFillActive(true);

          setTimeout(() => {
            setIsFadeToBlackActive(true);
          }, 5000); // 5s delay to start fading to black after fill
        }, 900); // Delay to start filling after typing is complete
      }
    };

    typeLetter();

    // Schedule spotlight to appear after 10 seconds
    const spotlightTimer = setTimeout(() => {
      setIsSpotlightActive(true);
    }, 10000);

    // Timer to stop showing the loading screen after 35 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 35000);

    // Setup a timer to increment and log seconds elapsed
    const secondsTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds + 1;
        console.log(`Seconds elapsed: ${newSeconds}`);
        return newSeconds;
      });
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(spotlightTimer); // Clear the spotlight timer on cleanup
      clearInterval(secondsTimer); // Clear the seconds timer on cleanup
    };
  }, []);

  // Inside your component's return statement
  
  const containerClasses = `loading-container ${isTypingComplete ? 'fade-to-black' : ''} ${isSpotlightActive ? 'transparent-background' : ''}`;
  const logoClasses = `Logo ${isFillActive ? 'fill-text' : ''} ${isFadeToBlackActive ? 'fade-text-to-black' : ''}`;
  const spotlightClasses = `spotlight ${isSpotlightActive ? 'spotlight-visible' : ''}`; // Manage spotlight visibility

  if (!isLoading) {
    return null; // Or redirect to another page or show content
  }

  return (
    <div className={containerClasses}>
      {isSpotlightActive && <div className={spotlightClasses}></div>}
      <div className={logoClasses}>{text}</div>
    </div>
  );
}

export default LoadingPage;