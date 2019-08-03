import React from 'react';

class Discard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
    }

    addCards(cardsToAdd) {
        const cards = this.state.cards.concat(cardsToAdd);
        this.setState({cards: cards})
    }

    reset() {
        this.setState({cards: []})
    }

    render() {
        const cards = this.state.cards;

        const renderCards = () => {
            const output = [];
            for (let i = 0; i < cards.length; i++) {
                const {back} = cards[i];
                const card =
                    <div className="card stacked" style={{right: (i * 5) + 'px'}} key={i}>
                        <img src={'/images/cards/' + back} className="card" alt="card"/>
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
}

export default Discard;