import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Question extends Component {

    render () {
        return (
            <div className="Question">
                <h2>{this.props.question}</h2>
            </div>
        )
    }
}


export default Question;