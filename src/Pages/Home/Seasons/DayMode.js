import React from 'react';
import './DayMode.css';
import House from '../../../Components/LoadingPage/House';

function DayMode() {
    return (
        <div className="day-mode">
            <div className="sun-day-mode"></div>
            <div className='night-sky-house'>
        <House />
      </div>
        </div>
    );
}

export default DayMode;
