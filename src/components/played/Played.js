import './Played.css';
import CardStack from '../cardStack';

class Played extends CardStack {
    getGraphic = ({front}) => {
        return front;
    };

    getStyleFor = (i) => {
        return {left: (i * 15) + 'px'};
    };

    getClassName = () => {
        return 'played';
    }
}

export default Played;