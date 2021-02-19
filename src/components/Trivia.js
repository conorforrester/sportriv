import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import Question from './Question';
import PrevNextButton from './PrevNextButton';

class Trivia extends Component {
    render () {
        return (
            <div className="Trivia">
                <div className="trivia-top-menu">
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
        )
    }
}

export default Trivia;