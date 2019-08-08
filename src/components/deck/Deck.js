import React from 'react';
import {observer} from 'mobx-react';
import './Deck.css';
import Card from '../card';


function Deck(props) {
    const {deck} = props;

    const renderCardStack = () => {
        if (deck.length === 0)
            return null;

        const graphic = deck[0].back;
        const output = [];
        for (let i = 0; i < parseInt(deck.length / 5); i++) {
            const card = <Card isStacked={true}
                               graphic={graphic}
                               style={{right: (i * 2) + 'px', bottom: i + 'px'}}
                               key={i}/>;
            output.push(card);
        }
        return output;
    };

    return (
        <div id={`${props.id}`}>
            {renderCardStack()}
        </div>
    );
}

export default observer(Deck);