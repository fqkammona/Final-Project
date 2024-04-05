import React from 'react';
import './TV.css';
import House from '../../Components/LoadingPage/House';

const videoFeedUrl = "http://10.9.197.114:5000/video_feed";

class TV extends React.Component {
    renderDial = (isLast) => (
        <div className={`dial-control ${isLast ? 'last-dial' : ''}`}>
            {/* You can add functionality to these dials if needed */}
        </div>
    );

    renderSpeakerGrid = () => (
        <div className="speaker-grid">
            {Array.from({ length: 120 }).map((_, index) => (
                <div key={index} className="dot"></div>
            ))}
        </div>
    );

    render() {
        return (
            <div className='tv-container'>
                <div className="tv">
                    <div className="screen-border">
                        <div className="screen">
                            <House />
                            <img src={videoFeedUrl} alt="Live Feed" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                    <div className="side-box">
                        <div className="dial-container">
                        <div className="dial">{this.renderDial(false)}</div>
                            <div className="dial">{this.renderDial(true)}</div>
                        </div>
                        <div className="speaker-container">
                        <div className="speaker">
                                {this.renderSpeakerGrid()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TV;
