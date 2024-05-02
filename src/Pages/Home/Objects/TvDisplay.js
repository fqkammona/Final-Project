import React from 'react';
import './TvDisplay.css';
import House from '../../../Components/LoadingPage/House';
import NightMode from '../Seasons/NightMode';
import StormMode from '../Seasons/StormMode';
import WinterMode from '../Seasons/WinterMode';
import DayMode from '../Seasons/DayMode';

class TvDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'day-mode', // Set DayMode as the initial default mode
        };
    }    

    toggleMode = () => {
        this.setState(prevState => ({
            mode: prevState.mode === 'day-mode' ? 'night-mode' :
                prevState.mode === 'night-mode' ? 'storm-mode' :
                    prevState.mode === 'storm-mode' ? 'winter-mode' :
                        prevState.mode === 'winter-mode' ? 'day-mode' :
                            'day-mode', // Keep day-mode as the loop start if it reaches the end of cycle
        }));
    }
    

    renderDial = (isLast) => {
        const { mode } = this.state;
        const dialRotationClass = isLast ?
            (mode === 'night-mode' ? 'last-dial-rotated' :
                mode === 'storm-mode' ? 'last-dial-storm-rotated' :
                    mode === 'winter-mode' ? 'last-dial-winter-rotated' : '') : '';
        const dialClasses = `dial-control ${isLast ? 'last-dial' : ''} ${dialRotationClass}`;
        return (
            <div className={dialClasses} onClick={this.toggleMode}>
               
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
                            {mode === 'night-mode' ? <NightMode /> : mode === 'storm-mode' ? <StormMode /> : mode === 'winter-mode' ? <WinterMode /> : mode === 'day-mode' ? <DayMode /> : <div className='house-tv-setting'><House /></div>}
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
