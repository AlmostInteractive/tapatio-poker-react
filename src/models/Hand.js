import {types} from 'mobx-state-tree';
import Card from './Card';
import {detach} from 'mobx-state-tree';


const Hand = types.model('Player', {
    cards: types.array(Card),
    selected: types.array(types.integer),
}).actions(self => ({
    setCards(cards) { self.cards = cards.slice(); },

    toggleSelected(cardIndex) {
        const found = self.selected.indexOf(cardIndex);
        if (found === -1)
            self.selected.push(cardIndex);
        else
            self.selected.splice(found, 1);
    },

    removeUnselectedCards() {
        const notSelected = [];
        for (let i = 4; i >= 0; i--) {
            if (self.selected.indexOf(i) === -1)
                notSelected.push(detach(self.cards[i]));
        }

        self.selected = [];

        return notSelected;
    },

    removeSelectedCards() {
        const selectedCards = [];
        for (let i = 4; i >= 0; i--) {
            if (self.selected.indexOf(i) !== -1)
                selectedCards.push(detach(self.cards[i]));
        }

        self.selected = [];

        return selectedCards;
    }

})).views(self => ({
    isSelected(cardIndex) { return self.selected.indexOf(cardIndex) !== -1; },

    get stillHasCards() { return self.cards.length > 0; }
}));

export default Hand;