const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const ChessColorType = require('./chess-color-type');
const ChessCemeteryType = require('./chess-cemetery-type');

module.exports = new GraphQLObjectType({
    name: 'ChessBoard',
    description: 'Describes the board state in the chess game',
    fields: () => ({
        turn: {
            type: new GraphQLNonNull(ChessColorType),
            description: 'The current player to make the move'
        },
        captured: {
            type: ChessCemeteryType,
            description: 'Holds the captured pieces in the current game'
        },
        fen: {
            type: GraphQLString,
            description: 'The current chess game Forsyth–Edwards Notation'
        }
    })
});
