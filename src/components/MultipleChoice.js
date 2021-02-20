import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class MultipleChoice extends Component {
    render () {
        return (
            <div className="multipleChoice">
                <h1>{this.props.multiplechoice}</h1>
            </div>
        )
    }
}

export default MultipleChoice;