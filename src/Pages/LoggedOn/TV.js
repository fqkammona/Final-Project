import React from 'react';
import './TV.css';
const videoFeedUrl = "http://172.20.10.3:5005/video_feed";

class TV extends React.Component {
    renderDial = () => {
        return (
            <div className="dial-control">
            </div>
        );
    };

    renderSpeakerGrid = () => (
        <div className="speaker-grid">
            {Array.from({ length: 120 }).map((_, index) => (
                <div key={index} className="dot"></div>
            ))}
        </div>
    );

    render() {
        return (
            <div className="tv-container">
                <div className="tv">
                    <div className="screen-border">
                        <div className="tv-live-feed-screen">
                        <img src={videoFeedUrl} alt="Live Feed" style={{ width: '640px', height: '500px' }} />
                        </div>
                    </div>
                    <div className="side-box">
                        <div className="dial-container">
                            <div className="dial">{this.renderDial()}</div>
                            <div className="dial">{this.renderDial()}</div>
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
