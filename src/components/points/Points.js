import React from 'react';

class Points extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: 0,
            final: false
        };
    }

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

    render() {
        if(this.state.points === 0)
            return null;

        return (
            <div id={`${this.props.id}`} className="points">
                points: <span className={this.state.final ? 'final' : ''}>{this.state.points}</span>
            </div>
        );
    }
}

export default Points;