import {types} from 'mobx-state-tree';

const suitToLetter = (suit) => {
    switch (suit) {
        case 0:
            return 'c';
        case 1:
            return 'd';
        case 2:
            return 'h';
        case 3:
            return 's';
        default:
            console.error('invalid suit: ' + suit);
            return 'c';
    }
};

const Card = types.model('Card', {
    value: types.optional(types.integer, -1),
    suit: types.optional(types.integer, -1)
}).views(self => ({
    get front() {
        return self.value + suitToLetter(self.suit) + '.gif';
    },

    get back() {
        return 'b.gif';
    }
}));

export default Card;