import React from 'react';
import './Points.css';



function Points(props) {
    if (props.points === 0)
        return null;

    return (
        <div id={`${props.id}`} className="points">
            points: <span className={props.final ? 'final' : ''}>{props.points}</span>
        </div>
    );
}

export default Points;