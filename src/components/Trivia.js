import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import MultipleChoice from './MultipleChoice';
import Question from './Question';

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
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            questionIndex: 0, //question number, start at index 0 for simplicity
            gameOver: false
        };
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
    }

    nextQuestion() {
        this.setState({
            questionIndex: this.state.questionIndex + 1
        });
    }
    prevQuestion() {
        this.setState({
            questionIndex: this.state.questionIndex - 1
        });
    }

    render () {

        const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
        const endTime = stratTime + 243248; // use UNIX timestamp in seconds
      
        const remainingTime = endTime - stratTime;

        return (
            <div className="trivia-background-picture">
                <div className="Trivia">
                    <div className="trivia-top-menu">
                        <NavLink className="button-to-home" exact to="/">
                            <i className="fas fa-angle-double-left"></i>
                            Quit
                        </NavLink>
                        <div className="question-tracker">
                            <h1>Question {this.state.questionIndex + 1} of 20</h1>
                        </div>
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
                                {this.state.questionIndex + 1 !== 1 ? 
                                    <button 
                                        type="button" 
                                        className="prev-next-button" 
                                        onClick={this.prevQuestion}
                                    > 
                                        Previous 
                                    </button> : null
                                }
                                {this.state.questionIndex + 1 !== 20 ? 
                                    <button 
                                    type="button" 
                                    className="prev-next-button" 
                                    onClick={this.nextQuestion}
                                    > 
                                        Next 
                                    </button> : null
                                }   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trivia;