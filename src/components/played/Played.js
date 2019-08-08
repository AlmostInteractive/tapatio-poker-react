import React from 'react';
import './Played.css';
import Config from "../../Config";

class Played extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
    }

    render() {
        const cards = this.state.cards;

        const renderCards = () => {
            const output = [];
            for (let i = 0; i < cards.length; i++) {
                const {front} = cards[i];
                const card =
                    <div className="card stacked" style={{left: (i * 15) + 'px'}} key={i}>
                        <img src={Config.imagesDir + front} className="card" alt="card"/>
                    </div>;
                output.push(card);
            }
            return output;
        };

        return (
            <div id={`${this.props.id}`} className="played">
                {renderCards()}
            </div>
        );
    }


    // ----- Public Functions --------------------

    reset() {
        this.setState({cards: []})
    }

    addCard(card) {
        const cards = this.state.cards.slice();
        cards.push(card);
        this.setState({cards: cards})
    }
}

export default Played;