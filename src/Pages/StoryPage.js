import React, { useState, useEffect } from 'react';
import './StoryPage.css';
import TV from './LoggedOn/TV';
import Phone from '../Components/LoadingPage/Phone';
import House from '../Components/LoadingPage/House';
import Team from './Team/TeamPage';

const StoryPage = () => {
  return (
    <div className='story-container'>
      <div className='story-container'>
      <div className="stop-line"></div> 
      <div className='story-tv-container'>
        <div className='tv-display'>  <TV  /></div>
       
      </div>
      <div className='story-phone-container'>
        <div className='phone-display'> <Phone /></div>
      </div>
      <div className='story-team-container'>
        <Team />
      </div>
    </div>
    </div>
  );
};

export default StoryPage;
