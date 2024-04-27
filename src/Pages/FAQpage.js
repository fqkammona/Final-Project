import React from 'react';
import './FAQpage.css';
import Mountains from './Home/MountainRanges';
import StormMode from './Home/Seasons/StormMode';

const FAQpage = () => {

  return (
    <div className='faq-container'>
      <div className='show-mountains'>
        <StormMode />
      </div>
    </div>
  );
};



export default FAQpage;