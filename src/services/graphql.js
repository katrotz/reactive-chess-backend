const _ = require('lodash');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const ChessSessionType = require('./graphql/types/chess-session-type');
const ChessPlayerInput = require('./graphql/types/chess-player-input-type');
const ChessBoardInputType = require('./graphql/types/chess-board-input-type');

const chess = require('./chess');

const types = [ ];

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        sessions: {
            type: new GraphQLList(ChessSessionType),
            description: 'Lists the game sessions',
            resolve: (root, { sessionId }) => chess.listGames()
        },
        fetchGame: {
            type: ChessSessionType,
            description: 'Fetches a game session',
            args: {
                sessionId: {
                    type: GraphQLString
                }
            },
            resolve: (root, { sessionId }) => chess.fetchGame(sessionId)
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createGame: {
            type: GraphQLString,
            description: 'Player creates a game session and automatically enrolls to play with white pieces',
            args: {
                user: {
                    type: ChessPlayerInput
                }
            },
            resolve: (root, { user }) => chess.createGame(user)
        },
        joinGame: {
            type: ChessSessionType,
            description: 'Player joins a game session and automatically enrolls to play with black pieces',
            args: {
                sessionId: {
                    type: GraphQLString
                },
                user: {
                    type: ChessPlayerInput
                }
            },
            resolve: (root, { sessionId, user }) => chess.joinGame(sessionId, user)
        },
        updateGame: {
            type: ChessSessionType,
            description: 'Updates a game',
            args: {
                sessionId: {
                    type: GraphQLString
                },
                user: {
                    type: ChessPlayerInput
                },
                board: {
                    type: ChessBoardInputType
                }
            },
            resolve: (root, { sessionId, user, board }) => chess.updateGame(sessionId, user, board)
        }
    }
});

module.exports = {
    schema: new GraphQLSchema({query, mutation, types})
};
