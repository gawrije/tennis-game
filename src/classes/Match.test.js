
import Match from './Match';

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