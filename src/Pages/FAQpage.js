import React from 'react';
import './FAQpage.css';
import Mountains from './Home/MountainRanges';
import WinterMode from './Home/Seasons/WinterMode';

const FAQpage = () => {

  return (
    <div className='faq-container'>
      <div className='show-mountains'>
        <WinterMode />
      </div>
    </div>
  );
};



export default FAQpage;