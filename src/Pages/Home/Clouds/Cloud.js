import React from 'react';
import CloudsObject from './CloudsObject';

const Cloud = ({ type, speed, zIndex, initialLeft }) => {
  const CloudComponent = CloudsObject[type];
  const style = {
    position: 'absolute',
    zIndex: zIndex,
    animation: `moveCloud ${speed}s linear infinite`,
    left: initialLeft,
  };

  return (
    <div style={style}>
      <CloudComponent />
    </div>
  );
};

export default Cloud;
