import React from 'react';
import './Battle.css';
import Config from '../../Config';

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: null,
            winner: false,
            tie: false
        };
    }

    render() {
        if (!this.state.card)
            return null;

        const {front} = this.state.card;

        return (
            <div id={`${this.props.id}`} className="battle">
                {this.state.winner ? <div className="battle_result">Winner!</div> : ''}
                {this.state.tie ? <div className="battle_result">Tie...</div> : ''}
                <img src={Config.imagesDir + front} className="card" alt="card"/>
            </div>
        );
    }


    // ----- Public Functions --------------------

    reset() {
        this.setState({
            card: null,
            winner: false,
            tie: false
        });
    }

    setCardAndResults(card, winner, tie) {
        this.setState({card: card});
        setTimeout(() => this.setState({winner: winner, tie: tie}), Config.battleTime);
    }
}

export default Battle;