import React from 'react';
import './StoryPage.css';


const videoFeedUrl = "http://10.9.197.114:5000/video_feed";

const StoryPage = () => {
  return (
    <div className="homepage-text">
      <h1>Story Page!</h1>
      <p>Story Stuff</p>
      <h2>Live Video Feed</h2>
      <img src={videoFeedUrl} alt="Live Feed" style={{ width: '640px', height: '480px' }} />
    </div>
  );
};

export default StoryPage;