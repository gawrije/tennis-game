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

    completeGame() {
        this.currentGameScore = null;
        this.player1.winPointScore = 0;
        this.player2.winPointScore = 0;

        if (this.player1.gamesWon >= 6 || this.player2.gamesWon >= 6) {
            if (Math.abs(this.player1.gamesWon - this.player2.gamesWon) >= 2) {   // Won
                this.set.won = true;
                console.log("The set is won.", this.player1.gamesWon + "-" + this.player2.gamesWon);
            }
        }
        
        // tiebreak 6-6
        if ((this.player1.gamesWon === this.player2.gamesWon) && (this.player1.gamesWon >= 6 && this.player2.gamesWon >= 6)) { 
            this.set.tieBreak = true;
        }
    }

    getLeadingPlayer() {
        return (this.player1.winPointScore > this.player2.winPointScore) ? this.player1 : this.player2;
    }

    winner(player) {
        if (this.set.won) {
            const winner =  (this.player1.gamesWon > this.player2.gamesWon) ? this.player1 : this.player2;

            if (winner.id === player.id) {
                return true;
            }else {
                return false;
            }
        }else{
            return null;
        }
    }

    calculateTieBreakScore() {
        if (this.player1.winPointScore >= 7 || this.player2.winPointScore >=7) {
            if (Math.abs(this.player1.winPointScore - this.player2.winPointScore) >= 2) { // Won 
                const leadPlayer = this.getLeadingPlayer();
                leadPlayer.gamesWon += 1;
                this.set.won = true;
            }
        }
    }

    calculateStandardGameScore() {
        if (this.set.tieBreak ) {
            this.calculateTieBreakScore();
        }else {
            this.calculateDefaultScore();
        }
    }

    calculateDefaultScore() {
        if (this.player1.winPointScore >= 3 && this.player2.winPointScore >=3) {
            if (Math.abs(this.player1.winPointScore - this.player2.winPointScore) >= 2) { // Won
                const leadPlayer = this.getLeadingPlayer();
                leadPlayer.gamesWon += 1;
                this.currentGameScore =  leadPlayer.id + " won";
                this.completeGame();
            }else if (this.player1.winPointScore === this.player2.winPointScore) {  // Deuce
                this.currentGameScore = "Deuce";
            }else if (Math.abs(this.player1.winPointScore - this.player2.winPointScore) === 1) {  // Advantage
                const leadPlayer = this.getLeadingPlayer();
                this.currentGameScore = "Advantage " + leadPlayer.id;
            }
        }else if (this.player1.winPointScore >= 4 || this.player2.winPointScore >=4) {
            if (Math.abs(this.player1.winPointScore - this.player2.winPointScore) >= 2) {   // Won
                const leadPlayer = this.getLeadingPlayer();
                leadPlayer.gamesWon += 1;
                this.currentGameScore =  leadPlayer.id + " won";
                this.completeGame();
            }
        }else {
            this.currentGameScore = pointList[this.player1.winPointScore] + "-" + pointList[this.player2.winPointScore];
        }
    }

    pointWonBy(player) {
        if (!this.set.won) {
            if (this.player1.id === player) {
                this.player1.winPointScore += 1;
                this.calculateStandardGameScore();
            }else if (this.player2.id === player) {
                this.player2.winPointScore += 1;
                this.calculateStandardGameScore();
            }else{
                console.log("User not found");
            }
        }else{
            console.log("The set is completed.");
        }
    }

    score() {
        let gamesWon = this.player1.gamesWon + "-" + this.player2.gamesWon;

        if (! this.set.won) {
      
            if (this.currentGameScore) {
                gamesWon =  gamesWon +  ", " + this.currentGameScore
            }

            if (this.set.tieBreak ) {
                gamesWon = gamesWon + " (" + this.player1.winPointScore + "-" + this.player2.winPointScore + ") - Tiebreak";
            }

            console.log(gamesWon);
            return gamesWon;
        }else {
            console.log("The set is won. (" + gamesWon + ")");
            return "The set is won. (" + gamesWon + ")";
        }
    }
}