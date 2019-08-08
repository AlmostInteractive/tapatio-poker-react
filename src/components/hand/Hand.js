import React from 'react';
import {observer} from 'mobx-react';
import './Hand.css';
import Card from '../card';


function Hand(props) {
    const {cards, selected} = props.hand;

    const renderCards = () => {
        const output = [];
        cards.forEach(({front, back}, i) => {
            const graphic = props.player ? front : back;
            const isSelected = selected.indexOf(i) !== -1;
            const onSelected = props.onSelected;
            const card = <Card key={i}
                               index={i}
                               isSelected={isSelected}
                               isSpread={true}
                               graphic={graphic}
                               onSelected={onSelected}/>;
            output.push(card);
        });
        return output;
    };

    return (
        <div id={`${props.id}`} className='hand'>
            {renderCards()}
        </div>
    );
}

export default observer(Hand);