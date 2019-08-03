import React from 'react';
import './Deck.css';
import Config from "../../Config";

class Deck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {cards: []};
        this.cards = [];
    }

    render() {
        const renderCardStack = () => {
            const output = [];
            for (let i = 0; i < parseInt(this.size() / 5); i++) {
                const card = <img src={Config.imagesDir + 'b.gif'} className="card stacked"
                                  style={{right: (i * 2) + 'px', bottom: i + 'px'}}
                                  key={i}
                                  alt="card"/>;
                output.push(card);
            }
            return output;
        };

        return (
            <div id={`${this.props.id}`}>
                {renderCardStack()}
            </div>
        );
    }


    // ----- Public Functions --------------------

    draw(quantity) {
        if (quantity <= 0)
            return [];
        if (quantity === undefined)
            quantity = 1;

        const cards = this.cards;
        const hand = [];
        while (quantity--)
            hand.push(cards.shift());

        this.setCards(cards);
        return hand;
    }

    size() {
        return this.cards.length;
    }

    shuffleNewDeck() {
        const suitToLetter = (suit) => {
            switch (suit) {
                case 0:
                    return 'c';
                case 1:
                    return 'd';
                case 2:
                    return 'h';
                case 3:
                    return 's';
                default:
                    return '';
            }
        };

        const deck = [];
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j < 4; j++)
                deck.push({faceValue: i, front: i + suitToLetter(j) + '.gif', back: 'b.gif'});
        }
        deck.shuffle();

        this.setCards(deck);
    };

    setCards(cards) {
        this.cards = cards.slice();

        this.setState({
            cards: cards.slice()
        });
    }
}

export default Deck;