import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

function LoadingPage() {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFillActive, setIsFillActive] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false); // New state for fading text to black

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
    }, 110);

    setTimeout(() => setIsFillActive(true), 100);

    return () => {
      clearInterval(typeInterval);
    };
  }, []);

  useEffect(() => {
    if (isFillActive) {
      setTimeout(() => setFadeToBlack(true), 3100); // Wait for 3 seconds after fill is active then fade to black
    }
  }, [isFillActive]);

  const containerClasses = `loading-container ${isTypingComplete ? 'fade-to-black' : ''}`;
  const logoClasses = `Logo ${isFillActive ? 'fill-text' : ''} ${fadeToBlack ? 'fade-out' : ''}`; // Apply fade-out class if fadeToBlack is true

  return (
    <div className={containerClasses}>
      <div className={logoClasses}>{text}</div>
    </div>
  );
}

export default LoadingPage;
