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
