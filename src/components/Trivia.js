import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Trivia extends Component {
    render () {
        return (
            <div className="Trivia">
                <NavLink className="button-to-home" exact to="/">
                    <i class="fas fa-angle-double-left"></i>
                    Back to Home
                </NavLink>
            </div>
        )
    }
}

export default Trivia;