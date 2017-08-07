const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'ChessColor',
    description: 'The chess game piece color (white|black)',
    values: {
        w: { value: 'w', description: 'White color player' },
        b: { value: 'b', description: 'Black color player' }
    }
});
