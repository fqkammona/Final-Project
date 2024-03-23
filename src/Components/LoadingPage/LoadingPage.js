import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const fullText = 'GIRL CODED';
  const [text, setText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const typingDelay = 150; // milliseconds
  const navigate = useNavigate();

  useEffect(() => {
    let typingTimeout;
    let redirectTimeout;

    if (text.length < fullText.length) {
      typingTimeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, typingDelay);
    } else {
      setTypingComplete(true); // Typing is finished
      setStartFadeOut(true); // Start fade-out effect sooner

      redirectTimeout = setTimeout(() => {
        navigate('/home'); // Navigate after fade-out and delay
      }, 4500); // Adjusted for longer fade-out duration
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [text, navigate]);

  return (
    <div className={`loadingPage ${startFadeOut ? "fadeOut" : ""}`}>
      <div className={`${typingComplete ? "neonText filledText" : "neonText"}`}>
        {text}
        <span className="blinkCursor" />
      </div>
    </div>
  );
};

export default LoadingPage;
