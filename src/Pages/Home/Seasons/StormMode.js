import React from 'react';
import './StormMode.css';
import House from '../../../Components/LoadingPage/House';

const StormMode = () => {
    const raindrops = Array.from({ length: 20 }, (_, index) => {
        const speed = Math.random() * (0.5 - 0.2) + 0.3;
        const delay = Math.random() * 0.5;
        return (
            <div
                key={index}
                className="rain-drop"
                style={{
                    left: `${5 * index}%`,
                    animationDuration: `${speed}s`,
                    animationDelay: `${delay}s`
                }}
            ></div>
        );
    });

    return (
        <div className="storm">
            <div className="cloud-container">
                <div className="cloud">
                    {raindrops}
                </div>
                <div className="thunder cloud"></div>
            </div>
            <div className='night-sky-house'>
                <House />
            </div>
        </div>
    );
}

export default StormMode;
