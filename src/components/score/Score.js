import React from 'react';

class Score extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0
        };
    }

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

    render() {
        return (
            <div id={`${this.props.id}`} className="score">
                score: {this.state.score}
            </div>
        );
    }
}

export default Score;