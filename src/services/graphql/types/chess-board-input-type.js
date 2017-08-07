const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const ChessColorType = require('./chess-color-type');
const ChessCemeteryInputType = require('./chess-cemetery-input-type');

module.exports = new GraphQLInputObjectType({
    name: 'ChessBoardInput',
    description: 'Describes the board state in the chess game',
    fields: () => ({
        turn: {
            type: new GraphQLNonNull(ChessColorType),
            description: 'The current player to make the move'
        },
        captured: {
            type: ChessCemeteryInputType,
            description: 'Holds the captured pieces in the current game'
        },
        fen: {
            type: GraphQLString,
            description: 'The current chess game Forsyth–Edwards Notation'
        }
    })
});
