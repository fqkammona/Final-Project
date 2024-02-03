import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const fullText = 'GIRL CODED';
  const [text, setText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const typingDelay = 150; // milliseconds
  const redirectDelay = 3000; // 5 seconds
  const navigate = useNavigate();

  useEffect(() => {
    let typingTimeout;
    let redirectTimeout;

    if (text.length < fullText.length) {
      typingTimeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, typingDelay);
    } else {
      setTypingComplete(true); // Set typingComplete to true when typing is finished
      redirectTimeout = setTimeout(() => {
        navigate('/home');
      }, redirectDelay);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [text, fullText, navigate]);

  return (
    <div className={typingComplete ? "neonText filledText" : "neonText"}>
      {text}
      <span className="blinkCursor" />
    </div>
  );
};

export default LoadingPage;
