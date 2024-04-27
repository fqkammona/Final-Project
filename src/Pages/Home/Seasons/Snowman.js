import React from 'react';
import './Snowman.css'; // Make sure to import the CSS file for styles

const Snowman = () => {
    return (
        <div className="snowman">
            <div className="head">
                <div className="hat">
                    <div className="hat-top"></div>
                    <div className="hat-brim"></div>
                </div>
                <div className='eye-container'>
                    <div className="eye"></div>
                    <div className="eye"></div>
                </div>
                <div className="nose"></div>
                <div className="mouth"></div>
            </div>
            <div className="torso">
                <div className='arm-left-box'>
                    <div className="arm-left"></div> {/* Added arm-left */}
                </div>
                <div className='button-box'>
                    <div className="button"></div>
                    <div className="button"></div>
                    <div className="button"></div>
                </div>
                <div className='arm-right-box'>
                    <div className="arm-right"></div> {/* Added arm-right */}
                </div>
            </div>
            <div className="base"></div>
        </div>
    );
}

export default Snowman;
