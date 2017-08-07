const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'ChessPiece',
    description: 'The chess game piece type',
    values: {
        p: { value: 'p', description: 'Pawn piece type' },
        n: { value: 'n', description: 'Knight piece type' },
        b: { value: 'b', description: 'Bishop piece type' },
        r: { value: 'r', description: 'Rook piece type' },
        q: { value: 'q', description: 'Queen piece type' },
        k: { value: 'k', description: 'King piece type' }
    }
});
