
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
