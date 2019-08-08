import './Discard.css';
import CardStack from '../cardStack';


class Discard extends CardStack {
    getGraphic = ({back}) => {
        return back;
    };

    getStyleFor = (i) => {
        return {right: (i * 5) + 'px'};
    };

    getClassName = () => {
        return 'discard';
    }
}

export default Discard;