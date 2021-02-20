import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Question extends Component {
    render () {
        return (
            <div className="Question">
                <h1>{this.props.question}</h1>
            </div>
        )
    }
}

export default Question;