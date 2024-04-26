import React from 'react';
import './StoryPage.css';
import Team from './Team/TeamPage';

const StoryPage = () => {
  return (
    <div className='story-container'>
      <div className='story-container'>
        <div className='story-team-container'><Team /></div>
      </div>
    </div>
  );
};

export default StoryPage;
