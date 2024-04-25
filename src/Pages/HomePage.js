import React from 'react';
import './HomePage.css';
import Phone from '../Components/LoadingPage/Phone';
import PhoneNotification from './Home/PhoneNotification';
import Timeline from './Home/Timeline'; // Adjust the import path based on your project structure
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,  // Adjust this value based on when you want the Timeline to appear
  });

  return (
    <div className='home-container'>
      <div className='content-wrapper'>
        <div className='text-container'>
          <div>Wherever you go,</div>
          <div>Know your home is safe</div>
        </div>
        <div className='Phone-container'>
          <div className='Phone-container-background'>
            <div className='phone-background-box'></div>
            <div className='phone-one'>
              <div className='phone-one-setting'><PhoneNotification /></div>
            </div>
            <div className='phone-two'>
              <div className='phone-two-setting'><Phone /></div>
            </div>
          </div>
        </div>
        
      </div>
      <div ref={ref} className='timeline-wrapper'>
        {inView && <Timeline />}  
      </div>
    </div>
  );
};

export default HomePage;
