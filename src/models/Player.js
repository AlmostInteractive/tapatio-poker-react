import { types } from 'mobx-state-tree';
import Hand from './Hand';
import Card from './Card';


const Player = types.model('Player', {
    hand: types.optional(Hand, () => Hand.create()),
    discard: types.array(Card),
    played: types.array(Card),
    points: types.optional(types.integer, 0),
    score: types.optional(types.integer, 0)
}).actions(self => ({
    setHand(cards) { self.hand.setCards(cards); },

    hold() {
        const cards = self.hand.removeUnselectedCards();
        self.discard = self.discard.concat(cards);
    },

    playCard() {
        const cards = self.hand.removeSelectedCards();
        console.log('removed', cards);
        return cards[0];
    },

    incrementPoints() { self.points++; },

    setPoints(points) { self.points = points; },

    scorePoints() {
        self.score = Math.max(0, self.score + self.points);
        self.points = 0;
    },

    addToPlayed(card) { self.played.push(card); },

    cleanTable() {
        self.discard = [];
        self.played = [];
    }

})).views(self => ({
    get stillHasCards() { return self.hand.stillHasCards; },

}));

export default Player;