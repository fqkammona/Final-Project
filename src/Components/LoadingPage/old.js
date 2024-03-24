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
