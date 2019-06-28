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
    render() {
        const score = this.match.score();
        return (
            <>
                <div>{score}</div>
            </>
        )
    }
}