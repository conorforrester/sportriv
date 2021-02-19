import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class PrevNextButton extends Component {
    render () {
        return (
            <div className="prev-next-button">
                <h1>{this.props.action}</h1>
            </div>
        )
    }
}

export default PrevNextButton;