import React from 'react';
import './TV.css';
const videoFeedUrl = "http://10.9.197.114:5000/video_feed";

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
                        <div className="screen">
            
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
