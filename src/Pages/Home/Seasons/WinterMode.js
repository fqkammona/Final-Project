import React from 'react';
import './WinterMode.css'; // Make sure to import the CSS file for styles
import Snowman from './Snowman';
import House from '../../../Components/LoadingPage/House';

const generateSnowflakes = () => {
    const snowflakes = [];
    const snowflakeCount = 100; // Adjust the number of snowflakes here
    for (let i = 0; i < snowflakeCount; i++) {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s` // Snowflakes fall at different speeds
        };
        snowflakes.push(<div key={i} className="snowflake" style={style} />);
    }
    return snowflakes;
}

const WinterMode = () => {
    return (
        <div className="winter-sky">
            {generateSnowflakes()}
            <div className="snow-pile" style={{ left: '0' }}></div>
            <div className="snow-pile" style={{ right: '0' }}></div>
            <div className='winter-sky-snowman'>
                <Snowman />
            </div>

            <div className='night-sky-house'>
                <House />
            </div>
        </div>
    );
}

export default WinterMode;
