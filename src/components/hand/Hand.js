import React from 'react';

class Hand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            selected: []
        };
    }

    size() {
        return this.state.cards.length;
    }

    setCards(cards) {
        this.setState({cards: cards.slice()});
    }

    getNotSelected() {
        const notSelected = [];
        for(let i = 0; i < 5; i++) {
            if(this.state.selected.indexOf(i) === -1)
                notSelected.push(this.state.cards[i]);
        }
        return notSelected;
    }

    hold() {
        const cards = this.state.cards;
        const selected = new Set(this.state.selected);

        for (let i = cards.length; i >= 0; i--) {
            if (selected.has(i))
                continue;
            cards.splice(i, 1);
        }

        this.setState({
            cards: cards,
            selected: []
        });
    }

    play() {
        const cards = this.state.cards;
        if (this.state.selected.length < 1)
            throw new Error('Playing unselected cards');

        const cardIndex = this.state.selected[0];
        const card = cards.splice(cardIndex, 1)[0];
        this.setState({cards: cards});
        return card;
    }

    render() {
        const cards = this.state.cards;

        const renderCards = () => {
            const output = [];
            for (let i = 0; i < cards.length; i++) {
                const {front, back} = cards[i];
                const graphic = this.props.player ? front : back;
                const isSelected = this.state.selected.indexOf(i) !== -1;
                const card =
                    <div className={"card spread" + (isSelected ? " selected" : "")} key={i}>
                        <img src={'/images/cards/' + graphic}
                             className="card" alt="card"
                             onClick={
                                 this.props.onSelected
                                     ? () => this.props.onSelected(i)
                                     : null}/>
                    </div>;
                output.push(card);
            }
            return output;
        };

        return (
            <div id={`${this.props.id}`} className='hand'>
                {renderCards()}
            </div>
        );
    }

    setSelectedCards = (selected) => {
        this.setState({selected: selected.slice()});
    }
}


export default Hand;