const { GraphQLObjectType, GraphQLString } = require('graphql');

const ChessBoardType = require('./chess-board-type');
const ChessPlayerType = require('./chess-player-type');

module.exports = new GraphQLObjectType({
    name: 'ChessSession',
    description: 'Describes a chess game session',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The game id'
        },
        players: {
            type: new GraphQLObjectType({
                name: 'Players',
                fields: () => ({
                    w: {
                        type: ChessPlayerType,
                        description: 'The player with white pieces'
                    },
                    b: {
                        type: ChessPlayerType,
                        description: 'The player with black pieces'
                    }
                })
            })
        },
        board: {
            type: ChessBoardType,
            description: 'The state of the board of the current game'
        }
    })
});
