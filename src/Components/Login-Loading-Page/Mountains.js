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
      <div className="hill1"></div>
      <div className="hill2"></div>
      <div className="tree">
      <div className="tree-part tree-bottom"></div>
      <div className="tree-part tree-middle"></div>
      <div className="tree-part tree-top"></div>
    </div>
      <div className="sun">{rays}</div> {/* Place rays within the sun */}
    </div>
  );
};

export default Mountains;
