import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Trivia extends Component {
    render () {
        return (
            <div className="Trivia">
                <NavLink exact to="/" ></NavLink>
                <h1>This will be the question component</h1>
            </div>
        )
    }
}

export default Trivia;