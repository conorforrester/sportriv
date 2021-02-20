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
            gameOver: false,
            questions: []
        };
        //binding methods
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
    }

    //Three quiz button methods
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

    finishQuiz() {
        this.setState({
            questionIndex: 0,
            gameOver: true
        });
    }

    render () {

        const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
        const endTime = stratTime + 243248; // use UNIX timestamp in seconds
      
        const remainingTime = endTime - stratTime;


            fetch('https://opentdb.com/api.php?amount=20&category=21&type=multiple')
            .then(res => res.json())
            .then(questions => {
                // console.log(questions);
                questions.results.map( question => {
                    const formatQuestion = {
                        question: questions.question
                    }
                    // console.log(question);

                    const incorrectAnswerChoices = [...question.incorrect_answers];
                    // console.log(incorrectAnswerChoices);
                    formatQuestion.answer = Math.floor(Math.random()* 3) + 1;
                    incorrectAnswerChoices.splice(
                        formatQuestion.answer - 1, 0 , formatQuestion.correctanswer
                    );

                    incorrectAnswerChoices.forEach((choice, index) => {
                        formatQuestion["choice" + (index + 1)] = choice;
                    });

                    console.log(formatQuestion);
                    return formatQuestion;
                });
            })
            .catch( err => {
                console.log(err);
            })
        

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
                        <Question question={this.state.questions} />
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
                                    </button> : 
                                    <button 
                                    type="button" 
                                    className="finished-button" 
                                    onClick={this.finishQuiz}
                                    > 
                                        Finish 
                                    </button> 
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