import React from 'react';
import './FAQpage.css';
import Mountains from './Home/MountainRanges';
import NightMode from './Home/Seasons/NightMode';

const FAQpage = () => {

  return (
    <div className='faq-container'>
      <div className='show-mountains'>
        <NightMode />
      </div>
    </div>
  );
};



export default FAQpage;