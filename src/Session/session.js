class Session {
    static current_game = "currentGame";
    
    static storeCurrentGameSession(gameId) {
        localStorage.setItem(this.current_game, gameId);
    }

    static getCurrentGameSession() {
        return localStorage.getItem(this.current_game) || '';
    }
}

export default Session;