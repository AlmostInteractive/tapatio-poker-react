import GameState from './GameState';
import Card from './models/Card';


class GameLogic {
    constructor(store) {
        this.store = store;
        this.battleResults = {};
    }

    setGameState(newState) {
        this.store.setState(newState);

        switch (newState) {
            case GameState.SelectHand:
                this.startNewRound();
                break;

            case GameState.PlayCards:
                // CPU picks a card to play
                this.store.cpu.hand.toggleSelected(0);
                break;

            case GameState.Battle:
                // do nothing
                break;

            case GameState.TallyPoints:
                this.tallyPoints();
                break;

            case GameState.GameOver:
            default:
                break;
        }
    }

    startNewGame() {
        this.store.reset();
        this.setGameState(GameState.SelectHand);
    }

    startNewRound() {
        // reshuffle deck if necessary
        if (this.store.deck.length < 10) {
            this.shuffleNewDeck();
            this.store.player.cleanTable();
            this.store.cpu.cleanTable();
        }

        this.store.player.setHand(this.drawFive());
        this.store.cpu.setHand(this.drawFive());

        const randomHand = [0, 1, 2, 3, 4].shuffle().splice(0, 3);
        randomHand.forEach(i => {
            this.store.cpu.hand.toggleSelected(i);
        });
    }

    shuffleNewDeck() {
        const deck = [];
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j < 4; j++)
                deck.push(Card.create({ value: i, suit: j }));
        }
        deck.shuffle();
        this.store.setDeck(deck);
    }

    drawFive() {
        let quantity = 5;

        const hand = [];
        while (quantity--)
            hand.push(this.store.drawCard());
        return hand;
    }

    holdCards() {
        this.store.player.hold();
        this.store.cpu.hold();
    }

    computeBattle() {
        if (this.store.state !== GameState.Battle)
            throw new Error('Computing battle in wrong state');

        const playerCard = this.store.player.playCard();
        const cpuCard = this.store.cpu.playCard();

        const tie = cpuCard.value === playerCard.value;
        const cpuWinner = cpuCard.value > playerCard.value;
        const playerWinner = !tie && !cpuWinner;

        return this.battleResults = {
            playerCard: playerCard,
            cpuCard: cpuCard,
            tie: tie,
            playerWinner: playerWinner,
            cpuWinner: cpuWinner
        };
    }

    incrementPoints() {
        if (this.battleResults.playerWinner)
            this.store.player.incrementPoints();
        else if (this.battleResults.cpuWinner)
            this.store.cpu.incrementPoints();
    }

    tallyPoints() {
        if (this.store.state !== GameState.TallyPoints)
            throw new Error('tallying points in wrong state');

        let playerPoints = this.store.player.points;
        let cpuPoints = this.store.cpu.points;

        // check for a loss
        if (playerPoints === 3)
            playerPoints = -3;
        else if (cpuPoints === 3)
            cpuPoints = -3;

        this.store.player.setPoints(playerPoints);
        this.store.cpu.setPoints(cpuPoints);
    }

    endBattle() {
        this.store.player.addToPlayed(this.battleResults.playerCard);
        this.store.cpu.addToPlayed(this.battleResults.cpuCard);
        this.battleResults = {};

        // set state to PlayCard or TallyPoints
        if (this.store.player.stillHasCards) {
            this.setGameState(GameState.PlayCards);
        } else {
            this.setGameState(GameState.TallyPoints);
        }
    }

    scorePoints() {
        this.store.player.scorePoints();
        this.store.cpu.scorePoints();

        // start another round or game over
        if (this.store.player.score >= 10
            || this.store.cpu.score >= 10) {
            this.setGameState(GameState.GameOver);
        } else {
            this.setGameState(GameState.SelectHand);
        }
    }
}

export default GameLogic;