import React from 'react';
import './Battle.css';
import Card from '../card';


function Battle(props) {
    if (!props.card)
        return null;

    const {front} = props.card;

    return (
        <div id={`${props.id}`} className="battle">
            {props.winner ? <div className="battle_result">Winner!</div> : ''}
            {props.tie ? <div className="battle_result">Tie...</div> : ''}
            <Card graphic={front}/>
        </div>
    );
}

export default Battle;