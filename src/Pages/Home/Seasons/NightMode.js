import React from 'react';
import './NightMode.css';
import House from '../../../Components/LoadingPage/House';

const NightMode = () => {
  const generateStars = () => {
    return Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`, // Restricting to the top 50% of the screen
      isTwinkling: Math.random() > 0.5 // 50% chance to twinkle
    }));
  };

  const stars = generateStars();

  return (
    <div className="night-sky">
      <div className="moon"></div>
      {stars.map((star, index) => (
        <div
          key={index}
          className={`star ${star.isTwinkling ? 'twinkling-star' : ''}`}
          style={{ left: star.left, top: star.top }}
        ></div>
      ))}
      <div className='night-sky-house'>
        <House />
      </div>
    </div>
  );
};

export default NightMode;
