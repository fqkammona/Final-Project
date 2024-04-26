import React from 'react';
import './HomePage.css';
import Phone from '../Components/LoadingPage/Phone';
import PhoneNotification from './Home/PhoneNotification';
import Timeline from './Home/Timeline';
import TvPage from './Home/TvPage'; // Ensure this is correctly imported
import MountainRanges from './Home/MountainPage'; // Import the MountPage component
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  // Hook for Timeline visibility
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust if needed
  });

  // Hook for TvPage visibility
  const { ref: tvPageRef, inView: tvPageInView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust if needed
  });

  // Hook for MountPage visibility
  const { ref: mountPageRef, inView: mountPageInView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust if needed
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
      <div ref={timelineRef} className='timeline-wrapper'>
        {timelineInView && <Timeline />}
      </div>
      <div ref={tvPageRef} className='tvPage-wrapper'>
        {tvPageInView && <TvPage />}
      </div>
      <div ref={mountPageRef} className='mountPage-wrapper'>
        {mountPageInView && <MountainRanges />}
      </div>
    </div>
  );
};

export default HomePage;
