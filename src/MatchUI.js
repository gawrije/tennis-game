import React, { Component } from 'react';
import  './styles/styles.scss';
import Match from './classes/Match';

export default class MatchUI extends Component {

    constructor(props) { 
        super(props);

        this.state = {score: null};
        this.match = new Match("Player 1", "Player 2");
    }

    componentDidMount() {
        this.setState({score: this.match.score()});
    }

    handlePlayer1PointWonBy = () => {
        this.match.pointWonBy(this.match.player1.id);
        this.setState({score: this.match.score()});

    }

    handlePlayer2PointWonBy = () => {
        this.match.pointWonBy(this.match.player2.id);
        this.setState({score: this.match.score()});
    }


    handleNewGame = () => {
        this.match = new Match("Gawri", "Edussuriya");
        this.setState({score: this.match.score()});
    }
    
    render() {
        const score = this.match.score();
        return (
            <>
                <div className="scoreContainer">
                    <div className="score">{score}</div>
                    <div className="newGame">
                        <div onClick={this.handleNewGame}>New game</div>
                    </div>
                </div>
                <div className="matchContainer">
                    <div className="player1">
                        <div className="playerName">{this.match.player1.id}</div>
                        <div className="imageDiv">
                            {this.match.winner(this.match.player1) ? <div className="winner">Winner</div>: ""}
                        </div>
                        <div className="pointWonBy">
                            <div onClick={this.handlePlayer1PointWonBy}>Win point</div>
                        </div>
                    </div>
                    <div className="spaceDiv"></div>
                    <div className="player2">
                        <div className="playerName">{this.match.player2.id}</div>
                        <div className="imageDiv">
                            {this.match.winner(this.match.player2) ? <div className="winner">Winner</div>: ""}
                        </div>    
                        <div className="pointWonBy">
                            <div onClick={this.handlePlayer2PointWonBy}>Win point</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}