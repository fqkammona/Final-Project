import React from 'react';
import './LiveFeed.css';
import TV from './TV';



const LiveFeed = () => {
  return (
    <div className="LiveFeed-page">
      <div className="LiveFeed-text">Live Video Feed </div>
      <TV />
    </div>
  );
};

export default LiveFeed;