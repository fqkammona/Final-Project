import React from 'react';
import './LiveFeed.css';
import TV from './TV';

const LiveFeed = () => {
  return (
    <div className="LiveFeed-page">
      <div className="LiveFeed-text">Live Video Feed </div>
      <div className='tv-live-feed-container'>
        <div className='tv-live-feed-display'>
          <TV />
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;