import React from 'react';
import './Score.css';


function Score(props) {
    return (
        <div id={`${props.id}`} className="score">
            score: {props.score}
        </div>
    );
}

export default Score;