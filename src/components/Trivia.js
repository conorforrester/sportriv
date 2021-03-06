  
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
            incorrectAnswer: '',
            correctAnswer: '',
            questions: [],
            question: null,
            loading: true,
            error: null
        };
        //binding methods
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
    }

    //Three quiz button methods
    nextQuestion() {
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            question: this.state.questions[this.state.questionIndex]
        });
    }
    prevQuestion() {
        this.setState({
            questionIndex: this.state.questionIndex - 1,
            question: this.state.questions[this.state.questionIndex]
        });
    }

    finishQuiz() {
        this.setState({
            questionIndex: 0,
            gameOver: true
        });
    }

    componentDidMount() {
        fetch('https://opentdb.com/api.php?amount=20&category=21&type=multiple')
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                question: data.results[0].question,
                questions: data.results
            })
            console.log(this.state.questions);
        },
        (error) => {
            this.setState({
                loading: false,
                error
            });
        }
        )
    }

    render () {
        //bring in state values to be used/mapped in the return method
        const { score, questionIndex, gameOver, correctAnswer, incorrectAnswer, questions, question, loading, error } = this.state;


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
                            <h1>Question {questionIndex + 1} of 20</h1>
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
                        {error ? <div>Error: {error.message}</div> :
                        loading || !question ? <div>Loading...</div> : 
                        <Question question={question} /> }
                        <div className="br"></div>
                        <div className="user-buttons-container">
                            <div className="trivia-multiple-choice-container">
                                {/* {error ? <div>Error: {error.message}</div> : 
                                loading ? <div>Loading...</div> : 
                                questions.map(q => (
                                    <div>{q.question}</div>
                                ))} */}
                                <MultipleChoice multiplceChoice={this.state.correctAnswer}/>
                                <MultipleChoice />
                                <MultipleChoice />
                                <MultipleChoice />
                            </div>
                            <div className="prev-next-buttons">
                                {questionIndex + 1 !== 1 ? 
                                    <button 
                                        type="button" 
                                        className="prev-next-button" 
                                        onClick={this.prevQuestion}
                                    > 
                                        Previous 
                                    </button> : null
                                }
                                {questionIndex + 1 !== 20 ? 
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