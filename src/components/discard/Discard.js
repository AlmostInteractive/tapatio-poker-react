import React from 'react';
import Config from "../../Config";

class Discard extends React.Component {
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
                const {back} = cards[i];
                const card =
                    <div className="card stacked" style={{right: (i * 5) + 'px'}} key={i}>
                        <img src={Config.imagesDir + back} className="card" alt="card"/>
                    </div>;
                output.push(card);
            }
            return output;
        };

        return (
            <div id={`${this.props.id}`} className="discard">
                {renderCards()}
            </div>
        );
    }


    // ----- Public Functions --------------------

    reset() {
        this.setState({cards: []})
    }

    addCards(cardsToAdd) {
        const cards = this.state.cards.concat(cardsToAdd);
        this.setState({cards: cards})
    }
}

export default Discard;