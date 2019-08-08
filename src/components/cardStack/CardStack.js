import React from 'react';
import Card from '../card';

class CardStack extends React.Component {
    render() {
        const {cards} = this.props;

        const renderCards = () => {
            return cards.map((card, i) =>
                <Card key={i}
                      isStacked={true}
                      graphic={this.getGraphic(card)}
                      style={this.getStyleFor(i)}
                />
            );
        };

        return (
            <div id={`${this.props.id}`} className={this.getClassName()}>
                {renderCards()}
            </div>
        );
    }
}

export default CardStack;