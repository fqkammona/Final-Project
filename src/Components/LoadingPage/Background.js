// Background.js
import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="background">
      <div className="sky">
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>
      <div className="hills">
        <div className="hill largeHill"></div>
        <div className="hill smallHill"></div>
      </div>
    </div>
  );
};

export default Background;