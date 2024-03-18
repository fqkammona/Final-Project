import React from 'react';
import './Mountains.css';

const MountainSmall = () => {
  return (
    <div className="mountain mountain-small"></div>
  );
};

const MountainMedium = () => {
  return (
    <div className="mountain mountain-medium"></div>
  );
};

const MountainLarge = () => {
  return (
    <div className="mountain mountain-large"></div>
  );
};

const Mountains = () => {
  return (
    <div className="mountains">
      <MountainSmall />
      <MountainMedium />
      <MountainLarge />
      </div>
  );
}
      
export default Mountains;