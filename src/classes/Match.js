const pointList = [0, 15, 30, 40];

export default class Match {

    constructor(player1, player2) {
        this.player1 = {
            id: player1,
            gamesWon: 0,
            winPointScore: 0,
        };
        this.player2 = {
            id: player2,
            gamesWon: 0,
            winPointScore: 0,
        };
        
        // Current game information
        this.currentGameScore = null;

        this.set = {
            won: false,
            tieBreak: false,
        };
    }
}