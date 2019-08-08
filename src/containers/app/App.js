import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'; //These functions make our components observable and be able to use the store
import './App.css';
import GameLogic from '../../GameLogic';
import GameState from '../../GameState';
import Deck from '../../components/deck';
import Hand from '../../components/hand';
import Battle from '../../components/battle';
import Discard from '../../components/discard';
import Score from '../../components/score';
import Points from '../../components/points';
import Played from '../../components/played';
import Config from '../../Config';


class App extends Component {
    constructor(props) {
        super(props);
        this.gameLogic = new GameLogic(props.store);
        this.state = {};
    }

    componentDidMount() {
        this.startNewGame();
    }

    render() {
        const { store } = this.props;
        const final = store.state === GameState.TallyPoints;

        return (
            <div>
                <h1>Tapatio Poker</h1>
                <div id="game_board">
                    <Deck id='deck' deck={store.deck}/>
                    <Hand id='my_hand' hand={store.player.hand} player={true} onSelected={this.handleCardClick}/>
                    <Hand id="cpu_hand" hand={store.cpu.hand} player={false}/>
                    <Discard id="my_discard" cards={store.player.discard}/>
                    <Discard id="cpu_discard" cards={store.cpu.discard}/>
                    <Played id="my_played" cards={store.player.played}/>
                    <Played id="cpu_played" cards={store.cpu.played}/>
                    <Battle id="my_battle" card={this.state.playerCard} winner={this.state.playerWinner}
                            tie={this.state.tie}/>
                    <Battle id="cpu_battle" card={this.state.cpuCard} winner={this.state.cpuWinner}
                            tie={this.state.tie}/>
                    <Points id="my_points" points={store.player.points} final={final}/>
                    <Points id="cpu_points" points={store.cpu.points} final={final}/>
                    <Score id="my_score" score={store.player.score}/>
                    <Score id="cpu_score" score={store.cpu.score}/>

                    {this.renderGameOver()}
                </div>
                <div>
                    {this.renderInstructions()}
                </div>
            </div>
        );
    }

    renderInstructions() {
        const { store } = this.props;
        const { state } = store;

        switch (state) {
            case GameState.SelectHand:
                const remaining = 3 - store.player.hand.selected.length;
                if (remaining > 0)
                    return <div>Select {remaining} more card{remaining === 1 ? '' : 's'} to keep</div>;

                return <button onClick={() => this.keepCards()}>Keep Cards</button>;

            case GameState.PlayCards:
                if (!store.player.hand.selected.length)
                    return <div>Select a card to play</div>;

                return <button onClick={() => this.playCard()}>Play Card</button>;

            case GameState.GameOver:
                return <button onClick={() => this.startNewGame()}>Play Again</button>;

            default:
                return null;
        }
    };

    renderGameOver() {
        const { store } = this.props;
        const state = store.state;

        if (state !== GameState.GameOver)
            return null;

        const playerScore = store.player.score;
        const cpuScore = store.cpu.score;

        if (playerScore === cpuScore)
            return <div id="game_over">Tie Game!</div>;

        if (playerScore > cpuScore)
            return <div id="game_over">You Win!</div>;

        return <div id="game_over">Computer Wins!</div>;
    };


    // ----- Internal Functions --------------------

    startNewGame() {
        this.gameLogic.startNewGame();
    };

    selectCards(cardIndex, maxToSelect) {
        const hand = this.props.store.player.hand;

        if (hand.isSelected(cardIndex) || hand.selected.length < maxToSelect)
            hand.toggleSelected(cardIndex);
    }

    keepCards() {
        this.gameLogic.holdCards();
        this.gameLogic.setGameState(GameState.PlayCards);
    }

    playCard() {
        const { store } = this.props;

        this.gameLogic.setGameState(GameState.Battle);
        const battleResults = this.gameLogic.computeBattle();
        const { playerCard, cpuCard } = battleResults;

        // set partial battle results now
        this.setState({ playerCard, cpuCard });

        // show the rest later
        setTimeout(() => {
            this.setState(battleResults);
            this.gameLogic.incrementPoints();
        }, Config.battleTime);

        const endBattle = () => {
            // clear battle results
            this.setState({ playerCard: null, cpuCard: null, cpuWinner: false, playerWinner: false, tie: false });

            this.gameLogic.endBattle();
            if (store.state === GameState.TallyPoints) {
                setTimeout(() => {
                    this.gameLogic.scorePoints();
                }, Config.pointsToScoreTime);
            }
        };

        setTimeout(endBattle, Config.clearTime);
    }


    // ----- Interface Functions --------------------

    handleCardClick = (cardIndex) => {
        const { state } = this.props.store;

        switch (state) {
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
}

export default inject('store')(observer(App));