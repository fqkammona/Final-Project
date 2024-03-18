import React from 'react';
import './Mountains.css';

const Mountains = () => {
  // Array of rays, adjust the number of rays as needed
  const rays = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className="ray" />
  ));

  return (
    <div className="mountain-container">
      <div className="mountain-sky"></div>
      <div className="big-cloud"></div>
      <div className="mountain"></div>
      <div className="sun">{rays}</div> {/* Place rays within the sun */}
    </div>
  );
};

export default Mountains;
