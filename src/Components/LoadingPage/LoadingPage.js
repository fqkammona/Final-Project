import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

function LoadingPage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFillActive, setIsFillActive] = useState(false);
  const [isFadeToBlackActive, setIsFadeToBlackActive] = useState(false);
  const [seconds, setSeconds] = useState(0); // State to keep track of seconds elapsed

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

    // Timer to stop showing the loading screen
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 35000);

    // Setup a timer to log seconds elapsed
    const secondsTimer = setInterval(() => {
      setSeconds((prevSeconds) => {
        console.log(`Seconds elapsed: ${prevSeconds + 1}`);
        return prevSeconds + 1;
      });
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(secondsTimer); // Clear the interval on cleanup
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  const containerClasses = `loading-container ${isTypingComplete ? 'fade-to-black' : ''}`;
  const logoClasses = `Logo ${isFillActive ? 'fill-text' : ''} ${isFadeToBlackActive ? 'fade-text-to-black' : ''}`;

  return (
    <div className={containerClasses}>
      <div className={logoClasses}>{text}</div>
    </div>
  );
}

export default LoadingPage;
