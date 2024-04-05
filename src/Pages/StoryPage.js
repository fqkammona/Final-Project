import React from 'react';
import './StoryPage.css';
import Mountains from './Home/MountainRanges';
import Phone from '../Components/LoadingPage/Phone';

const StoryPage = () => {
  return (
    <div className='home-container'>
      <div>
      <Mountains />
      </div>
      <div className='show-mountains'>
        <Phone />
      </div>
    </div>
  );
};

export default StoryPage;
