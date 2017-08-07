const _ = require('lodash');
const uuId = require('uuid/v1');

/**
 * Emulates a storage
 */
const sessions = {};

const getBoardTemplate = () => ({
    turn: 'w',
    captured: {w: [], b: []},
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
});

module.exports = {
    createGame(user) {
        const sessionId = uuId();

        sessions[sessionId] = {
            id: sessionId,
            players: {
                w: user,
                b: null
            },
            board: getBoardTemplate()
        };

        return Promise.resolve(sessionId);
    },

    fetchGame(sessionId) {
        const session = sessions[sessionId];
        return session ? Promise.resolve(session) : Promise.reject(`Game not found`);
    },

    joinGame(sessionId, user) {
        return this.fetchGame(sessionId)
            .then((session) => {
                if (session.players.b) return Promise.reject(`The game "${sessionId}" has no open slot`);

                session.players.b = user;

                return session;
            })
    },

    listGames() {
        return Promise.resolve(_.values(sessions));
    },

    updateGame(sessionId, user, board) {
        const isUsersTurn = (session, user) => {
            // Naive check for the current user eligible for the next turn
            return session.players[session.board.turn].name === user.name;
        };

        return this.fetchGame(sessionId)
            .then((session) => {
                if (!isUsersTurn(session, user))
                    return Promise.reject(`The board update by this player is not allowed at the moment`); // Wrong turn

                _.mergeWith(session.board, board, function (o1, o2) {
                    if (_.isArray(o2)) return [].concat(o2);
                });

                return Promise.resolve(session);
            })
    }
};
