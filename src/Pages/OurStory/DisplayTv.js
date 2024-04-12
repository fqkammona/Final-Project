import React from 'react';
import './TV.css';
import House from '../../Components/LoadingPage/House';

class DisplayTv extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state with mode
        this.state = {
            mode: 'default', // Can be 'default', 'night', 'storm', or 'winter'
        };
    }

    toggleMode = () => {
        // Cycle through 'default' -> 'night' -> 'storm' -> 'winter'
        this.setState(prevState => ({
            mode: prevState.mode === 'default' ? 'night' :
                prevState.mode === 'night' ? 'storm' :
                    prevState.mode === 'storm' ? 'winter' : 'default',
        }));
    }

    renderDial = (isLast) => {
        const { mode } = this.state;
        // Determine dial rotation based on mode
        const dialRotationClass = isLast ?
            (mode === 'night' ? 'last-dial-rotated' :
                mode === 'storm' ? 'last-dial-storm-rotated' :
                    mode === 'winter' ? 'last-dial-winter-rotated' : '') : '';
        const dialClasses = `dial-control ${isLast ? 'last-dial' : ''} ${dialRotationClass}`;
        return (
            <div className={dialClasses} onClick={this.toggleMode}>
                {/* Dial content */}
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
        const { mode } = this.state;
        // Apply class to the TV container based on mode
        const tvContainerClasses = `tv-container ${mode}-mode`;
        return (
            <div className={tvContainerClasses}>
                <div className="tv">
                    <div className="screen-border">
                        <div className="screen">
                            <div className='house-tv-setting'>
                                <House />
                            </div>
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

export default DisplayTv;
