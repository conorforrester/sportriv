import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import Question from './Question';
import PrevNextButton from './PrevNextButton';

class Trivia extends Component {
    render () {
        return (
            <div className="Trivia">
                <NavLink className="button-to-home" exact to="/">
                    <i class="fas fa-angle-double-left"></i>
                    Back to Home
                </NavLink>
                <div className="trivia-question-container">
                    <Question />
                    <div class="user-buttons-container">
                        <div className="trivia-multiple-choice-container">
                            <MultipleChoice />
                            <MultipleChoice />
                            <MultipleChoice />
                            <MultipleChoice />
                        </div>
                        <div class="prev-next-buttons">
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