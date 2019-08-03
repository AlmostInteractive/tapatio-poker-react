import React from 'react';
import './Points.css';

class Points extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0,
            final: false
        };
    }

    render() {
        if (this.state.points === 0)
            return null;

        return (
            <div id={`${this.props.id}`} className="points">
                points: <span className={this.state.final ? 'final' : ''}>{this.state.points}</span>
            </div>
        );
    }


    // ----- Public Functions --------------------

    reset() {
        this.setState({
            points: 0,
            final: false
        });
    }

    increment() {
        this.setState({
            points: this.state.points + 1
        });
    }

    setFinal(value) {
        this.setState({
            points: value,
            final: true
        });
    }

    value() {
        return this.state.points;
    }

}

export default Points;