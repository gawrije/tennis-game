
import Match from './Match';

const callPointWonBy = (match, player, count) => {
    for (let i = 1; i<= count; i++) {
        match.pointWonBy(player);
    }
}

it('should create a match', () => {
    const match = new Match("player 1", "player 2");
    expect(match.player1.id).toBe('player 1');
    expect(match.player2.id).toBe('player 2');
    
    expect(match.player1.gamesWon).toBe(0);
    expect(match.player2.gamesWon).toBe(0);

    expect(match.player1.winPointScore).toBe(0);
    expect(match.player2.winPointScore).toBe(0);
})

it('should display game score and win point score before 3 points', () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    expect(match.score()).toBe('0-0, 15-15')
})

it('should identify the first Deuce', () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toBe('0-0, Deuce')
})

it('should identify player with advantage and a subsequent deuce', () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    match.pointWonBy("player 1");
    expect(match.score()).toBe('0-0, Advantage player 1')

    match.pointWonBy("player 2");
    expect(match.score()).toBe('0-0, Deuce')
})

it('should win the after a Deuce', () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2"); 
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toBe('0-1')
})

it('should identify a set win without a tie break', () => {
    const match = new Match("player 1", "player 2");

    for (let i = 1; i <= 24; i++) {
        match.pointWonBy("player 1");
    }

    expect(match.score()).toBe('The set is won. (6-0)')
})

it('should identify a tie break', () => {
    const match = new Match("player 1", "player 2");

    callPointWonBy(match, "player 1", 20);
    callPointWonBy(match, "player 2", 20);

    callPointWonBy(match, "player 1", 4);
    callPointWonBy(match, "player 2", 4);

    expect(match.score()).toBe('6-6 (0-0) - Tiebreak')
})


it('should do apply tie break rule', () => {
    const match = new Match("player 1", "player 2");

    callPointWonBy(match, "player 1", 20);
    callPointWonBy(match, "player 2", 20);

    // Tie break
    callPointWonBy(match, "player 1", 4);
    callPointWonBy(match, "player 2", 4);

    callPointWonBy(match, "player 1", 7);

    expect(match.score()).toBe('The set is won. (7-6)')
})

it('should apply tiebreak rule after a tiebreak', () => {
    const match = new Match("player 1", "player 2");

    callPointWonBy(match, "player 1", 20);
    callPointWonBy(match, "player 2", 20);

    callPointWonBy(match, "player 1", 4);
    callPointWonBy(match, "player 2", 4);

    callPointWonBy(match, "player 1", 6);
    callPointWonBy(match, "player 2", 6);
    callPointWonBy(match, "player 1", 1);

    expect(match.score()).toBe('6-6 (7-6) - Tiebreak')
})

it('should extend the tiebreaker if needed', () => {
    const match = new Match("player 1", "player 2");

    callPointWonBy(match, "player 1", 20);
    callPointWonBy(match, "player 2", 20);

    callPointWonBy(match, "player 1", 4);
    callPointWonBy(match, "player 2", 4);

    callPointWonBy(match, "player 1", 6);
    callPointWonBy(match, "player 2", 6);
    callPointWonBy(match, "player 1", 1);
    callPointWonBy(match, "player 2", 1);

    expect(match.score()).toBe('6-6 (7-7) - Tiebreak')
})

it('should win tiebreaker after a points tie', () => {
    const match = new Match("player 1", "player 2");

    callPointWonBy(match, "player 1", 20);
    callPointWonBy(match, "player 2", 20);
    
    callPointWonBy(match, "player 1", 4);
    callPointWonBy(match, "player 2", 4);

    
    callPointWonBy(match, "player 1", 6);
    callPointWonBy(match, "player 2", 6);
    callPointWonBy(match, "player 1", 1);
    callPointWonBy(match, "player 2", 1);
    callPointWonBy(match, "player 1", 1);
    callPointWonBy(match, "player 1", 1);


    expect(match.score()).toBe('The set is won. (7-6)')
})