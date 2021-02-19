import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import MultipleChoice from './MultipleChoice';
import Question from './Question';
import PrevNextButton from './PrevNextButton';

const minuteSeconds = 180;

const timerProps = {
    isPlaying: true,
    size: 140,
    strokeWidth: 6
  };
  
  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

class Trivia extends Component {
    render () {

        const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
        const endTime = stratTime + 243248; // use UNIX timestamp in seconds
      
        const remainingTime = endTime - stratTime;

        return (
            <div className="trivia-background-picture">
                <div className="Trivia">
                    <div className="trivia-top-menu">
                        <div className="timer-wrapper">
                            <CountdownCircleTimer
                                {...timerProps}
                                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                                duration={minuteSeconds}
                                initialRemainingTime={remainingTime % minuteSeconds}
                                onComplete={(totalElapsedTime) => [
                                remainingTime - totalElapsedTime > 0
                                ]}
                            >
                                {({ elapsedTime }) =>
                                renderTime("seconds", getTimeSeconds(elapsedTime))
                                }
                            </CountdownCircleTimer>
                            </div>
                        <NavLink className="button-to-home" exact to="/">
                            <i className="fas fa-angle-double-left"></i>
                            Back to Home
                        </NavLink>
                        <div className="question-tracker">
                            <h1>Question 1 of 10</h1>
                        </div>
                    </div>
                    <div className="trivia-question-container">
                        <Question />
                        <div className="br"></div>
                        <div className="user-buttons-container">
                            <div className="trivia-multiple-choice-container">
                                <MultipleChoice />
                                <MultipleChoice />
                                <MultipleChoice />
                                <MultipleChoice />
                            </div>
                            <div className="prev-next-buttons">
                                <PrevNextButton action="Previous" />
                                <PrevNextButton action="Next" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trivia;