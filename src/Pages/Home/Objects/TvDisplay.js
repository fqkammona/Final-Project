import React from 'react';
import './TvDisplay.css';
import House from '../../../Components/LoadingPage/House';
import NightMode from '../Seasons/NightMode'; // Ensure the path is correct

class TvDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'default', // Can be 'default', 'night', 'storm', or 'winter'
        };
    }

    toggleMode = () => {
        this.setState(prevState => ({
            mode: prevState.mode === 'default' ? 'night-mode' :
                  prevState.mode === 'night-mode' ? 'storm' :
                  prevState.mode === 'storm' ? 'winter' : 'default',
        }));
    }

    renderDial = (isLast) => {
        const { mode } = this.state;
        const dialRotationClass = isLast ?
            (mode === 'night-mode' ? 'last-dial-rotated' :
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
        const tvContainerClasses = `tv-container ${mode}-mode`;

        return (
            <div className={tvContainerClasses}>
                <div className="tv">
                    <div className="screen-border">
                        <div className="screen">
                            {mode === 'night-mode' ? <NightMode /> : <div className='house-tv-setting'><House /></div>}
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

export default TvDisplay;
