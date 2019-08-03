import React from 'react';
import './Score.css';

class Score extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0
        };
    }

    render() {
        return (
            <div id={`${this.props.id}`} className="score">
                score: {this.state.score}
            </div>
        );
    }

    // ----- Public Functions --------------------

    reset() {
        this.setState({
            score: 0
        });
    }

    value() {
        return this.state.score;
    }

    increment(amount) {
        this.setState({
            score: Math.max(0, this.state.score + amount)
        });
        this.forceUpdate();
    }
}

export default Score;