// House.js
import React from 'react';
import './House.css'; // Make sure this path is correct for your project structure

const House = () => {
  const generateSmokeElements = () => {
    const smokeElements = [];
    for (let i = 0; i < 5; i++) { // Adjust number of smoke elements as needed
      smokeElements.push(<div key={i} className={`smoke smoke-${i}`}></div>);
    }
    return smokeElements;
  };

  return (
    <div className='container'>
      {/* Roof structure with poles */}
      <div className="roof">
        <div className="chimney">
           {generateSmokeElements()}
        </div>
        <div className="pole left-pole"></div>
        <div className="pole right-pole"></div>
      </div>
      {/* Base of the house */}
      <div className="houseBase">
        {/* Left window container */}
        <div className="window-container left-window">
          <div className="window">
            <div className="crossbar-vertical"></div>
            <div className="crossbar-horizontal"></div>
          </div>
        </div>
        {/* Right window container */}
        <div className="window-container right-window">
          <div className="window">
            <div className="crossbar-vertical"></div>
            <div className="crossbar-horizontal"></div>
          </div>
        </div>
        {/* Door with a doorknob */}
        <div className="door">
          <div className="doorknob"></div>
        </div>
      </div>
      </div>
);
};

export default House;
