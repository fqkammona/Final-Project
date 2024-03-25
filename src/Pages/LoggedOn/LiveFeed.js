import React from 'react';
import './LiveFeed.css';

const videoFeedUrl = "http://10.9.197.114:5000/video_feed";

const LiveFeed = () => {
  return (
    <div className="homepage-text">
      <h2>Live Video Feed</h2>
      <img src={videoFeedUrl} alt="Live Feed" style={{ width: '640px', height: '480px' }} />
    </div>
  );
};

export default LiveFeed;