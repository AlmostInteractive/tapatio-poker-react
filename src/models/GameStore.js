import {detach, types} from 'mobx-state-tree';
import Player from './Player';
import Card from './Card';


const GameStore = types.model('GameStore', {
    player: types.optional(Player, () => Player.create()),
    cpu: types.optional(Player, () => Player.create()),
    deck: types.array(Card),
    state: types.optional(types.integer, -1),
}).actions(self => ({
    setState(state) { self.state = state; },

    setDeck(deck) { self.deck = deck; },

    drawCard() { return detach(self.deck[0]); },

    reset() {
        self.player = Player.create();
        self.cpu = Player.create();
        self.deck = [];
    }

})).views(self => ({
    // rasterize the output getters
}));

export default GameStore;