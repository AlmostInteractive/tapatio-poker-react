import React from "react";
import Config from "../../Config";

function Card(props) {
    const classNames = [];
    if (props.isSelected)
        classNames.push('selected');
    if (props.isStacked)
        classNames.push('stacked');
    else if (props.isSpread)
        classNames.push('spread');
    const extraClasses = classNames.join(' ');

    const style = props.style;
    const index = props.index;
    const graphic = props.graphic;
    const onSelected = props.onSelected;

    return (
        <div className={"card " + extraClasses} style={style}>
            <img src={Config.imagesDir + graphic}
                 className="card"
                 onClick={onSelected
                     ? () => onSelected(index)
                     : null}/>
        </div>
    );
}

export default Card;