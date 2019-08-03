import React from 'react';
import './App.css';
import Config from '../../Config';
import Deck from '../deck';
import Hand from '../hand';
import Score from '../score';
import Points from '../points';
import Battle from "../battle";
import Played from "../played";
import Discard from "../discard";


const GameState = Object.freeze({
    SelectHand: 1,
    PlayCards: 2,
    Battle: 3,
    TallyPoints: 4,
    GameOver: 5
});


class App extends React.Component {
    constructor(props) {
        super(props);

        this.deck = React.createRef();

        this.player = {
            hand: React.createRef(),
            battle: React.createRef(),
            discard: React.createRef(),
            points: React.createRef(),
            score: React.createRef(),
            played: React.createRef(),
        };

        this.cpu = {
            hand: React.createRef(),
            battle: React.createRef(),
            discard: React.createRef(),
            points: React.createRef(),
            score: React.createRef(),
            played: React.createRef(),
        };

        this.state = {
            gameState: -1,
            selected: []
        };
    }

    componentDidMount() {
        this.startNewGame();
    }

    render() {
        const instructions = () => {
            switch (this.state.gameState) {
                case GameState.SelectHand:
                    const remaining = 3 - this.state.selected.length;
                    if (remaining > 0)
                        return <div>Select {remaining} more card{remaining === 1 ? '' : 's'} to keep</div>;

                    return <button onClick={this.keepCards}>Keep Cards</button>;

                case GameState.PlayCards:
                    if (!this.state.selected.length)
                        return <div>Select a card to play</div>;

                    return <button onClick={this.playCard}>Play Card</button>;

                case GameState.GameOver:
                    return <button onClick={() => this.startNewGame}>Play Again</button>;

                default:
                    return null;
            }
        };

        const renderGameOver = () => {
            if (this.state.gameState !== GameState.GameOver)
                return null;

            const playerScore = this.player.score.current.value();
            const cpuScore = this.cpu.score.current.value();

            if (playerScore === cpuScore)
                return <div id="game_over">Tie Game!</div>;

            if (playerScore > cpuScore)
                return <div id="game_over">You Win!</div>;

            return <div id="game_over">Computer Wins!</div>;
        };


        return (
            <div>
                <h1>Tapatio Poker</h1>
                <div id="game_board">
                    <Deck id='deck' ref={this.deck}/>
                    <Hand id='my_hand' ref={this.player.hand} player={true} onSelected={this.handleCardClick}/>
                    <Hand id="cpu_hand" ref={this.cpu.hand} player={false}/>
                    <Battle id="my_battle" ref={this.player.battle}/>
                    <Battle id="cpu_battle" ref={this.cpu.battle}/>
                    <Discard id="my_discard" ref={this.player.discard}/>
                    <Discard id="cpu_discard" ref={this.cpu.discard}/>
                    <Score id="my_score" ref={this.player.score}/>
                    <Score id="cpu_score" ref={this.cpu.score}/>
                    <Points id="my_points" ref={this.player.points}/>
                    <Points id="cpu_points" ref={this.cpu.points}/>
                    <Played id="my_played" ref={this.player.played}/>
                    <Played id="cpu_played" ref={this.cpu.played}/>
                    {renderGameOver()}
                </div>
                <div>
                    {instructions()}
                </div>
            </div>
        );
    }


    // ----- Internal Functions --------------------

    startNewGame() {
        this.setGameState(GameState.SelectHand);
    };

    startNewRound() {
        // reshuffle deck if necessary
        if (this.deck.current.size() < 10) {
            this.deck.current.shuffleNewDeck();
            this.player.played.current.reset();
            this.cpu.played.current.reset();
            this.player.discard.current.reset();
            this.cpu.discard.current.reset();
        }

        this.player.hand.current.setCards(this.deck.current.draw(5));
        this.cpu.hand.current.setCards(this.deck.current.draw(5));

        const randomHand = [0, 1, 2, 3, 4].shuffle().splice(0, 3);
        this.cpu.hand.current.setSelectedCards(randomHand);
    }

    startNewBattle() {
        this.setState({selected: []});
        this.player.hand.current.setSelectedCards([]);
        this.cpu.hand.current.setSelectedCards([0]);
    }

    setGameState(newState) {
        this.setState({
            gameState: newState
        });

        switch (newState) {
            case GameState.SelectHand:
                this.startNewRound();
                break;

            case GameState.PlayCards:
                this.startNewBattle();
                break;

            case GameState.Battle:
                this.player.hand.current.setSelectedCards([]);
                this.cpu.hand.current.setSelectedCards([]);
                this.setState({selected: []});
                break;

            case GameState.TallyPoints:
                this.player.battle.current.reset();
                this.cpu.battle.current.reset();

                let playerPoints = this.player.points.current.value();
                let cpuPoints = this.cpu.points.current.value();

                // check for a loss
                if (playerPoints === 3)
                    playerPoints = -3;
                else if (cpuPoints === 3)
                    cpuPoints = -3;

                this.player.points.current.setFinal(playerPoints);
                this.cpu.points.current.setFinal(cpuPoints);

                setTimeout(() => {
                    // reset points
                    this.player.points.current.reset();
                    this.cpu.points.current.reset();

                    // add to score
                    this.player.score.current.increment(playerPoints);
                    this.cpu.score.current.increment(cpuPoints);

                    // start another round or game over
                    if (this.player.score.current.value() >= 10
                        || this.cpu.score.current.value() >= 10) {
                        this.setGameState(GameState.GameOver);
                    } else {
                        this.setGameState(GameState.SelectHand);
                    }
                }, Config.pointsToScoreTime);
                break;

            case GameState.GameOver:
                break;
        }
    }

    selectCards(cardIndex, maxToSelect) {
        const selected = this.state.selected;
        const idx = selected.indexOf(cardIndex);

        if (idx !== -1) {
            selected.splice(idx, 1);
            this.setState({selected: selected.slice()});
        } else if (selected.length < maxToSelect) {
            selected.push(cardIndex);
            this.setState({selected: selected.slice()});
        }

        this.player.hand.current.setSelectedCards(selected);
    }


    // ----- Interface Functions --------------------

    handleCardClick = (cardIndex) => {
        switch (this.state.gameState) {
            case GameState.SelectHand:
                this.selectCards(cardIndex, 3);
                break;

            case GameState.PlayCards:
                this.selectCards(cardIndex, 1);
                break;

            default:
                // do nothing
                break;
        }
    };

    keepCards = () => {
        // discard the rest
        this.player.discard.current.addCards(this.player.hand.current.getNotSelected());
        this.cpu.discard.current.addCards(this.cpu.hand.current.getNotSelected());

        // hold selected cards
        this.player.hand.current.hold();
        this.cpu.hand.current.hold();

        this.setGameState(GameState.PlayCards);
    };

    playCard = () => {
        this.setGameState(GameState.Battle);

        const cpuCard = this.cpu.hand.current.play();
        const playerCard = this.player.hand.current.play();

        const tie = cpuCard.faceValue === playerCard.faceValue;
        const cpuWinner = cpuCard.faceValue > playerCard.faceValue;
        const playerWinner = !tie && !cpuWinner;

        this.player.battle.current.setCardAndResults(playerCard,
            playerWinner,
            tie);

        this.cpu.battle.current.setCardAndResults(cpuCard,
            cpuWinner,
            tie);

        if (playerWinner) {
            setTimeout(() => {
                this.player.points.current.increment();
            }, Config.battleTime);
        } else if (cpuWinner) {
            setTimeout(() => {
                this.cpu.points.current.increment();
            }, Config.battleTime);
        }

        const moveCardsToPlayed = () => {
            // set battle results
            this.player.battle.current.setCardAndResults(null, false, false);
            this.cpu.battle.current.setCardAndResults(null, false, false);

            // add cards to played
            this.player.played.current.addCard(playerCard);
            this.cpu.played.current.addCard(cpuCard);

            //TODO: set state to PlayCard or TallyPoints
            if (this.player.hand.current.size() > 0)
                this.setGameState(GameState.PlayCards);
            else
                this.setGameState(GameState.TallyPoints);
        };

        setTimeout(moveCardsToPlayed, Config.clearTime);
    };
}

export default App;
