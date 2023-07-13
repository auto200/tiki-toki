export enum SocketEvent {
    connection = "connection",
    disconnect = "disconnect",
    error = "error",
    joinQueue = "join-queue",
    leaveQueue = "leave-queue",
    gameStart = "game-start",
    gameEnd = "game-end",
    clientState = "client-state",
    makeMove = "make-move",
    leaveEndedGame = "leave-ended-game",
    rematchProposition = "rematch-proposition",
}
